// app/verify/page.js
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function VerifyPage() {
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const paramId = searchParams.get("id");

  const colors = {
    primary: "#9b111e",
    secondary: "#fba518",
    accent: "#1b2a41",
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    white: "#ffffff",
    black: "#000000",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const reportId = data?.id || paramId;

      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportId }),
      });

      const result = await response.json();

      if (result.success) {
        setVerificationResult({
          status: "valid",
          report: result.report,
        });
      } else {
        setVerificationResult({
          status: "invalid",
          message:
            result.message ||
            "No report found with this report id. Please check and try again.",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationResult({
        status: "invalid",
        message:
          "An error occurred while verifying the report. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (paramId) {
      setValue("id", paramId);
      onSubmit({ id: paramId });
    }
  }, [paramId, setValue]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-20 pt-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Verify Your Gemstone Report
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Enter your REPORT ID below to verify its authenticity and view the
            details.
          </p>
        </div>
      </section>

      {/* Verification Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="premium-card p-8"
            >
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                Report Verification
              </h2>

              <div className="mb-6">
                <label
                  htmlFor="id"
                  className="block text-accent font-medium mb-2"
                >
                  REPORT ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="id"
                    placeholder="Enter REPORT ID (e.g., FGL123456)"
                    className={`w-full p-4 border ${
                      errors.id ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    {...register("id", {
                      required: "Report ID is required",
                      pattern: {
                        value: /^FGL\d{9}$/,
                        message:
                          "Invalid REPORT ID format. Example: FGL123456789",
                      },
                    })}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaSearch />
                  </div>
                </div>
                {errors.id && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.id.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Verify Report"
                )}
              </button>
            </form>

            {/* Verification Result */}
            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`mt-8 premium-card p-8 ${
                  verificationResult.status === "valid"
                    ? "border-l-4 border-green-500"
                    : "border-l-4 border-red-500"
                }`}
              >
                {verificationResult.status === "valid" ? (
                  <>
                    <div className="flex items-center mb-6">
                      <FaCheckCircle className="text-green-500 text-2xl mr-3" />
                      <h3 className="text-2xl font-heading font-bold text-green-600">
                        Valid Certificate
                      </h3>
                    </div>

                    <div>
                      <div
                        style={{
                          backgroundColor: colors.gray[100],
                          width: "150px",
                          height: "150px",
                          position: "relative",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "5px",
                          border: `2px solid ${colors.gray[200]}`,
                          alignSelf: "center",
                        }}
                      >
                        {verificationResult.report.image_file_path ? (
                          <Image
                            src={verificationResult.report.image_file_path}
                            alt="Gem"
                            width="150"
                            height="150"
                            style={{
                              borderRadius: "8px",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "80px",
                              height: "80px",
                              backgroundColor: colors.primary,
                              borderRadius: "50%",
                            }}
                          ></div>
                        )}
                      </div>
                      {/* Report ID */}
                      {verificationResult.report.report_id && (
                        <div className="mb-1">
                          <p className="text-sm text-accent/60">Report ID</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.report_id}
                          </p>
                        </div>
                      )}

                      {/* Description */}
                      {verificationResult.report.description && (
                        <div className="mb-1.5">
                          <p className="text-sm text-accent/60">Description</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.description}
                          </p>
                        </div>
                      )}

                      {/* Species */}
                      {verificationResult.report.species && (
                        <div className="mb-1.5">
                          <p className="text-sm text-accent/60">Species</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.species}
                          </p>
                        </div>
                      )}

                      {/* Variety */}
                      {verificationResult.report.variety && (
                        <div className="mb-1.5">
                          <p className="text-sm text-accent/60">Variety</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.variety}
                          </p>
                        </div>
                      )}

                      {/* Weight */}
                      {verificationResult.report.weight && (
                        <div className="mb-1.5">
                          <p className="text-sm text-accent/60">Weight</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.weight}
                          </p>
                        </div>
                      )}

                      {/* Measurement */}
                      {verificationResult.report.measurement && (
                        <div className="mb-1.5">
                          <p className="text-sm text-accent/60">Measurement</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.measurement}
                          </p>
                        </div>
                      )}

                      {/* Colour */}
                      {verificationResult.report.colour && (
                        <div className="mb-1.5">
                          <p className="text-sm text-accent/60">Colour</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.colour}
                          </p>
                        </div>
                      )}

                      {/* Shape */}
                      {verificationResult.report.shape && (
                        <div className="mb-1.5">
                          <p className="text-sm text-accent/60">Shape</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.shape}
                          </p>
                        </div>
                      )}

                      {/* Transparency */}
                      {verificationResult.report.transparency && (
                        <div className="mb-1.5">
                          <p className="text-sm text-accent/60">Transparency</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.transparency}
                          </p>
                        </div>
                      )}

                      {/* Origin */}
                      {verificationResult.report.origin && (
                        <div className="mb-1.5">
                          <p className="text-sm text-accent/60">Origin</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.origin}
                          </p>
                        </div>
                      )}

                      {/* Phenomenon */}
                      {verificationResult.report.phenomenon && (
                        <div className="mb-1.5">
                          <p className="text-sm text-accent/60">Phenomenon</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.phenomenon}
                          </p>
                        </div>
                      )}

                      {/* Remarks */}
                      {verificationResult.report.remarks && (
                        <div className="mb-1.5">
                          <p className="text-sm text-accent/60">Remarks</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.remarks}
                          </p>
                        </div>
                      )}

                      {/* Comments */}
                      {verificationResult.report.comments && (
                        <div className="md:col-span-2 mb-1.5">
                          <p className="text-sm text-accent/60">Comments</p>
                          <p className="text-lg font-medium text-accent">
                            {verificationResult.report.comments}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center mb-4">
                      <FaTimesCircle className="text-red-500 text-2xl mr-3" />
                      <h3 className="text-2xl font-heading font-bold text-red-600">
                        Invalid Report
                      </h3>
                    </div>
                    <p className="text-red-700">{verificationResult.message}</p>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
