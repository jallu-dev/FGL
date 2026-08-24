import Link from "next/link";
import { FaHome, FaSearch, FaCertificate, FaEnvelope } from "react-icons/fa";

export const metadata = {
  title: "404 - Page Not Found | FGL - Finest Gem Lab",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <div className="premium-card p-10 md:p-12 shadow-gold">
          <p className="text-secondary font-heading text-6xl md:text-8xl font-bold mb-4">
            404
          </p>
          <h1 className="text-2xl md:text-4xl font-heading font-bold text-primary mb-4">
            Page Not Found
          </h1>
          <p className="text-accent/80 text-base md:text-lg mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <FaHome /> Back to Home
            </Link>
            <Link
              href="/verify"
              className="bg-accent text-white px-6 py-3 rounded-md hover:bg-accent/90 transition-all flex items-center justify-center gap-2"
            >
              <FaCertificate /> Verify Report
            </Link>
            <Link
              href="/services"
              className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <FaSearch /> Our Services
            </Link>
            <Link
              href="/contact"
              className="border border-gray-300 text-accent px-6 py-3 rounded-md hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <FaEnvelope /> Contact Us
            </Link>
          </div>

          <div className="border-t border-gray-200 pt-6 text-sm text-accent/60">
            Need immediate assistance? Reach us at{" "}
            <a
              href="mailto:info@fgl.lk"
              className="text-primary font-medium hover:underline"
            >
              info@fgl.lk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
