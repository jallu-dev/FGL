import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-accent footer-bg text-slate-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-2xl mb-6 text-white">
              Finest Gem Lab
            </h3>
            <p className="mb-4">
              Professional gem certification and analysis services with
              scientific precision and excellence.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61572485684286"
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/finest_gem_lab"
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/shahmi-rinsan-fga-b607a4249"
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                target="_blank"
                href="https://wa.me/message/PDH7DQJLSC7XD1"
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors duration-300"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/verify"
                  className="hover:text-white transition-colors duration-300"
                >
                  Verify Report
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-white transition-colors duration-300"
                >
                  Gem Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-heading text-xl mb-6 text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-white mr-3 shrink-0" />
                <p>
                  94/3, Sally Hajiar Mawatha, Chinafort, Beruwala.
                  12070 Sri Lanka
                </p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-white mr-3 shrink-0" />
                <p>+94 (76) 3549226</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-white mr-3 shrink-0" />
                <p>info@fgl.lk</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Finest Gem Lab. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
