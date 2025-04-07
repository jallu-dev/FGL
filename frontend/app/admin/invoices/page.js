"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaFileInvoiceDollar,
  FaEdit,
  FaDownload,
  FaEye,
  FaTrash,
} from "react-icons/fa";

export default function InvoicesPage() {
  // Sample data for invoices
  const [invoices, setInvoices] = useState([
    {
      id: "INV-20250407-001",
      client: "James Wilson",
      date: "Apr 7, 2025",
      amount: "$1,240",
      status: "Paid",
    },
    {
      id: "INV-20250406-003",
      client: "Sarah Johnson",
      date: "Apr 6, 2025",
      amount: "$2,450",
      status: "Paid",
    },
    {
      id: "INV-20250405-002",
      client: "Robert Chen",
      date: "Apr 5, 2025",
      amount: "$980",
      status: "Pending",
    },
    {
      id: "INV-20250404-005",
      client: "Emily Tanaka",
      date: "Apr 4, 2025",
      amount: "$3,200",
      status: "Paid",
    },
    {
      id: "INV-20250403-004",
      client: "David Miller",
      date: "Apr 3, 2025",
      amount: "$1,750",
      status: "Overdue",
    },
    {
      id: "INV-20250402-007",
      client: "Lisa Garcia",
      date: "Apr 2, 2025",
      amount: "$850",
      status: "Pending",
    },
    {
      id: "INV-20250401-006",
      client: "Michael Brown",
      date: "Apr 1, 2025",
      amount: "$1,100",
      status: "Paid",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">
            Invoices
          </h1>
          <p className="text-accent/80">Manage client invoices and payments</p>
        </div>
        <Link
          href="/admin/invoices/create"
          className="btn-primary flex items-center"
        >
          <FaFileInvoiceDollar className="mr-2" />
          Generate Invoice
        </Link>
      </header>

      {/* Filters and Search */}
      <div className="premium-card p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search invoices..."
            className="px-4 py-2 border border-gray-200 rounded-md w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="px-4 py-2 border border-gray-200 rounded-md bg-white">
            <option value="">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
          <select className="px-4 py-2 border border-gray-200 rounded-md bg-white">
            <option value="">Sort By</option>
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="amount-desc">Amount (High to Low)</option>
            <option value="amount-asc">Amount (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider"
                >
                  Invoice ID
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
                  className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider"
                >
                  Status
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
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                    {invoice.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-accent">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
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
