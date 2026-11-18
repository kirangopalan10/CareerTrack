import { Trash2 } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, application, isLoading = false }) {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Delete Application</h3>
        <p className="text-sm text-slate-500 mt-2">
          Are you sure you want to delete your application for{' '}
          <strong className="text-slate-700">{application.companyName}</strong> ({application.jobTitle})? This action
          cannot be undone.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
