"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CloudUpload, X } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/extension/file-upload";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

const formSchema = z.object({
  description: z.string().min(1),
  species: z.string().min(1),
  variety: z.string().min(1),
  weight: z.string().min(1),
  measurement: z.string().min(1),
  colour: z.string().min(1),
  shape: z.string().min(1),
  transparency: z.string().min(1),
  origin: z.string(),
  phenomenon: z.string(),
  remarks: z.string(),
  comments: z.string().min(1),
  text_color: z.string().min(1),
  track_no: z.string().min(1),
  contact_no: z.string().min(1).max(10),
  trade_name: z.string(),
  treatment: z.string(),
  note: z.string(),
});

export default function EditReportModal({
  report,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [file, setFile] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [editable, setEditable] = useState(false);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      track_no: "",
      description: "",
      species: "",
      variety: "",
      weight: "",
      measurement: "",
      colour: "",
      shape: "",
      transparency: "",
      origin: "",
      phenomenon: "",
      remarks: "",
      comments: "",
      text_color: "#000000",
      contact_no: "",
      trade_name: "",
      treatment: "",
      note: "",
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(`/api/reports/${report.report_id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update report");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Report updated successfully!");
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update report");
    },
  });

  // Populate form with existing data
  useEffect(() => {
    console.log(report);
    if (report) {
      form.reset({
        track_no: report.track_no?.toString() || "",
        description: report.description || "",
        species: report.species || "",
        variety: report.variety || "",
        weight: report.weight || "",
        measurement: report.measurement || "",
        colour: report.colour || "",
        shape: report.shape || "",
        transparency: report.transparency || "",
        origin: report.origin || "",
        phenomenon: report.phenomenon || "",
        remarks: report.remarks || "",
        comments: report.comments || "",
        text_color: report.text_color || "#000000",
        contact_no: report.contact_no || "",
        trade_name: report.trade_name || "",
        treatment: report.treatment || "",
        note: report.note || "",
      });
    }
  }, [report, form]);

  const onSubmit = async (data) => {
    setUpdating(true);
    try {
      const formData = new FormData();

      // Append all form fields
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value?.toString() || "");
      }

      // Append file if a new one is selected
      if (file.length > 0) {
        formData.append("image", file[0]);
      }

      await updateMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setUpdating(false);
    }
  };

  // File validation
  useEffect(() => {
    if (file.length) {
      const selectedFile = file[0];

      // Check file size
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error(
          `File too large: ${(selectedFile.size / 1024 / 1024).toFixed(
            2
          )}MB. Maximum size is 10MB.`
        );
        setFile([]);
        return;
      }

      // Check file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type. Please select a JPG or PNG image.");
        setFile([]);
        return;
      }
    }
  }, [file]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            Edit Report - {report.report_id}
          </h2>
          <Button
            disabled={editable}
            onClick={() => setEditable(true)}
            className={`${
              editable
                ? "cursor-not-allowed bg-primary/50"
                : "cursor-pointer bg-primary"
            }`}
          >
            Edit
          </Button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form fields */}
                {[
                  { name: "description", label: "Description", required: true },
                  { name: "species", label: "Species", required: true },
                  { name: "variety", label: "Variety", required: true },
                  { name: "weight", label: "Weight", required: true },
                  {
                    name: "measurement",
                    label: "Measurements",
                    required: true,
                  },
                  { name: "colour", label: "Colour", required: true },
                  { name: "shape", label: "Shape & Cut", required: true },
                  {
                    name: "transparency",
                    label: "Transparency",
                    required: true,
                  },
                  { name: "origin", label: "Origin", required: false },
                  { name: "phenomenon", label: "Phenomenon", required: false },
                  { name: "remarks", label: "Remarks", required: false },
                  { name: "trade_name", label: "Trade Name", required: false },
                  { name: "treatment", label: "Treatment", required: false },
                ].map((item) => (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {item.label}
                          {item.required ? (
                            <span className="text-red-500">*</span>
                          ) : (
                            ""
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Enter ${item.name}`}
                            className="bg-white"
                            disabled={!editable}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Comments (full width) */}
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Comments<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter comments"
                            className="resize-none bg-white"
                            disabled={!editable}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* File Upload (full width) */}
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Update Image{" "}
                          <span className="text-gray-500">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <FileUploader
                            value={file}
                            onValueChange={setFile}
                            dropzoneOptions={dropZoneConfig}
                            className="relative bg-background rounded-lg p-2"
                          >
                            {file?.length === 0 && (
                              <FileInput
                                id="fileInput"
                                disabled={!editable}
                                className="outline-dashed outline-1 outline-slate-500"
                              >
                                <div className="flex items-center justify-center flex-col p-8 w-full">
                                  <CloudUpload className="text-gray-500 w-10 h-10" />
                                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload new image
                                    </span>{" "}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PNG or JPG (Optional - leave empty to keep
                                    current image)
                                  </p>
                                </div>
                              </FileInput>
                            )}

                            {file?.length > 0 && (
                              <div className="p-4 flex flex-col items-center justify-center gap-2">
                                <Image
                                  src={URL.createObjectURL(file[0])}
                                  alt="New Image"
                                  className="rounded shadow"
                                  width="200"
                                  height="200"
                                  style={{
                                    objectFit: "cover",
                                  }}
                                />
                                <p className="text-sm text-gray-700">
                                  {file[0].name}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => setFile([])}
                                  className="text-sm text-red-600 underline hover:text-red-800"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </FileUploader>
                        </FormControl>
                        <FormDescription>
                          {file.length
                            ? ""
                            : "Leave empty to keep the current image."}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="text_color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Color Picker
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Pick color`}
                          className="bg-white"
                          disabled={!editable}
                          type="color"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div></div>

                <FormField
                  control={form.control}
                  name="track_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Track No
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Enter track no`}
                          className="bg-white"
                          type="number"
                          disabled={!editable}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Contact No
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Enter contact no`}
                          className="bg-white"
                          disabled={!editable}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={`justify-end space-x-4 pt-6 border-t ${editable ? "flex" : "hidden"}`}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={updating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updating}
                  className={`${
                    updating
                      ? "cursor-not-allowed bg-primary/50"
                      : "cursor-pointer bg-primary"
                  }`}
                >
                  {updating ? "Updating..." : "Update Report"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
