import { Briefcase, LogOut, Plus, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAddModal }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-none">CareerTrack</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Job Application Dashboard</p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Application</span>
          </button>

          {/* User Email Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span className="max-w-[160px] truncate">{user?.email || 'User'}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            title="Sign out"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-rose-600 text-sm font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
