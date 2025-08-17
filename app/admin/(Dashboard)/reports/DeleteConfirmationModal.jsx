"use client";

import { Button } from "@/components/ui/button";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { X } from "lucide-react";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  reportId,
  isLoading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-full">
              <FaExclamationTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Delete Report</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete report{" "}
            <span className="font-semibold text-gray-900">{reportId}</span>?
          </p>
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            <strong>Warning:</strong> This action cannot be undone. The report
            and all associated data will be permanently deleted.
          </p>
        </div>

        <div className="flex justify-end space-x-4 p-6 border-t bg-gray-50 rounded-b-lg">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Deleting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <FaTrash className="w-4 h-4" />
                <span>Delete Report</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
