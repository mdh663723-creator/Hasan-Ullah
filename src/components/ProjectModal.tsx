import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Edit3,
  Video,
  Palette,
  Film,
  CheckCircle2,
  Maximize2,
  Minimize2,
  Expand,
  FileText,
  ZoomIn,
  ZoomOut,
  Download,
  Printer
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onEditProject?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onEditProject
}) => {
  const [activeTab, setActiveTab] = useState<'media' | 'poster'>('media');
  const [isTheater, setIsTheater] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cvViewMode, setCvViewMode] = useState<'full-doc' | 'embed'>('full-doc');
  const [cvZoomLevel, setCvZoomLevel] = useState<'fit' | 'medium' | 'large'>('fit');
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Helper to detect and format embed URLs (YouTube, Vimeo, Behance, Facebook)
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;

    // YouTube Shorts
    if (url.includes('youtube.com/shorts/')) {
      const id = url.split('youtube.com/shorts/')[1]?.split('?')[0]?.split('/')[0];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1&fs=1&enablejsapi=1` : null;
    }

    // Direct YouTube Embed
    if (url.includes('youtube.com/embed/')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}autoplay=1&rel=0&playsinline=1&fs=1&enablejsapi=1`;
    }

    // Standard YouTube Watch or youtu.be link
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      let videoId = '';
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      } else {
        try {
          videoId = new URL(url).searchParams.get('v') || '';
        } catch {
          videoId = '';
        }
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&fs=1&enablejsapi=1` : null;
    }

    // Vimeo
    if (url.includes('vimeo.com/')) {
      const id = url.split('vimeo.com/')[1]?.split('?')[0];
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1&fullscreen=1` : null;
    }

    // Behance Embed
    if (url.includes('behance.net/embed/project/')) {
      return url;
    }

    // Behance Gallery URL -> convert to embed
    if (url.includes('behance.net/gallery/')) {
      const match = url.match(/gallery\/(\d+)/);
      return match ? `https://www.behance.net/embed/project/${match[1]}?ilo0=1` : null;
    }

    // Facebook Video/Reel
    if (url.includes('facebook.com/reel/') || url.includes('facebook.com/watch') || url.includes('/videos/')) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&t=0`;
    }

    return null;
  };

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (!project) return null;

  const embedUrl = getEmbedUrl(project.videoUrl);
  const isDirectVideo = project.videoUrl && !embedUrl;
  const isBehanceEmbed = embedUrl?.includes('behance.net');
  const isFacebookEmbed = embedUrl?.includes('facebook.com');
  const isCvProject =
    project.id.includes('256189277') ||
    project.tags?.some((t) => t.toLowerCase().includes('cv') || t.toLowerCase().includes('resume')) ||
    project.title.toLowerCase().includes('cv') ||
    project.title.toLowerCase().includes('resume');
  const isShorts =
    !isCvProject &&
    !isBehanceEmbed &&
    (project.videoUrl?.includes('shorts') ||
      project.videoUrl?.includes('reel') ||
      isFacebookEmbed ||
      project.aspectRatio === 'portrait');

  // Toggle browser fullscreen for video container
  const toggleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      if (videoContainerRef.current) {
        if (videoContainerRef.current.requestFullscreen) {
          videoContainerRef.current.requestFullscreen().catch(() => {});
        } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
          (videoContainerRef.current as any).webkitRequestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 flex items-start justify-center min-h-screen animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`relative w-full my-auto transition-all duration-300 bg-slate-950 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-800 overflow-hidden ${
          isTheater || isCvProject ? 'max-w-5xl' : 'max-w-4xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dedicated Top Header Bar (No overlapping over the video player!) */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-950 text-sky-400 border border-sky-800/60">
              {project.categoryLabel}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white truncate">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Fullscreen Button */}
            {project.videoUrl && activeTab === 'media' && (
              <button
                type="button"
                onClick={toggleBrowserFullscreen}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors border border-slate-700"
                title={isFullscreen ? 'Exit Fullscreen' : 'Open Video in Fullscreen'}
              >
                <Expand className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}</span>
              </button>
            )}

            {/* Theater Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsTheater(!isTheater)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors border border-slate-700"
              title={isTheater ? 'Default View' : 'Expanded Theater View'}
            >
              {isTheater ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">Compact</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">Theater</span>
                </>
              )}
            </button>

            {/* Edit Project Button (if authorized) */}
            {onEditProject && (
              <button
                onClick={() => onEditProject(project)}
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors border border-slate-700"
                title="Edit Project"
              >
                <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              id="modal-close-btn"
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors border border-slate-700"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Media Container: Full Width & Clean Scaling (Zero Top/Bottom Clipping) */}
        <div
          ref={videoContainerRef}
          className="relative w-full bg-black flex items-center justify-center min-h-[260px]"
        >
          {project.videoUrl && activeTab === 'media' ? (
            embedUrl ? (
              <div className="w-full flex items-center justify-center bg-black p-2 sm:p-3">
                {isCvProject ? (
                  // Full Height Dedicated CV & Resume Document Viewer (পুরো সিভি যেন নিখুঁতভাবে দেখা যায়)
                  <div className="w-full flex flex-col items-center bg-slate-950 p-2 sm:p-4">
                    {/* CV View Mode Switcher and Zoom Controls */}
                    <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setCvViewMode('full-doc')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            cvViewMode === 'full-doc'
                              ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black shadow-md shadow-amber-400/25'
                              : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-950" />
                          <span>📄 সম্পূর্ণ সিভি ভিউ (ফুল ডকুমেন্ট)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setCvViewMode('embed')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            cvViewMode === 'embed'
                              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25'
                              : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                          }`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>🔗 Behance লাইভ উইজেট</span>
                        </button>
                      </div>

                      {/* Zoom Controls for Full Document Mode */}
                      {cvViewMode === 'full-doc' && (
                        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-1 rounded-xl">
                          <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">স্কেল:</span>
                          <button
                            type="button"
                            onClick={() => setCvZoomLevel('fit')}
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                              cvZoomLevel === 'fit' ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:text-white'
                            }`}
                            title="সম্পূর্ণ ১-পৃষ্ঠা একনজরে দেখুন"
                          >
                            পুরো পেজ (Fit)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCvZoomLevel('medium')}
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                              cvZoomLevel === 'medium' ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:text-white'
                            }`}
                            title="বড় করে পড়ার মোড"
                          >
                            রিডিং মোড (1.5x)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCvZoomLevel('large')}
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                              cvZoomLevel === 'large' ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:text-white'
                            }`}
                            title="ফুল রেজুলিউশন বড় ভিউ"
                          >
                            হাই-রেজ (2x)
                          </button>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {/* Download full CV */}
                        <a
                          href={project.image || "/projects/behance/256189277_original_cover.jpg"}
                          download="Hasanullah_Professional_CV_Resume.jpg"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-800/60 hover:bg-amber-900/60 transition-colors"
                          title="আসল সিভি ইমেজ ডাউনলোড করুন"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">ডাউনলোড</span>
                        </a>

                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-sky-400 hover:text-sky-300 bg-sky-950/60 border border-sky-800/60 transition-colors"
                        >
                          <span>Behance-এ মূল সিভি</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* CV Display: Full Height Unclipped with User's Authentic Image */}
                    {cvViewMode === 'embed' ? (
                      <div className="w-full max-w-4xl h-[78vh] min-h-[580px] sm:min-h-[720px] rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-800">
                        <iframe
                          src={embedUrl}
                          title={project.title}
                          allow="clipboard-write; fullscreen"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                          className="w-full h-full border-0 block"
                        />
                      </div>
                    ) : (
                      <div className="w-full max-w-4xl max-h-[80vh] overflow-y-auto overflow-x-auto rounded-2xl shadow-2xl bg-black/90 border border-slate-800 p-2 sm:p-5 flex flex-col items-center">
                        <div className="text-center mb-2 text-xs text-amber-300/80 font-medium">
                          ✦ হাসানুল্লাহর নিজস্ব প্রফেশনাল সিভি • সম্পূর্ণ A4 ডকুমেন্ট (উপরে-নিচে স্ক্রোল করে প্রতিটি সেকশন পড়ুন)
                        </div>
                        <img
                          src={project.image || "/projects/behance/256189277_original_cover.jpg"}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/projects/behance/256189277_original_cover.jpg';
                          }}
                          className={`rounded-xl shadow-2xl transition-all duration-300 select-none ${
                            cvZoomLevel === 'fit'
                              ? 'max-h-[72vh] w-auto object-contain cursor-zoom-in'
                              : cvZoomLevel === 'medium'
                              ? 'w-full max-w-2xl h-auto object-contain'
                              : 'w-full max-w-4xl h-auto object-contain'
                          }`}
                          onClick={() => {
                            setCvZoomLevel((prev) => (prev === 'fit' ? 'medium' : prev === 'medium' ? 'large' : 'fit'));
                          }}
                          title="ক্লিক করে জুম পরিবর্তন করুন"
                        />
                      </div>
                    )}
                  </div>
                ) : isShorts ? (
                  // Vertical Shorts / Reels (9:16)
                  <div className="w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] max-h-[75vh] rounded-xl overflow-hidden shadow-2xl bg-black border border-slate-800">
                    <iframe
                      src={embedUrl}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full border-0 block"
                    />
                  </div>
                ) : isBehanceEmbed ? (
                  // Behance Interactive Embed
                  <div className="w-full max-w-3xl h-[460px] sm:h-[540px] rounded-xl overflow-hidden shadow-2xl bg-black border border-slate-800">
                    <iframe
                      src={embedUrl}
                      title={project.title}
                      allow="clipboard-write; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full border-0 block"
                    />
                  </div>
                ) : (
                  // Landscape Video (16:9) - Full, Unclipped Player
                  <div className="w-full aspect-video max-h-[72vh] rounded-xl overflow-hidden shadow-2xl bg-black border border-slate-800">
                    <iframe
                      src={embedUrl}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full border-0 block"
                    />
                  </div>
                )}
              </div>
            ) : isDirectVideo ? (
              <div className="w-full aspect-video max-h-[72vh] flex items-center justify-center bg-black p-2 sm:p-3">
                <video
                  src={project.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-video max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/projects/shoe-mockup.webp';
                  }}
                  className="w-full h-full object-contain"
                />
              </div>
            )
          ) : (
            // High-Res Poster / Image Mode
            <div className={`relative w-full overflow-hidden bg-slate-950 flex items-center justify-center p-3 ${
              project.aspectRatio === 'portrait' ? 'h-[460px] sm:h-[540px]' : 'aspect-video max-h-[65vh]'
            }`}>
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/projects/shoe-mockup.webp';
                }}
                className="max-w-full max-h-full rounded-xl object-contain shadow-2xl"
              />
            </div>
          )}

          {/* Toggle Media / Poster if Video exists */}
          {project.videoUrl && (
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 shadow-lg">
              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'media' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isBehanceEmbed ? <Sparkles className="w-3.5 h-3.5" /> : <Film className="w-3.5 h-3.5" />}
                <span>{isBehanceEmbed ? 'Interactive' : 'Video Player'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('poster')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'poster' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Thumbnail / Poster</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Info Content */}
        <div className="p-5 sm:p-7 space-y-5">
          {/* Title & Metrics */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-sky-400 border border-slate-700">
                  {project.categoryLabel}
                </span>
                {project.videoUrl && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/80">
                    <Video className="w-3 h-3 text-purple-400" />
                    Video Project
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h3>
            </div>

            {project.metrics && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-sky-300 self-start sm:self-auto">
                <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{project.metrics}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            {project.description}
          </p>

          {/* Tools & Tags */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Tools & Software
            </h4>
            <div className="flex flex-wrap gap-2">
              {(project.toolsUsed && project.toolsUsed.length > 0 ? project.toolsUsed : project.tags).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-sky-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link Buttons */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="modal-live-preview-link"
              className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/20 transition-all hover:scale-101"
            >
              <span>{project.category === 'video' ? 'Open Directly on YouTube' : 'View on Behance / Live'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {project.videoUrl && (
              <button
                type="button"
                onClick={toggleBrowserFullscreen}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <Expand className="w-3.5 h-3.5 text-sky-400" />
                <span>Fullscreen</span>
              </button>
            )}

            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
