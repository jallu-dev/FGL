"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaHome,
  FaFileInvoiceDollar,
  FaCertificate,
  FaImages,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome size={18} />, path: "/admin" },
    // {
    //   name: "Invoices",
    //   icon: <FaFileInvoiceDollar size={18} />,
    //   path: "/admin/invoices",
    // },
    {
      name: "Reports",
      icon: <FaCertificate size={18} />,
      path: "/admin/reports",
    },
    { name: "Images", icon: <FaImages size={18} />, path: "/admin/images" },
    // {
    //   name: "Analytics",
    //   icon: <FaChartBar size={18} />,
    //   path: "/admin/analytics",
    // },
    // { name: "Settings", icon: <FaCog size={18} />, path: "/admin/settings" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-primary text-white rounded-md shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-40 w-64 h-full
          border-r border-gray-200 bg-white min-h-screen
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block
        `}
      >
        <div className="p-4">
          {/* Mobile close button area */}
          <div className="flex justify-between items-center mb-6 md:justify-start">
            <h2 className="text-lg font-heading font-bold text-primary pl-2">
              Admin Panel
            </h2>
            <button
              onClick={closeMobileMenu}
              className="md:hidden p-1 text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={closeMobileMenu} // Close menu when link is clicked on mobile
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  pathname === item.path
                    ? "bg-primary text-white"
                    : "text-accent hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
