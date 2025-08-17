"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaCertificate,
  FaEdit,
  FaDownload,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllReports } from "@/utils/apiRequests/report.api";
import { toast } from "sonner";
import EditReportModal from "./EditReportModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import generateReportPDF from "./generateReportPDF";
import DownloadModal from "./DownloadModal";
import generateBriefReportPDF from "./generateBriefReportPDF";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [downloading, setDownloading] = useState({});
  const [downloadModal, setDownloadModal] = useState({
    isOpen: false,
    selectedReport: null,
  });

  const queryClient = useQueryClient();

  const { data, refetch: dataRefetch } = useQuery({
    queryFn: () => getAllReports({ page, limit, search }),
    queryKey: ["reports"],
  });

  useEffect(() => {
    dataRefetch();
  }, [page, search]);

  useEffect(() => {
    if (data && data.success) {
      setReports(data.rows);
      setTotal(data.total);
    }
    dataRefetch();
  }, [data]);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (reportId) => {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete report");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Report deleted successfully!");
      queryClient.invalidateQueries(["reports"]);
      setShowDeleteModal(false);
      setSelectedReport(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete report");
    },
  });

  // Fetch single report for editing
  const fetchReportForEdit = async (reportId) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch report details");
      }
      const data = await response.json();
      setSelectedReport(data.report);
      setShowEditModal(true);
    } catch (error) {
      toast.error("Failed to fetch report details");
      console.error(error);
    }
  };

  const handleEdit = (report) => {
    fetchReportForEdit(report.report_id);
  };

  const handleDelete = (report) => {
    setSelectedReport(report);
    setShowDeleteModal(true);
  };

  const handleDownloadClick = (report) => {
    setDownloadModal({
      isOpen: true,
      selectedReport: report,
    });
  };

  const handleDownloadModalClose = () => {
    if (!downloading[downloadModal.selectedReport?.report_id]) {
      setDownloadModal({
        isOpen: false,
        selectedReport: null,
      });
    }
  };

  const handleDownloadTypeSelect = async (reportType) => {
    const report = downloadModal.selectedReport;
    if (!report) return;

    setDownloading((prev) => ({ ...prev, [report.report_id]: true }));

    try {
      // Fetch full report data first
      const response = await fetch(`/api/reports/${report.report_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch report details");
      }
      const data = await response.json();

      // Generate PDF based on selected type
      if (reportType === "full") {
        await generateReportPDF(data.report, report.report_id, () => {});
        toast.success("Full report PDF downloaded successfully!");
      } else if (reportType === "brief") {
        await generateBriefReportPDF(data.report, report.report_id, () => {});
        toast.success("Brief report PDF downloaded successfully!");
      }

      // Close modal after successful download
      setDownloadModal({
        isOpen: false,
        selectedReport: null,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download PDF");
    } finally {
      setDownloading((prev) => ({ ...prev, [report.report_id]: false }));
    }
  };

  const confirmDelete = () => {
    if (selectedReport) {
      deleteMutation.mutate(selectedReport.report_id);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">
            Reports
          </h1>
          <p className="text-accent/80">Manage gemstone reports</p>
        </div>
        <Link
          href="/admin/reports/create"
          className="btn-primary flex items-center"
        >
          <FaCertificate className="mr-2" />
          Generate Report
        </Link>
      </header>

      {/* Filters and Search */}
      <div>
        {/* Search */}
        <div className="premium-card p-4 mb-6 flex justify-between">
          <input
            type="text"
            placeholder="Search by Report ID / Track No / Contact No..."
            value={search}
            onChange={(e) => {
              setPage(1); // reset to page 1 when searching
              setSearch(e.target.value);
            }}
            className="px-4 py-2 border border-gray-200 rounded-md w-full sm:w-96"
          />
        </div>

        {/* Table */}
        <div className="premium-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Track No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Report ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Species
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Variety
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Contact No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4">{report.track_no}</td>
                    <td className="px-6 py-4">{report.report_id}</td>
                    <td className="px-6 py-4">{report.species}</td>
                    <td className="px-6 py-4">{report.variety}</td>
                    <td className="px-6 py-4">{report.contact_no}</td>
                    <td className="px-6 py-4">
                      {new Date(report.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDownloadClick(report)}
                          disabled={downloading[report.report_id]}
                          className="p-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
                          title="Download PDF"
                        >
                          <FaDownload
                            className={
                              downloading[report.report_id]
                                ? "animate-spin"
                                : ""
                            }
                          />
                        </button>
                        <button
                          onClick={() => handleEdit(report)}
                          className="p-2 text-green-600 hover:text-green-800"
                          title="Edit Report"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(report)}
                          className="p-2 text-red-600 hover:text-red-800"
                          title="Delete Report"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t">
            <div className="text-sm text-accent">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, total)} of {total} results
            </div>
            <div className="flex space-x-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedReport && (
        <EditReportModal
          report={selectedReport}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedReport(null);
          }}
          onSuccess={() => {
            queryClient.invalidateQueries(["reports"]);
            setShowEditModal(false);
            setSelectedReport(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedReport(null);
        }}
        onConfirm={confirmDelete}
        reportId={selectedReport?.report_id}
        isLoading={deleteMutation.isPending}
      />

      <DownloadModal
        isOpen={downloadModal.isOpen}
        onClose={handleDownloadModalClose}
        onDownload={handleDownloadTypeSelect}
        isLoading={
          downloading[downloadModal.selectedReport?.report_id] || false
        }
      />
    </div>
  );
}
