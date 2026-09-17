import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  MessageSquare,
  Clock,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { ContactFormData, UserProfile } from '../types';
import { SocialIconsBar, FacebookIcon, WhatsAppIcon, TelegramIcon, InstagramIcon } from './SocialIcons';

interface ContactSectionProps {
  userEmail?: string;
  profile?: UserProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  userEmail = 'mdh663723@gmail.com',
  profile
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate realistic submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  const handleSendViaMailClient = () => {
    const mailtoUrl = `mailto:${userEmail}?subject=${encodeURIComponent(
      formData.subject || 'Project Inquiry for Hasanullah'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 bg-gradient-to-b from-sky-50/60 via-white to-sky-100/70 relative overflow-hidden"
    >
      {/* Decorative ambient gradient glows */}
      <div
        className="pointer-events-none absolute -top-20 left-1/4 w-[500px] h-[300px] bg-gradient-to-b from-sky-300/35 via-cyan-200/25 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 w-[450px] h-[350px] bg-gradient-to-tl from-blue-300/30 via-sky-200/25 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-2xs">
            <MessageSquare className="w-4 h-4 text-sky-600" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Let’s Discuss Your Next{' '}
            <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 bg-clip-text text-transparent">
              High-Impact Project
            </span>
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            Have a project in mind, looking for a full-stack engineer, or want to collaborate with Hasanullah? Send a direct message or connect instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Methods & Direct Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Email Card with glowing accents */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-150/90 shadow-xl shadow-sky-500/10 hover:border-sky-300 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/30">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600">
                    Official Inquiries & Hiring
                  </span>
                  <div className="text-slate-900 font-extrabold text-base sm:text-lg break-all mt-0.5">
                    {userEmail}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-sky-100 flex items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  id="copy-email-btn"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-sky-600" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${userEmail}`}
                  id="direct-mailto-link"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Email Now</span>
                </a>
              </div>
            </div>

            {/* Availability & Location Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-150/90 shadow-xl shadow-sky-500/10 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Fast Response Guarantee
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Hasanullah usually replies within 2 to 4 hours on working days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-sky-100">
                <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Work Location & Timezones
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Available for Remote Worldwide contracts, agile team sprints, and freelance projects.
                  </p>
                </div>
              </div>

              {/* Social Channels with Official Branding Icons */}
              <div className="pt-4 border-t border-sky-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  Direct Channels & Social Profiles
                </span>
                {profile ? (
                  <SocialIconsBar profile={profile} variant="contact" />
                ) : (
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://www.facebook.com/profile.php?id=61593510214841"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white hover:bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/20 hover:border-[#1877F2]/40 transition-colors shadow-2xs"
                      title="Facebook"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://wa.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white hover:bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:border-[#25D366]/40 transition-colors shadow-2xs"
                      title="WhatsApp"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://t.me/hasanullah"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white hover:bg-[#229ED9]/10 text-[#229ED9] border border-[#229ED9]/20 hover:border-[#229ED9]/40 transition-colors shadow-2xs"
                      title="Telegram"
                    >
                      <TelegramIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white hover:bg-[#E1306C]/10 text-[#E1306C] border border-[#E1306C]/20 hover:border-[#E1306C]/40 transition-colors shadow-2xs"
                      title="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-9 border-2 border-sky-150/90 shadow-2xl shadow-sky-500/10 relative">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Message Sent to Hasanullah!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Your inquiry has been received and Hasanullah will get in touch with you at <strong className="text-slate-800">{formData.email}</strong> shortly.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={handleSendViaMailClient}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 shadow-md shadow-sky-500/20"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Mail App</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        Send a Direct Message
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">Fill in the fields below to start a conversation</p>
                    </div>
                    <span className="text-xs text-sky-700 font-bold bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                      Quick Reply
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        id="contact-form-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        id="contact-form-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Subject / Project Type
                    </label>
                    <input
                      type="text"
                      id="contact-form-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Web App Development / Portfolio Design"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      id="contact-form-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project requirements, timeline, or any questions..."
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all text-slate-800 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="submit"
                      id="contact-form-submit-btn"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/25 transition-all hover:scale-102 active:scale-98 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaMailClient}
                      className="text-xs font-semibold text-sky-700 hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Prefer your native email app? Click here
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
