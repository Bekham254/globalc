import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FileText, CheckCircle, AlertCircle, Clock, X, Search, Key, Copy, Check } from 'lucide-react';

interface Screenshot {
  id: number;
  customer_email: string;
  order_details: string;
  file_name: string;
  file_size: number;
  status: string;
  created_at: string;
}

interface UserAccount {
  id: string;
  email: string;
  hasPassword: boolean;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'screenshots' | 'accounts'>('screenshots');
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [allAccounts, setAllAccounts] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedScreenshot, setSelectedScreenshot] = useState<Screenshot | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (activeTab === 'screenshots') {
        fetchScreenshots();
      } else {
        fetchAllAccounts();
      }
    }
  }, [isOpen, activeTab]);

  const fetchScreenshots = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: queryError } = await supabase
        .from('screenshot_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (queryError) throw queryError;
      setScreenshots(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load screenshots');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: allUsers, error: usersError } = await supabase
        .from('users')
        .select('id, email')
        .order('email');

      if (usersError) throw usersError;

      const { data: passwords, error: passwordsError } = await supabase
        .from('user_passwords')
        .select('user_id');

      if (passwordsError) throw passwordsError;

      const passwordUserIds = new Set(passwords?.map(p => p.user_id) || []);

      const accounts = allUsers?.map(u => ({
        id: u.id,
        email: u.email,
        hasPassword: passwordUserIds.has(u.id),
      })) || [];

      setAllAccounts(accounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async (userId: string) => {
    if (!newPassword.trim()) {
      setError('Password cannot be empty');
      return;
    }

    try {
      const { data: existing } = await supabase
        .from('user_passwords')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) {
        const { error: updateError } = await supabase
          .from('user_passwords')
          .update({ password: newPassword })
          .eq('user_id', userId);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('user_passwords')
          .insert({
            user_id: userId,
            password: newPassword,
          });

        if (insertError) throw insertError;
      }

      await fetchAllAccounts();
      setEditingUserId(null);
      setNewPassword('');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save password');
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error: updateError } = await supabase
        .from('screenshot_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (updateError) throw updateError;

      setScreenshots(screenshots.map(s =>
        s.id === id ? { ...s, status: newStatus } : s
      ));

      if (selectedScreenshot?.id === id) {
        setSelectedScreenshot({ ...selectedScreenshot, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredScreenshots = screenshots.filter(s => {
    const matchesSearch =
      s.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.order_details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredAccounts = allAccounts.filter(a =>
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">Admin Dashboard</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('screenshots')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'screenshots'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Screenshots
              </button>
              <button
                onClick={() => setActiveTab('accounts')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'accounts'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Key className="w-4 h-4 inline mr-2" />
                Manage Passwords
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          {activeTab === 'screenshots' ? (
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-700">
                <div className="p-4 border-b border-gray-700 space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search email, filename, or details..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {['all', 'pending_review', 'approved', 'rejected'].map(status => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          statusFilter === status
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {status === 'all' ? 'All' : status === 'pending_review' ? 'Pending' : status === 'approved' ? 'Approved' : 'Rejected'}
                      </button>
                    ))}
                  </div>

                  <div className="text-sm text-gray-400">
                    Showing {filteredScreenshots.length} of {screenshots.length} submissions
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {loading ? (
                    <div className="p-8 text-center text-green-400">Loading...</div>
                  ) : error ? (
                    <div className="p-8 text-center text-red-400">{error}</div>
                  ) : filteredScreenshots.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No submissions found</div>
                  ) : (
                    <div className="space-y-2 p-4">
                      {filteredScreenshots.map((screenshot) => (
                        <button
                          key={screenshot.id}
                          onClick={() => setSelectedScreenshot(screenshot)}
                          className={`w-full text-left p-4 rounded-lg border transition-colors ${
                            selectedScreenshot?.id === screenshot.id
                              ? 'bg-gray-700 border-green-500'
                              : 'bg-gray-900 border-gray-700 hover:border-green-500/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-200 truncate">{screenshot.customer_email}</p>
                              <p className="text-sm text-gray-400 truncate">{screenshot.file_name}</p>
                            </div>
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded ml-2 flex-shrink-0 ${getStatusColor(screenshot.status)}`}>
                              {getStatusIcon(screenshot.status)}
                              <span className="text-xs">{screenshot.status === 'pending_review' ? 'Pending' : screenshot.status}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">{formatDate(screenshot.created_at)}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {selectedScreenshot && (
                <div className="w-full lg:w-96 bg-gray-900 border-l border-gray-700 overflow-y-auto">
                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-green-400 mb-4">Submission Details</h3>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 block mb-2">Customer Email</label>
                      <p className="text-gray-200 break-all">{selectedScreenshot.customer_email}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 block mb-2">File Name</label>
                      <p className="text-gray-200 break-all">{selectedScreenshot.file_name}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 block mb-2">File Size</label>
                      <p className="text-gray-200">{formatFileSize(selectedScreenshot.file_size)}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 block mb-2">Submitted</label>
                      <p className="text-gray-200">{formatDate(selectedScreenshot.created_at)}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 block mb-2">Order Details</label>
                      <div className="bg-gray-800 rounded border border-gray-700 p-3">
                        <p className="text-gray-300 text-sm whitespace-pre-wrap break-words">{selectedScreenshot.order_details || 'N/A'}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 block mb-2">Status</label>
                      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg ${getStatusColor(selectedScreenshot.status)}`}>
                        {getStatusIcon(selectedScreenshot.status)}
                        <span>{selectedScreenshot.status === 'pending_review' ? 'Pending Review' : selectedScreenshot.status.charAt(0).toUpperCase() + selectedScreenshot.status.slice(1)}</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-700">
                      <button
                        onClick={() => updateStatus(selectedScreenshot.id, 'approved')}
                        disabled={selectedScreenshot.status === 'approved'}
                        className={`w-full py-2 rounded-lg font-medium transition-colors ${
                          selectedScreenshot.status === 'approved'
                            ? 'bg-green-900/50 text-green-400 cursor-default'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(selectedScreenshot.id, 'rejected')}
                        disabled={selectedScreenshot.status === 'rejected'}
                        className={`w-full py-2 rounded-lg font-medium transition-colors ${
                          selectedScreenshot.status === 'rejected'
                            ? 'bg-red-900/50 text-red-400 cursor-default'
                            : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => updateStatus(selectedScreenshot.id, 'pending_review')}
                        disabled={selectedScreenshot.status === 'pending_review'}
                        className={`w-full py-2 rounded-lg font-medium transition-colors ${
                          selectedScreenshot.status === 'pending_review'
                            ? 'bg-yellow-900/50 text-yellow-400 cursor-default'
                            : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        }`}
                      >
                        Mark as Pending
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-700 space-y-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="text-sm text-gray-400">
                  Total accounts: {allAccounts.length}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center text-green-400">Loading...</div>
                ) : error ? (
                  <div className="p-8 text-center text-red-400">{error}</div>
                ) : filteredAccounts.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">No accounts found</div>
                ) : (
                  <div className="space-y-2 p-4">
                    {filteredAccounts.map((account) => (
                      <div
                        key={account.id}
                        className="p-4 rounded-lg bg-gray-900 border border-gray-700 hover:border-green-500/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-200 truncate">{account.email}</p>
                            <p className="text-xs text-gray-500">
                              {account.hasPassword ? 'Password set' : 'No password'}
                            </p>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs ${
                            account.hasPassword
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-yellow-900/30 text-yellow-400'
                          }`}>
                            {account.hasPassword ? 'Configured' : 'Missing'}
                          </div>
                        </div>

                        {editingUserId === account.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Enter password"
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSavePassword(account.id)}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingUserId(null);
                                  setNewPassword('');
                                  setError(null);
                                }}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded text-sm font-medium transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingUserId(account.id);
                              setNewPassword('');
                            }}
                            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-2 rounded text-sm font-medium transition-colors"
                          >
                            {account.hasPassword ? 'Update Password' : 'Set Password'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
