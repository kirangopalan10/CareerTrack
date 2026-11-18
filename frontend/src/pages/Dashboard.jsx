import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import ApplicationModal from '../components/ApplicationModal';
import DeleteModal from '../components/DeleteModal';
import {
  Search,
  Filter,
  Plus,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Edit2,
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 8,
    totalPages: 1,
    totalElements: 0,
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState('');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);

  // Fetch applications
  const fetchApplications = useCallback(
    async (page = 0) => {
      setIsLoading(true);
      setError('');
      try {
        const params = {
          page: page,
          size: pageInfo.size,
        };

        if (searchTerm.trim()) params.companyName = searchTerm.trim();
        if (statusFilter) params.status = statusFilter;
        if (locationFilter.trim()) params.location = locationFilter.trim();
        if (minSalary && !isNaN(minSalary)) params.minSalary = parseFloat(minSalary);
        if (maxSalary && !isNaN(maxSalary)) params.maxSalary = parseFloat(maxSalary);

        // Uses the versatile backend specification filter endpoint
        const response = await api.get('/api/application/filters', { params });
        const data = response.data;

        setApplications(data.content || []);
        setPageInfo({
          page: data.number || 0,
          size: data.size || 8,
          totalPages: data.totalPages || 1,
          totalElements: data.totalElements || 0,
        });
      } catch (err) {
        console.error('Failed to fetch applications', err);
        setError('Failed to fetch applications. Make sure the Spring Boot backend is running.');
      } finally {
        setIsLoading(false);
      }
    },
    [searchTerm, statusFilter, locationFilter, minSalary, maxSalary, pageInfo.size]
  );

  useEffect(() => {
    fetchApplications(0);
  }, [fetchApplications]);

  // Handle Save (Create or Update)
  const handleSaveApplication = async (formData) => {
    setIsActionLoading(true);
    try {
      if (selectedApp) {
        await api.put(`/api/application/update/${selectedApp.applicationId}`, formData);
      } else {
        await api.post('/api/application/create', formData);
      }
      setIsModalOpen(false);
      setSelectedApp(null);
      fetchApplications(pageInfo.page);
    } catch (err) {
      console.error('Failed to save application', err);
      alert(err.response?.data?.error || 'Failed to save application. Please verify all fields.');
    } finally {
      setIsActionLoading(false);
    }
  };

  // Handle Delete
  const handleDeleteApplication = async () => {
    if (!appToDelete) return;
    setIsActionLoading(true);
    try {
      await api.delete(`/api/application/delete/${appToDelete.applicationId}`);
      setIsDeleteModalOpen(false);
      setAppToDelete(null);
      fetchApplications(pageInfo.page);
    } catch (err) {
      console.error('Failed to delete application', err);
      alert('Failed to delete application.');
    } finally {
      setIsActionLoading(false);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setLocationFilter('');
    setMinSalary('');
    setMaxSalary('');
  };

  // Calculate metrics from current applications or totals
  const stats = {
    total: pageInfo.totalElements,
    applied: applications.filter((a) => a.status === 'Applied').length,
    interview: applications.filter((a) => a.status === 'Interview').length,
    selected: applications.filter((a) => a.status === 'Selected').length,
    rejected: applications.filter((a) => a.status === 'Rejected').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        onOpenAddModal={() => {
          setSelectedApp(null);
          setIsModalOpen(true);
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{stats.total}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Applied</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{stats.applied}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Interview</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{stats.interview}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Selected</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{stats.selected}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 col-span-2 sm:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Rejected</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{stats.rejected}</h3>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-44">
                <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Advanced Filters Toggle */}
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  showAdvancedFilters
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
                title="Toggle more filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {/* Refresh Button */}
              <button
                type="button"
                onClick={() => fetchApplications(pageInfo.page)}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Advanced Filter Drawer */}
          {showAdvancedFilters && (
            <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Remote, Bangalore"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Min Salary</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Max Salary</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
            {error}
          </div>
        )}

        {/* Applications List Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {isLoading && applications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-500">Loading applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No applications found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                {searchTerm || statusFilter || locationFilter
                  ? 'No applications match your active filters. Try adjusting your search query.'
                  : 'Start tracking your career opportunities by creating your first application.'}
              </p>
              <button
                onClick={() => {
                  setSelectedApp(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Application
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-6">Company</th>
                    <th className="py-3.5 px-6">Role</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6">Location</th>
                    <th className="py-3.5 px-6">Salary</th>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {applications.map((app) => (
                    <tr key={app.applicationId} className="hover:bg-slate-50/80 transition-colors">
                      {/* Company Name */}
                      <td className="py-4 px-6 font-semibold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
                            {app.companyName.charAt(0).toUpperCase()}
                          </div>
                          <span>{app.companyName}</span>
                        </div>
                      </td>

                      {/* Job Title */}
                      <td className="py-4 px-6 text-slate-700 font-medium">{app.jobTitle}</td>

                      {/* Status Badge */}
                      <td className="py-4 px-6">
                        <StatusBadge status={app.status} />
                      </td>

                      {/* Location */}
                      <td className="py-4 px-6 text-slate-500 text-xs">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {app.location}
                        </span>
                      </td>

                      {/* Salary */}
                      <td className="py-4 px-6 text-slate-700 font-semibold text-xs">
                        {app.salary ? (
                          <span className="inline-flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                            {app.salary.toLocaleString()}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>

                      {/* Applied Date */}
                      <td className="py-4 px-6 text-slate-500 text-xs">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {app.appliedDate || '—'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                            title="Edit Application"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setAppToDelete(app);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {pageInfo.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <p className="text-xs text-slate-500">
                Page <span className="font-semibold text-slate-700">{pageInfo.page + 1}</span> of{' '}
                <span className="font-semibold text-slate-700">{pageInfo.totalPages}</span> ({pageInfo.totalElements}{' '}
                applications)
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchApplications(pageInfo.page - 1)}
                  disabled={pageInfo.page === 0 || isLoading}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  onClick={() => fetchApplications(pageInfo.page + 1)}
                  disabled={pageInfo.page >= pageInfo.totalPages - 1 || isLoading}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Application Add/Edit Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedApp(null);
        }}
        onSave={handleSaveApplication}
        application={selectedApp}
        isLoading={isActionLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAppToDelete(null);
        }}
        onConfirm={handleDeleteApplication}
        application={appToDelete}
        isLoading={isActionLoading}
      />
    </div>
  );
}
