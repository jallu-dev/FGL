"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";

const AdminNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-gold" : "bg-white shadow-gold"
      }`}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/admin" className="flex items-center">
            <Image
              src="/images/fgl-color.png"
              alt="FGL Admin Logo"
              width={200}
              height={200}
              className="hidden md:block"
            />
            <Image
              src="/images/fgl-color-short.png"
              alt="FGL Admin Logo"
              width={80}
              height={80}
              className="block md:hidden"
            />
            <span className="ml-2 text-primary font-semibold">Admin</span>
          </Link>

          {/* Right Side Menu */}
          <div className="flex items-center space-x-6">
            <button className="text-accent relative">
              <FaBell size={20} />
              <span className="absolute -top-1 -right-1 bg-secondary text-xs text-accent w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            <div className="relative">
              <button
                className="flex items-center space-x-2"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <FaUser size={14} />
                </div>
                <span className="hidden md:block text-accent">Admin User</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    href="/admin/profile"
                    className="block px-4 py-2 text-sm text-accent hover:bg-gray-100"
                  >
                    Profile Settings
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center px-4 py-2 text-sm text-accent hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" size={14} />
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
