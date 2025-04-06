// app/verify/page.js
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";

export default function VerifyPage() {
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // This is mock data - in a real app, you would fetch this from your backend
      if (data.reportNumber === "FGL123456") {
        setVerificationResult({
          status: "valid",
          report: {
            number: "FGL123456",
            date: "2023-10-15",
            gemstone: "Ruby",
            weight: "3.25 carats",
            color: "Pigeon Blood Red",
            clarity: "Eye Clean",
            treatment: "No Treatment",
            origin: "Burma (Myanmar)",
            issueDate: "2023-10-18",
          },
        });
      } else {
        setVerificationResult({
          status: "invalid",
          message:
            "No report found with this number. Please check and try again.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-20 pt-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Verify Your Gemstone Report
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Enter your FGL report number below to verify its authenticity and
            view the details.
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
                  htmlFor="reportNumber"
                  className="block text-accent font-medium mb-2"
                >
                  Report Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="reportNumber"
                    placeholder="Enter FGL report number (e.g., FGL123456)"
                    className={`w-full p-4 border ${
                      errors.reportNumber ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    {...register("reportNumber", {
                      required: "Report number is required",
                      pattern: {
                        value: /^FGL\d{6}$/,
                        message:
                          "Invalid report number format. Example: FGL123456",
                      },
                    })}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaSearch />
                  </div>
                </div>
                {errors.reportNumber && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.reportNumber.message}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-accent/60 mb-1">
                          Report Number
                        </p>
                        <p className="text-lg font-medium text-accent">
                          {verificationResult.report.number}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-accent/60 mb-1">
                          Issue Date
                        </p>
                        <p className="text-lg font-medium text-accent">
                          {verificationResult.report.issueDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-accent/60 mb-1">Gemstone</p>
                        <p className="text-lg font-medium text-accent">
                          {verificationResult.report.gemstone}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-accent/60 mb-1">Weight</p>
                        <p className="text-lg font-medium text-accent">
                          {verificationResult.report.weight}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-accent/60 mb-1">Color</p>
                        <p className="text-lg font-medium text-accent">
                          {verificationResult.report.color}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-accent/60 mb-1">Clarity</p>
                        <p className="text-lg font-medium text-accent">
                          {verificationResult.report.clarity}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-accent/60 mb-1">Treatment</p>
                        <p className="text-lg font-medium text-accent">
                          {verificationResult.report.treatment}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-accent/60 mb-1">Origin</p>
                        <p className="text-lg font-medium text-accent">
                          {verificationResult.report.origin}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-accent/60 mb-1">
                          Certified On
                        </p>
                        <p className="text-lg font-medium text-accent">
                          {verificationResult.report.date}
                        </p>
                      </div>
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
