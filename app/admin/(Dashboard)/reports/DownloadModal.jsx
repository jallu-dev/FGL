import React from "react";
import { FaTimes, FaFileAlt, FaIdCard } from "react-icons/fa";

const DownloadModal = ({ isOpen, onClose, onDownload, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Choose Report Type
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-gray-600 text-sm mb-6">
            Select the type of report you want to download:
          </p>

          {/* Full Report Option */}
          <button
            onClick={() => onDownload("full")}
            disabled={isLoading}
            className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
              <FaFileAlt className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-gray-900 mb-1">Full Report</h4>
              <p className="text-sm text-gray-600">
                Complete gemological report with all details (A4 Landscape)
              </p>
            </div>
          </button>

          {/* Brief Report Option */}
          <button
            onClick={() => onDownload("brief")}
            disabled={isLoading}
            className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mr-4 group-hover:bg-green-200 transition-colors">
              <FaIdCard className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-gray-900 mb-1">Brief Report</h4>
              <p className="text-sm text-gray-600">
                Compact ID card format with essential details only
              </p>
            </div>
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600">
              Generating PDF...
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
