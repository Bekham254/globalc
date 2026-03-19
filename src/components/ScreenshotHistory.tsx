import React from 'react';
import { useScreenshots } from '../hooks/useScreenshots';
import { Calendar, FileText, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';

interface ScreenshotHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScreenshotHistory({ isOpen, onClose }: ScreenshotHistoryProps) {
  const { screenshots, loading, error } = useScreenshots();

  if (!isOpen) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'pending_review':
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'pending_review':
      default:
        return 'Pending Review';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-900/30 text-green-300';
      case 'rejected':
        return 'bg-red-900/30 text-red-300';
      case 'pending_review':
      default:
        return 'bg-yellow-900/30 text-yellow-300';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-green-400">Your Submissions</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-green-400">Loading submissions...</div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-400 mb-2">Error loading submissions</div>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          ) : screenshots.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <div className="text-gray-400">No submissions yet</div>
              <p className="text-gray-500 text-sm mt-2">Screenshot submissions will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {screenshots.map((screenshot) => (
                <div
                  key={screenshot.id}
                  className="bg-gray-900 rounded-lg border border-gray-700 p-4 hover:border-green-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <FileText className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-200 font-medium truncate">{screenshot.file_name}</p>
                        <p className="text-sm text-gray-500">ID: {screenshot.id}</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getStatusColor(screenshot.status)}`}>
                      {getStatusIcon(screenshot.status)}
                      <span>{getStatusText(screenshot.status)}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span>{formatDate(screenshot.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>File size: {formatFileSize(screenshot.file_size)}</span>
                    </div>
                    {screenshot.order_details && (
                      <div className="mt-2 p-2 bg-gray-800 rounded border border-gray-700">
                        <p className="text-xs text-gray-500 mb-1">Order Details:</p>
                        <p className="text-gray-300 text-sm">{screenshot.order_details}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
