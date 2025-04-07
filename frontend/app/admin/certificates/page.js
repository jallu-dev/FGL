"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaCertificate,
  FaEdit,
  FaDownload,
  FaEye,
  FaTrash,
} from "react-icons/fa";

export default function CertificatesPage() {
  // Sample data for certificates
  const [certificates, setCertificates] = useState([
    {
      id: "FGL-RBY-2025-001",
      gemType: "Ruby",
      weight: "3.4ct",
      client: "James Wilson",
      date: "Apr 7, 2025",
      origin: "Myanmar",
    },
    {
      id: "FGL-SPH-2025-002",
      gemType: "Sapphire",
      weight: "2.8ct",
      client: "Sarah Johnson",
      date: "Apr 6, 2025",
      origin: "Sri Lanka",
    },
    {
      id: "FGL-EMD-2025-003",
      gemType: "Emerald",
      weight: "2.1ct",
      client: "Robert Chen",
      date: "Apr 5, 2025",
      origin: "Colombia",
    },
    {
      id: "FGL-DMD-2025-004",
      gemType: "Diamond",
      weight: "1.5ct",
      client: "Emily Tanaka",
      date: "Apr 4, 2025",
      origin: "Botswana",
    },
    {
      id: "FGL-AQM-2025-005",
      gemType: "Aquamarine",
      weight: "5.7ct",
      client: "David Miller",
      date: "Apr 3, 2025",
      origin: "Brazil",
    },
    {
      id: "FGL-TZN-2025-006",
      gemType: "Tanzanite",
      weight: "3.2ct",
      client: "Lisa Garcia",
      date: "Apr 2, 2025",
      origin: "Tanzania",
    },
    {
      id: "FGL-OPL-2025-007",
      gemType: "Opal",
      weight: "4.6ct",
      client: "Michael Brown",
      date: "Apr 1, 2025",
      origin: "Australia",
    },
  ]);

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">
            Certificates
          </h1>
          <p className="text-accent/80">
            Manage gemstone certificates and authentications
          </p>
        </div>
        <Link
          href="/admin/certificates/create"
          className="btn-primary flex items-center"
        >
          <FaCertificate className="mr-2" />
          Generate Certificate
        </Link>
      </header>

      {/* Filters and Search */}
      <div className="premium-card p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search certificates..."
            className="px-4 py-2 border border-gray-200 rounded-md w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="px-4 py-2 border border-gray-200 rounded-md bg-white">
            <option value="">All Gem Types</option>
            <option value="ruby">Ruby</option>
            <option value="sapphire">Sapphire</option>
            <option value="emerald">Emerald</option>
            <option value="diamond">Diamond</option>
            <option value="other">Other</option>
          </select>
          <select className="px-4 py-2 border border-gray-200 rounded-md bg-white">
            <option value="">Sort By</option>
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="weight-desc">Weight (High to Low)</option>
            <option value="weight-asc">Weight (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider"
                >
                  Certificate ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider"
                >
                  Gem Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider"
                >
                  Weight
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider"
                >
                  Origin
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider"
                >
                  Client
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-accent uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certificates.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                    {certificate.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                    {certificate.gemType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                    {certificate.weight}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                    {certificate.origin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                    {certificate.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                    {certificate.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        className="text-primary hover:text-primary-dark"
                        title="View"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800"
                        title="Download"
                      >
                        <FaDownload size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-accent">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">7</span> of{" "}
            <span className="font-medium">7</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 bg-primary text-white rounded-md text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
