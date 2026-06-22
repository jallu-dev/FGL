"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaImages,
  FaUpload,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaSpinner,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllImages, deleteImage, updateImage } from "@/utils/apiRequests/image.api";
import { toast } from "sonner";

export default function ImagesPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  // Fetch gallery images
  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery-images"],
    queryFn: () => getAllImages(),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteImage(id),
    onSuccess: () => {
      toast.success("Image deleted successfully!");
      queryClient.invalidateQueries(["gallery-images"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete image");
    },
  });

  // Toggle status (published <-> draft) mutation
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateImage(id, { status }),
    onSuccess: () => {
      toast.success("Image status updated!");
      queryClient.invalidateQueries(["gallery-images"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update image status");
    },
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const categories = [
    "Ruby",
    "Sapphire",
    "Emerald",
    "Diamond",
    "Mixed",
    "Equipment",
  ];

  const imagesList = data?.images || [];

  const filteredImages = imagesList.filter((image) => {
    const matchesCategory =
      selectedCategory === "" || image.category === selectedCategory;
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.r2_key.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = (image) => {
    if (window.confirm(`Are you sure you want to delete "${image.title}"?`)) {
      deleteMutation.mutate(image.id);
    }
  };

  const handleToggleStatus = (image) => {
    const nextStatus = image.status === "published" ? "draft" : "published";
    toggleStatusMutation.mutate({ id: image.id, status: nextStatus });
  };

  const handleView = (image) => {
    if (image.src) {
      window.open(image.src, "_blank");
    } else {
      toast.error("Image URL is not available.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-primary text-4xl mb-4" />
        <p className="text-accent/80">Loading gallery images...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <p className="text-red-500 font-semibold text-lg mb-2">Error loading gallery images</p>
        <p className="text-accent/70 mb-4">Please make sure the database migration has been run.</p>
      </div>
    );
  }

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">
            Gallery Images
          </h1>
          <p className="text-accent/80">Manage gallery images and uploads</p>
        </div>
        <Link
          href="/admin/images/create"
          className="btn-primary flex items-center"
        >
          <FaUpload className="mr-2" />
          Upload Image
        </Link>
      </header>

      {/* Filters and Search */}
      <div className="premium-card p-4 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search images..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-200 rounded-md bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm text-accent/70">
            <FaImages />
            <span>{filteredImages.length} images found</span>
          </div>
        </div>
      </div>

      {/* Images Grid View */}
      {filteredImages.length === 0 ? (
        <div className="premium-card p-12 text-center text-accent/70 mb-8">
          No gallery images found. Click &quot;Upload Image&quot; to add one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredImages.map((image) => (
            <div key={image.id} className="premium-card overflow-hidden flex flex-col justify-between">
              <div>
                {/* Image Preview */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {image.src ? (
                    <img
                      src={image.src}
                      alt={image.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <FaImages className="text-gray-400 text-4xl" />
                  )}
                </div>

                {/* Image Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-primary truncate flex-1" title={image.title}>
                      {image.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ml-2 ${getStatusColor(
                        image.status
                      )}`}
                    >
                      {image.status}
                    </span>
                  </div>

                  <p className="text-sm text-accent/70 mb-1 truncate" title={image.r2_key}>
                    {image.r2_key.replace("gallery/", "")}
                  </p>
                  <p className="text-xs text-accent/60 mb-2">
                    Category: {image.category}
                  </p>
                  {image.description && (
                    <p className="text-xs text-accent/70 line-clamp-2 mb-2 bg-slate-50 p-2 rounded">
                      {image.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-gray-50 mt-auto">
                <div className="flex items-center justify-between text-xs text-accent/60 mb-3 pt-2">
                  <span>Uploaded: {new Date(image.created_at).toLocaleDateString()}</span>
                  <span>ID: {image.id}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(image)}
                      className="text-primary hover:text-primary-dark p-2 border border-gray-100 rounded hover:bg-gray-50"
                      title="View full size"
                    >
                      <FaEye size={14} />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(image)}
                      className="text-blue-600 hover:text-blue-800 p-2 border border-gray-100 rounded hover:bg-gray-50 flex items-center gap-1 text-xs font-semibold"
                      title="Toggle Status (Draft / Published)"
                    >
                      <FaEdit size={14} />
                      Toggle Status
                    </button>
                    <button
                      onClick={() => handleDelete(image)}
                      className="text-red-600 hover:text-red-800 p-2 border border-gray-100 rounded hover:bg-gray-50"
                      title="Delete"
                      disabled={deleteMutation.isPending}
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="premium-card p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {imagesList.length}
          </div>
          <div className="text-sm text-accent/70">Total Images</div>
        </div>
        <div className="premium-card p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {imagesList.filter((img) => img.status === "published").length}
          </div>
          <div className="text-sm text-accent/70">Published</div>
        </div>
        <div className="premium-card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {imagesList.filter((img) => img.status === "draft").length}
          </div>
          <div className="text-sm text-accent/70">Drafts</div>
        </div>
      </div>
    </div>
  );
}
