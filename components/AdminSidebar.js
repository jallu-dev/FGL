"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaFileInvoiceDollar,
  FaCertificate,
  FaImages,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const AdminSidebar = () => {
  const pathname = usePathname();

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

  return (
    <aside className="w-64 border-r border-gray-200 hidden md:block bg-white min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-heading font-bold text-primary mb-6 pl-2">
          Admin Panel
        </h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
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
  );
};

export default AdminSidebar;
