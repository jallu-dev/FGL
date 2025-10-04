"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setStatusMessage(
          "Thank you! Your message has been sent successfully. We'll get back to you soon."
        );
        reset(); // Clear form

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus("error");
        setStatusMessage(
          result.error || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage("An error occurred. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-20 pt-24 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Contact Us
        </h1>
        <p className="max-w-2xl mx-auto text-white/90 text-lg">
          Got questions or inquiries? Drop us a message below and we&apos;ll get
          back to you as soon as possible.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 container mx-auto px-6 max-w-2xl">
        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="premium-card p-8">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            Send us a Message
          </h2>

          {/* Name Field */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-accent">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John Doe"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-accent">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="john.doe@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-accent">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
                maxLength: {
                  value: 1000,
                  message: "Message must not exceed 1000 characters",
                },
              })}
              className={`w-full p-3 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Tell us how we can help you..."
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
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
                Sending Message...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
        {/* Status Message */}
        {submitStatus && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start space-x-3 animate-fade-in ${
              submitStatus === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {submitStatus === "success" ? (
              <FaCheckCircle className="text-green-500 text-xl mt-0.5 flex-shrink-0" />
            ) : (
              <FaExclamationCircle className="text-red-500 text-xl mt-0.5 flex-shrink-0" />
            )}
            <p
              className={`${
                submitStatus === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {statusMessage}
            </p>
          </div>
        )}
        {/* Additional Contact Info */}
        {/* <div className="mt-12 text-center">
          <div className="premium-card p-6">
            <h3 className="text-xl font-heading font-bold text-primary mb-4">
              Other Ways to Reach Us
            </h3>
            <div className="space-y-3 text-accent">
              <p className="flex items-center justify-center">
                <span className="font-medium mr-2">Email:</span>
                <a
                  href="mailto:info@fgl.com"
                  className="text-primary hover:underline"
                >
                  info@fgl.com
                </a>
              </p>
              <p className="flex items-center justify-center">
                <span className="font-medium mr-2">Phone:</span>
                <a
                  href="tel:+1234567890"
                  className="text-primary hover:underline"
                >
                  +1 (234) 567-890
                </a>
              </p>
              <p className="flex items-center justify-center">
                <span className="font-medium mr-2">Address:</span>
                <span>123 Gemstone Ave, Colombo, Sri Lanka</span>
              </p>
            </div>
          </div>
        </div> */}
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
