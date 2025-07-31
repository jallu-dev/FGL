"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import fgl_white_Base64 from "@/public/images/fgl_white_Base64";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Verify Report", path: "/verify" },
    { name: "Gem Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isMounted && scrolled
          ? "bg-white/90 backdrop-blur-md shadow-gold"
          : "md:text-white bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {isMounted && scrolled ? (
              <>
                <div className="hidden md:block w-[250px] h-[60px] relative">
                  <Image
                    src="/images/fgl-color.png"
                    alt="FGL Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
                <div className="block md:hidden w-[100px] h-[30px] relative">
                  <Image
                    src="/images/fgl-color-short.png"
                    alt="FGL Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:block w-[250px] h-[60px] relative overflow-hidden">
                  <Image
                    src="/images/fgl-white.png"
                    alt="FGL Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
                <div className="block md:hidden w-[100px] h-[30px] relative overflow-hidden">
                  <Image
                    src="/images/fgl-white-short.png"
                    alt="FGL Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="relative font-medium group"
              >
                {item.name}
                <span
                  className={`absolute left-0 bottom-0 w-0 h-0.5 ${
                    scrolled ? "bg-primary" : "bg-white"
                  } transition-all duration-300 group-hover:w-full`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isMounted && scrolled ? "text-slate-800" : "text-white"
              }  focus:outline-none`}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/95 backdrop-blur-md py-4 px-6 shadow-gold"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="slate-800 py-2 border-b border-gray-100 hover:text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
