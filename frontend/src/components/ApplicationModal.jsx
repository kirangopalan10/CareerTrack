import { useState, useEffect } from 'react';
import { X, Building2, Briefcase, MapPin, DollarSign, Calendar, AlertCircle } from 'lucide-react';

export default function ApplicationModal({ isOpen, onClose, onSave, application = null, isLoading = false }) {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    status: 'Applied',
    location: '',
    salary: '',
    appliedDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (application) {
      setFormData({
        companyName: application.companyName || '',
        jobTitle: application.jobTitle || '',
        status: application.status || 'Applied',
        location: application.location || '',
        salary: application.salary != null ? application.salary : '',
        appliedDate: application.appliedDate || new Date().toISOString().split('T')[0],
      });
    } else {
      setFormData({
        companyName: '',
        jobTitle: '',
        status: 'Applied',
        location: '',
        salary: '',
        appliedDate: new Date().toISOString().split('T')[0],
      });
    }
    setErrors({});
  }, [application, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName.trim() || formData.companyName.length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
    }
    if (!formData.jobTitle.trim() || formData.jobTitle.length < 2) {
      newErrors.jobTitle = 'Job title must be at least 2 characters';
    }
    if (!formData.location.trim() || formData.location.length < 2) {
      newErrors.location = 'Location must be at least 2 characters';
    }
    if (!formData.salary || isNaN(formData.salary) || Number(formData.salary) <= 0) {
      newErrors.salary = 'Please enter a valid salary greater than 0';
    }
    if (!formData.appliedDate) {
      newErrors.appliedDate = 'Application date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      salary: parseFloat(formData.salary),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {application ? 'Edit Application' : 'Add New Application'}
            </h2>
            <p className="text-xs text-slate-500">
              {application ? 'Update the details for this position' : 'Track a new job you applied for'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Company Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. Google, Zoho, Microsoft"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                  errors.companyName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                } focus:outline-hidden focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
            {errors.companyName && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.companyName}
              </p>
            )}
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Job Title / Role <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. Full Stack Developer, Software Engineer"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                  errors.jobTitle ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                } focus:outline-hidden focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
            {errors.jobTitle && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.jobTitle}
              </p>
            )}
          </div>

          {/* Status & Location in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Status <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Location <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Remote, Bangalore"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                    errors.location ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                  } focus:outline-hidden focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
              {errors.location && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.location}
                </p>
              )}
            </div>
          </div>

          {/* Salary & Applied Date in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Salary ($ or LPA) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="number"
                  placeholder="e.g. 75000"
                  step="any"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                    errors.salary ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                  } focus:outline-hidden focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
              {errors.salary && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.salary}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Date Applied <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={formData.appliedDate}
                  onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                    errors.appliedDate ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                  } focus:outline-hidden focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
              {errors.appliedDate && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.appliedDate}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? 'Saving...' : application ? 'Update Application' : 'Save Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
