import React from 'react';
import { ShieldCheck, Eye, EyeOff, LogOut, Lock, KeyRound } from 'lucide-react';

interface AdminStatusBarProps {
  isAdmin: boolean;
  isVisitorPreview: boolean;
  onToggleVisitorPreview: () => void;
  onOpenAdminModal: () => void;
  onLogout: () => void;
}

export const AdminStatusBar: React.FC<AdminStatusBarProps> = ({
  isAdmin,
  isVisitorPreview,
  onToggleVisitorPreview,
  onOpenAdminModal,
  onLogout
}) => {
  // If not admin and not previewing, show nothing
  if (!isAdmin && !isVisitorPreview) return null;

  if (isVisitorPreview) {
    return (
      <aside aria-label="Visitor Preview Mode Notice" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92%] sm:w-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-amber-500/90 text-slate-950 font-bold text-xs sm:text-sm shadow-2xl backdrop-blur-md border border-amber-300 animate-bounce-subtle">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 shrink-0 text-slate-950" />
            <span>👁️ সাধারণ ভিজিটর ভিউ প্রিভিউ (Add Project লুকানো রয়েছে)</span>
          </div>
          <button
            onClick={onToggleVisitorPreview}
            type="button"
            className="px-3 py-1 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-300 text-xs font-black shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            অ্যাডমিন মোডে ফিরুন ↩
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label="Admin Controls" className="fixed bottom-4 right-4 z-40 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-950/90 hover:bg-slate-950 text-slate-200 border border-slate-700/80 shadow-2xl backdrop-blur-md transition-all">
      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
        <ShieldCheck className="w-4 h-4 text-amber-400" />
        <span>Admin Active</span>
      </div>

      <div className="h-3 w-px bg-slate-700 mx-1" />

      {/* Button to test what visitors see */}
      <button
        onClick={onToggleVisitorPreview}
        type="button"
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        title="অন্যদের কাছে কেমন দেখাবে তা পরীক্ষা করুন (Add Project ছাড়া)"
      >
        <Eye className="w-3.5 h-3.5 text-sky-400" />
        <span>ভিউয়ার টেস্ট</span>
      </button>

      {/* Settings / Modal */}
      <button
        onClick={onOpenAdminModal}
        type="button"
        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        title="Admin Settings / Change Password"
        aria-label="Admin Settings / Change Password"
      >
        <KeyRound className="w-3.5 h-3.5" />
      </button>

      {/* Quick Logout */}
      <button
        onClick={onLogout}
        type="button"
        className="p-1 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-slate-800 transition-colors"
        title="Logout Admin"
        aria-label="Logout Admin"
      >
        <LogOut className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
