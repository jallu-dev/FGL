"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
} from "react-icons/fa";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: null },
  ];

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
          "Thank you! Your message has been sent successfully. Our team will get back to you soon."
        );
        reset();

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
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Contact Finest Gem Lab — China Fort, Beruwala
          </h1>
          <p className="max-w-2xl mx-auto text-white/90 text-lg">
            Have questions regarding gemstone certification, Ceylon sapphire testing,
            or laboratory intake? Visit our facility in Beruwala or reach out
            below.
          </p>
        </div>
      </section>

      {/* Breadcrumbs Component */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Contact Section: Info + Form */}
      <section className="py-12 container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Information & Visiting Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="premium-card p-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                Laboratory Location & Details
              </h2>
              <p className="text-accent/80 text-sm mb-6 leading-relaxed">
                Finest Gem Lab is centrally located on China Fort Road, Beruwala.
                We welcome gem dealers, jewelers, and visitors for on-site gemstone
                testing and certification.
              </p>

              <div className="space-y-4 text-sm text-accent">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-secondary text-lg mr-3 mt-1 shrink-0" />
                  <div>
                    <span className="font-semibold text-primary block">Address:</span>
                    <span>64D/2F, China Fort Rd, Beruwala, 12070, Sri Lanka</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="text-secondary text-lg mr-3 mt-1 shrink-0" />
                  <div>
                    <span className="font-semibold text-primary block">Phone:</span>
                    <a
                      href="tel:+94763549226"
                      className="text-primary hover:underline"
                    >
                      +94 (76) 3549226
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaWhatsapp className="text-green-600 text-lg mr-3 mt-1 shrink-0" />
                  <div>
                    <span className="font-semibold text-primary block">WhatsApp:</span>
                    <a
                      href="https://wa.me/message/PDH7DQJLSC7XD1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 font-semibold hover:underline"
                    >
                      Chat with Gemologist
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="text-secondary text-lg mr-3 mt-1 shrink-0" />
                  <div>
                    <span className="font-semibold text-primary block">Email:</span>
                    <a
                      href="mailto:info@fgl.lk"
                      className="text-primary hover:underline"
                    >
                      info@fgl.lk
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="text-secondary text-lg mr-3 mt-1 shrink-0" />
                  <div>
                    <span className="font-semibold text-primary block">Operating Hours:</span>
                    <span>Monday – Saturday: 9:00 AM – 6:00 PM</span>
                    <span className="block text-xs text-accent/60">Sunday: Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Intake Guidelines */}
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 text-xs text-accent/80 space-y-2">
              <h3 className="font-bold text-primary text-sm mb-2">
                Gemstone Submission Guidelines
              </h3>
              <p>• Loose or jewelry-mounted gemstones accepted.</p>
              <p>• Express same-day testing available for trade merchants.</p>
              <p>• Secure courier intake available from Colombo & Ratnapura.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} className="premium-card p-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                Send Us a Message
              </h2>

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
                    className={`text-sm ${
                      submitStatus === "success" ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {statusMessage}
                  </p>
                </div>
              )}

              {/* Name Field */}
              <div className="mb-5">
                <label className="block mb-2 font-medium text-accent text-sm">
                  Full Name <span className="text-red-500">*</span>
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
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-5">
                <label className="block mb-2 font-medium text-accent text-sm">
                  Email Address <span className="text-red-500">*</span>
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
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="name@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label className="block mb-2 font-medium text-accent text-sm">
                  Inquiry / Message <span className="text-red-500">*</span>
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
                  className={`w-full p-3 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tell us about the gemstones you wish to certify or your inquiry..."
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm py-3"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h3 className="text-xl font-heading font-bold text-primary mb-4 text-center">
            Find Finest Gem Lab on the Map
          </h3>
          <p className="text-center text-accent/70 text-sm mb-6">
            Located near Hidayathulla Gem Tower, China Fort Road, Beruwala.
          </p>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.350756834872!2d79.9874871!3d6.477181300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae22e1f963e0f17%3A0x1f4ff62b8ddb0fff!2sHidayathulla%20Gem%20Tower!5e0!3m2!1sen!2slk!4v1778177558850!5m2!1sen!2slk"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: 16 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
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
