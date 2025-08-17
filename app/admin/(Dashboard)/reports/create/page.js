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
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/extension/file-upload";
import { useMutation, useQuery } from "@tanstack/react-query";
import generateReportPDF from "../generateReportPDF";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  date: z.coerce.date(),
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
});

export default function MyForm() {
  const [file, setFile] = useState([]);
  const [generating, setGenerating] = useState(false);
  const router = useRouter();

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
    },
  });

  const onSubmit = async () => {
    setGenerating(true);
    try {
      await handleGenerateReport(form.getValues());

      toast.success("Report Created Succefully");
      router.replace("/admin/reports");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateReport = async (data) => {
    try {
      // Validate file size on frontend first
      if (file.length > 0 && file[0].size > 10 * 1024 * 1024) {
        toast.error(
          `File too large: ${(file[0].size / 1024 / 1024).toFixed(
            2
          )}MB. Maximum size is 10MB.`
        );
        return;
      }

      const formData = new FormData();

      // Append all form fields
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value?.toString() || "");
      }

      // Append file if present
      if (file.length > 0) {
        formData.append("image", file[0]);
      } else {
        toast.error("Please select an image file.");
        return;
      }

      // Make request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

      const res = await fetch("/api/reports", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result = await res.json();

      if (res.ok) {
        toast.success("Report submitted successfully!");

        // Reset form after successful submission
        // form.reset();
        setFile([]);
      } else {
        // Handle specific error cases
        if (res.status === 413) {
          toast.error("File too large. Please use a file smaller than 10MB.");
        } else {
          toast.error(
            result.error || "Failed to submit report. Please try again."
          );
        }
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Failed to generate report:", error);

      if (error.name === "AbortError") {
        toast.error("Upload timeout. Please try with a smaller file.");
      } else if (!error.message.includes("File too large")) {
        toast.error("Failed to submit report. Please try again.");
      }

      throw error;
    }
  };

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
        setFile([]); // Clear the file
        return;
      }

      // Check file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type. Please select a JPG or PNG image.");
        setFile([]); // Clear the file
        return;
      }

      form.setValue("file", URL.createObjectURL(selectedFile));
    }
  }, [file, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto py-10 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Remaining fields */}
          {[
            { name: "description", label: "Description", required: true },
            { name: "species", label: "Species", required: true },
            { name: "variety", label: "Variety", required: true },
            { name: "weight", label: "Weight", required: true },
            { name: "measurement", label: "Measurement", required: true },
            { name: "colour", label: "Colour", required: true },
            { name: "shape", label: "Shape & Cut", required: true },
            { name: "transparency", label: "Transparency", required: true },
            { name: "origin", label: "Origin", required: false },
            { name: "phenomenon", label: "Phenomenon", required: false },
            { name: "remarks", label: "Remarks", required: false },
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
                    Select File<span className="text-red-500">*</span>
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
                          className="outline-dashed outline-1 outline-slate-500"
                        >
                          <div className="flex items-center justify-center flex-col p-8 w-full">
                            <CloudUpload className="text-gray-500 w-10 h-10" />
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG or JPG
                            </p>
                          </div>
                        </FileInput>
                      )}

                      {file?.length > 0 && (
                        <div className="p-4 flex flex-col items-center justify-center gap-2">
                          <Image
                            src={URL.createObjectURL(file[0])}
                            alt="Uploaded"
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
                    {file.length ? "" : "Select a file to upload."}
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-6">
          <Button
            className={`bg-blue ${
              generating
                ? "cursor-not-allowed bg-primary/50"
                : "cursor-pointer bg-primary"
            }`}
            disabled={generating ? true : false}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
