"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaImages,
  FaUpload,
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
  FaSearch,
} from "react-icons/fa";

export default function ImagesPage() {
  // Sample data for gallery images
  const [images, setImages] = useState([
    {
      id: 1,
      title: "Ruby Inclusion Analysis",
      filename: "ruby-inclusion-001.jpg",
      category: "Ruby",
      uploadDate: "Apr 7, 2025",
      size: "2.4 MB",
      dimensions: "1920x1080",
      status: "Published",
      views: 342,
    },
    {
      id: 2,
      title: "Sapphire Crystal Structure",
      filename: "sapphire-crystal-002.jpg",
      category: "Sapphire",
      uploadDate: "Apr 6, 2025",
      size: "3.1 MB",
      dimensions: "2048x1536",
      status: "Published",
      views: 289,
    },
    {
      id: 3,
      title: "Emerald Color Grading",
      filename: "emerald-grading-003.jpg",
      category: "Emerald",
      uploadDate: "Apr 5, 2025",
      size: "1.8 MB",
      dimensions: "1600x1200",
      status: "Draft",
      views: 0,
    },
    {
      id: 4,
      title: "Diamond Clarity Chart",
      filename: "diamond-clarity-004.jpg",
      category: "Diamond",
      uploadDate: "Apr 4, 2025",
      size: "2.7 MB",
      dimensions: "1920x1080",
      status: "Published",
      views: 456,
    },
    {
      id: 5,
      title: "Gemstone Collection",
      filename: "collection-mixed-005.jpg",
      category: "Mixed",
      uploadDate: "Apr 3, 2025",
      size: "4.2 MB",
      dimensions: "2560x1440",
      status: "Published",
      views: 623,
    },
    {
      id: 6,
      title: "Laboratory Equipment",
      filename: "lab-equipment-006.jpg",
      category: "Equipment",
      uploadDate: "Apr 2, 2025",
      size: "3.5 MB",
      dimensions: "1920x1080",
      status: "Published",
      views: 178,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
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

  const filteredImages = images.filter((image) => {
    const matchesCategory =
      selectedCategory === "" || image.category === selectedCategory;
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.filename.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredImages.map((image) => (
          <div key={image.id} className="premium-card overflow-hidden">
            {/* Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <FaImages className="text-gray-400 text-4xl" />
            </div>

            {/* Image Details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-primary truncate flex-1">
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

              <p className="text-sm text-accent/70 mb-1">{image.filename}</p>
              <p className="text-xs text-accent/60 mb-2">
                {image.category} • {image.dimensions} • {image.size}
              </p>

              <div className="flex items-center justify-between text-xs text-accent/60 mb-4">
                <span>{image.uploadDate}</span>
                <span>{image.views} views</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    className="text-primary hover:text-primary-dark p-2"
                    title="View"
                  >
                    <FaEye size={14} />
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title="Edit"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Delete"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
                <div className="text-xs text-accent/60">ID: {image.id}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="premium-card p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {images.length}
          </div>
          <div className="text-sm text-accent/70">Total Images</div>
        </div>
        <div className="premium-card p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {images.filter((img) => img.status === "Published").length}
          </div>
          <div className="text-sm text-accent/70">Published</div>
        </div>
        <div className="premium-card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {images.filter((img) => img.status === "Draft").length}
          </div>
          <div className="text-sm text-accent/70">Drafts</div>
        </div>
        <div className="premium-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {images.reduce((sum, img) => sum + img.views, 0).toLocaleString()}
          </div>
          <div className="text-sm text-accent/70">Total Views</div>
        </div>
      </div>
    </div>
  );
}
