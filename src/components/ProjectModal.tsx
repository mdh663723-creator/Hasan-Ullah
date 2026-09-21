import React, { useState } from 'react';
import { X, ExternalLink, Sparkles, ArrowUpRight, Play, Edit3, Video, Palette, Film, CheckCircle2 } from 'lucide-react';
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

  if (!project) return null;

  // Helper to detect if media is YouTube, Vimeo, or Behance embed
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/shorts/')) {
      const id = url.split('youtube.com/shorts/')[1]?.split('?')[0]?.split('/')[0];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
    }
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      const videoId = url.includes('youtu.be/')
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : new URL(url).searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
    }
    if (url.includes('vimeo.com/')) {
      const id = url.split('vimeo.com/')[1]?.split('?')[0];
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null;
    }
    if (url.includes('behance.net/embed/project/')) {
      return url;
    }
    if (url.includes('behance.net/gallery/')) {
      const match = url.match(/gallery\/(\d+)/);
      return match ? `https://www.behance.net/embed/project/${match[1]}?ilo0=1` : null;
    }
    if (url.includes('facebook.com/reel/') || url.includes('facebook.com/watch') || url.includes('/videos/')) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&t=0`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(project.videoUrl);
  const isDirectVideo = project.videoUrl && !embedUrl;
  const isBehanceEmbed = embedUrl?.includes('behance.net');
  const isFacebookEmbed = embedUrl?.includes('facebook.com');
  const isShorts = project.videoUrl?.includes('shorts') || project.videoUrl?.includes('reel') || isFacebookEmbed || project.aspectRatio === 'portrait';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-slate-950 rounded-3xl shadow-2xl border-2 border-slate-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Close and Edit */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {onEditProject && (
            <button
              onClick={() => {
                onEditProject(project);
              }}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md text-xs font-bold transition-all shadow-md border border-white/10"
              title="Edit project details"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Project</span>
            </button>
          )}

          <button
            onClick={onClose}
            type="button"
            id="modal-close-btn"
            className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-colors shadow-md border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Container: Video Player / Interactive Embed OR Image Preview */}
        <div className="relative w-full bg-black flex items-center justify-center overflow-hidden">
          {project.videoUrl && activeTab === 'media' ? (
            embedUrl ? (
              <div className="w-full flex items-center justify-center bg-black p-2 sm:p-4">
                <iframe
                  src={embedUrl}
                  title={project.title}
                  allow={isBehanceEmbed ? "clipboard-write" : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className={`border-0 rounded-2xl shadow-2xl bg-slate-900 ${
                    isShorts
                      ? "w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] h-[480px] sm:h-[550px]"
                      : isBehanceEmbed
                      ? "w-full max-w-[540px] h-[340px]"
                      : "w-full aspect-video"
                  }`}
                />
              </div>
            ) : isDirectVideo ? (
              <div className="w-full max-h-[440px] flex items-center justify-center bg-black">
                <video
                  src={project.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[440px] object-contain"
                />
              </div>
            ) : (
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/projects/shoe-mockup.webp';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          ) : (
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/projects/shoe-mockup.webp';
                }}
                className="w-full h-full object-contain sm:object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Toggle Media / Poster if Video or Embed exists */}
          {project.videoUrl && (
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 p-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/20">
              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                  activeTab === 'media' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isBehanceEmbed ? <Sparkles className="w-3.5 h-3.5" /> : <Film className="w-3.5 h-3.5" />}
                <span>{isBehanceEmbed ? 'Interactive View' : 'Video Player'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('poster')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                  activeTab === 'poster' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>High-Res Poster</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Category & Title */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-900 text-sky-400 border border-slate-700 shadow-sm">
                {project.categoryLabel}
              </span>
              {project.videoUrl && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-950 text-purple-300 border border-purple-800">
                  <Video className="w-3 h-3 text-purple-400" />
                  Video Project
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          {/* Key highlights / metrics */}
          {project.metrics && (
            <div className="flex items-center gap-2 p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm font-bold text-sky-300">
              <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{project.metrics}</span>
            </div>
          )}

          {/* Full Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Project Overview
            </h4>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Tools & Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Tools & Software Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {(project.toolsUsed && project.toolsUsed.length > 0 ? project.toolsUsed : project.tags).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-bold text-sky-300 bg-sky-950/60 border border-sky-800/60 rounded-lg flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Direct CTA Buttons */}
          <div className="pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="modal-live-preview-link"
              className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/25 transition-all"
            >
              <span>View Full Project / Link</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {onEditProject && (
              <button
                onClick={() => onEditProject(project)}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <Edit3 className="w-4 h-4 text-sky-400" />
                <span>Edit Project</span>
              </button>
            )}

            <button
              onClick={onClose}
              type="button"
              className="px-5 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
