import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  LogOut,
  Settings
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  onLogout: () => void;
  isAdmin: boolean;
}

const DEFAULT_PASSWORDS = ['hasan123', 'hasan2026', 'hasanullah'];

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onLogout,
  isAdmin
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);

  // Change password tab state
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [changeError, setChangeError] = useState('');
  const [changeSuccess, setChangeSuccess] = useState('');

  if (!isOpen) return null;

  const getCustomPassword = () => {
    try {
      return localStorage.getItem('portfolio_admin_custom_password') || '';
    } catch {
      return '';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const trimmed = password.trim();
    const customPass = getCustomPassword();

    const isMatch = customPass
      ? trimmed === customPass || DEFAULT_PASSWORDS.includes(trimmed)
      : DEFAULT_PASSWORDS.includes(trimmed);

    if (isMatch) {
      if (rememberDevice) {
        try {
          localStorage.setItem('portfolio_is_admin_v1', 'true');
        } catch {
          // ignore
        }
      }
      setSuccessMsg('সফলভাবে অ্যাডমিন হিসেবে লগইন হয়েছে! এখন সব অপশন সক্রিয়।');
      setTimeout(() => {
        onLoginSuccess();
        onClose();
        setPassword('');
        setSuccessMsg('');
      }, 700);
    } else {
      setError('ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন। (ডিফল্ট: hasan123)');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError('');
    setChangeSuccess('');

    const customPass = getCustomPassword();
    const isCurrentValid = customPass
      ? currentPass.trim() === customPass || DEFAULT_PASSWORDS.includes(currentPass.trim())
      : DEFAULT_PASSWORDS.includes(currentPass.trim());

    if (!isCurrentValid) {
      setChangeError('বর্তমান পাসওয়ার্ডটি সঠিক নয়!');
      return;
    }

    if (newPass.length < 4) {
      setChangeError('নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে!');
      return;
    }

    if (newPass !== confirmPass) {
      setChangeError('নতুন পাসওয়ার্ড দুটি মিলছে না!');
      return;
    }

    try {
      localStorage.setItem('portfolio_admin_custom_password', newPass.trim());
      localStorage.setItem('portfolio_is_admin_v1', 'true');
      setChangeSuccess('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => {
        setShowChangePassword(false);
        setChangeSuccess('');
      }, 1500);
    } catch {
      setChangeError('পাসওয়ার্ড সংরক্ষণ করা সম্ভব হয়নি।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-500 via-amber-400 to-blue-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Icon & Title */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
            {isAdmin ? <ShieldCheck className="w-6 h-6 text-amber-400" /> : <Lock className="w-6 h-6 text-sky-400" />}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
              <span>{isAdmin ? 'অ্যাডমিন প্যানেল' : 'অ্যাডমিন লগইন'}</span>
              {isAdmin && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  সক্রিয়
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              {isAdmin ? 'মালিকানা ও প্রজেক্ট কন্ট্রোল' : 'শুধুমাত্র ওয়েবসাইটের ওনার (Hasanullah) এর জন্য'}
            </p>
          </div>
        </div>

        {/* Explanatory note */}
        <div className="mb-5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <span>
            {isAdmin ? (
              <>
                বর্তমানে <strong>অ্যাডমিন মোড সক্রিয়</strong> রয়েছে। আপনি উপরে "Add Project" বাটন ও সব এডিট অপশন দেখতে পাচ্ছেন। সাধারণ ভিজিটররা এই লিংক পেলে তাদের কাছে এই অপশনগুলো লুকিয়ে থাকবে।
              </>
            ) : (
              <>
                অন্য কাউকে ওয়েবসাইট লিংক পাঠালে তাদের কাছে <strong>"Add Project" বাটনটি সম্পূর্ণভাবে লুকিয়ে থাকবে</strong>। শুধুমাত্র আপনি পাসওয়ার্ড দিয়ে লগইন করলে প্রজেক্ট যোগ ও এডিট করতে পারবেন।
              </>
            )}
          </span>
        </div>

        {isAdmin ? (
          /* Already Logged In Actions */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-3 text-amber-300 text-xs font-semibold">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span>আপনি বর্তমানে অ্যাডমিন হিসেবে সংযুক্ত আছেন। আপনার ব্রাউজারে এটি মনে রাখা হয়েছে।</span>
            </div>

            {showChangePassword ? (
              <form onSubmit={handleChangePassword} className="space-y-3.5 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-sky-400" />
                  <span>পাসওয়ার্ড পরিবর্তন করুন</span>
                </h4>

                {changeError && (
                  <div className="p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{changeError}</span>
                  </div>
                )}

                {changeSuccess && (
                  <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{changeSuccess}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">বর্তমান পাসওয়ার্ড:</label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    required
                    placeholder="বর্তমান পাসওয়ার্ড দিন"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">নতুন পাসওয়ার্ড:</label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    required
                    placeholder="কমপক্ষে ৪ অক্ষর"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">নতুন পাসওয়ার্ড নিশ্চিত করুন:</label>
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                    placeholder="পুনরায় নতুন পাসওয়ার্ড দিন"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors"
                  >
                    পাসওয়ার্ড সেভ করুন
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowChangePassword(false)}
                    className="py-2 px-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition-colors"
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePassword(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-sky-400" />
                  <span>পাসওয়ার্ড পরিবর্তন করুন</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>অ্যাডমিন থেকে লগআউট করুন</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Login Form */
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>অ্যাডমিন পাসওয়ার্ড (Admin Password):</span>
                <span className="text-[11px] text-sky-400 font-normal">ডিফল্ট: hasan123</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড লিখুন..."
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 pr-11 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Device Checkbox */}
            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-sky-500 focus:ring-sky-500/20"
              />
              <span>এই ডিভাইসে মনে রাখুন (পরবর্তীতে বারবার পাসওয়ার্ড দিতে হবে না)</span>
            </label>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/30 transition-all hover:scale-101 active:scale-98"
              >
                <Unlock className="w-4 h-4" />
                <span>লগইন করুন (Unlock)</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                বাতিল
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
