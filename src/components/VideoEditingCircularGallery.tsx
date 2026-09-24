import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  MousePointer,
  ExternalLink,
  Sparkles,
  Film,
  Video,
  Play,
  RotateCcw,
  Maximize2,
  Monitor,
  Smartphone,
  Layers,
  ArrowRight,
  Expand,
  Volume2
} from 'lucide-react';
import { Project } from '../types';

interface VideoEditingCircularGalleryProps {
  projects: Project[];
  onOpenProjectModal: (project: Project) => void;
  onEditProject?: (project: Project) => void;
  onDeleteCustomProject?: (id: string) => void;
  onBackToAll?: () => void;
}

type AspectRatioFilter = 'all' | 'landscape' | 'portrait';

export const VideoEditingCircularGallery: React.FC<VideoEditingCircularGalleryProps> = ({
  projects,
  onOpenProjectModal,
  onBackToAll
}) => {
  // Aspect ratio filter: all, landscape (16:9), portrait (9:16 reels/shorts)
  const [aspectFilter, setAspectFilter] = useState<AspectRatioFilter>('all');

  // Filter projects by aspect ratio
  const filteredProjects = useMemo(() => {
    if (aspectFilter === 'all') return projects;
    if (aspectFilter === 'landscape') {
      return projects.filter(
        (p) =>
          p.aspectRatio === 'landscape' ||
          (!p.videoUrl?.includes('shorts') && !p.videoUrl?.includes('reel') && p.aspectRatio !== 'portrait')
      );
    }
    if (aspectFilter === 'portrait') {
      return projects.filter(
        (p) =>
          p.aspectRatio === 'portrait' ||
          p.videoUrl?.includes('shorts') ||
          p.videoUrl?.includes('reel')
      );
    }
    return projects;
  }, [projects, aspectFilter]);

  // Current selected project in circular spotlight
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    return projects.length > 0 ? projects[0] : null;
  });

  // Track the current sliding index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Inline video playing state (Plays directly at the top!)
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  // Top player container ref for scrolling and fullscreen
  const topPlayerRef = useRef<HTMLDivElement>(null);
  const spotlightVideoRef = useRef<HTMLDivElement>(null);

  // Keep selected project valid when filter changes
  useEffect(() => {
    if (filteredProjects.length > 0) {
      if (!selectedProject || !filteredProjects.find((p) => p.id === selectedProject.id)) {
        setSelectedProject(filteredProjects[0]);
        setCurrentIndex(0);
        setIsPlayingInline(false);
      }
    }
  }, [filteredProjects]);

  // Helper to format embed URLs for iframe
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/shorts/')) {
      const id = url.split('youtube.com/shorts/')[1]?.split('?')[0]?.split('/')[0];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1&fs=1&enablejsapi=1` : null;
    }
    if (url.includes('youtube.com/embed/')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}autoplay=1&rel=0&playsinline=1&fs=1&enablejsapi=1`;
    }
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
    if (url.includes('facebook.com/reel/') || url.includes('facebook.com/watch') || url.includes('/videos/')) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&t=0`;
    }
    if (url.includes('vimeo.com/')) {
      const id = url.split('vimeo.com/')[1]?.split('?')[0];
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1&fullscreen=1` : null;
    }
    return null;
  };

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const nextIdx = prev > 0 ? prev - 1 : filteredProjects.length - 1;
      setSelectedProject(filteredProjects[nextIdx]);
      return nextIdx;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIdx = prev < filteredProjects.length - 1 ? prev + 1 : 0;
      setSelectedProject(filteredProjects[nextIdx]);
      return nextIdx;
    });
  };

  // When clicking any circular video card:
  // "উপরের দিকে প্লে হয়, যেন উপরের অংশ প্লে হয়, মানে প্লে করতে চাইলে প্লে হয়"
  const handleSelectProject = (project: Project, index: number) => {
    setSelectedProject(project);
    setCurrentIndex(index);
    setIsPlayingInline(true); // Automatically start playing at the top!

    // Smoothly scroll the top player into view
    if (topPlayerRef.current) {
      topPlayerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredProjects.length]);

  const handleFullscreenSpotlight = () => {
    if (spotlightVideoRef.current) {
      if (spotlightVideoRef.current.requestFullscreen) {
        spotlightVideoRef.current.requestFullscreen().catch(() => {});
      } else if ((spotlightVideoRef.current as any).webkitRequestFullscreen) {
        (spotlightVideoRef.current as any).webkitRequestFullscreen();
      }
    }
  };

  // Slider geometry: 220px item + 24px gap
  const itemWidth = 244;
  const trackOffset = -currentIndex * itemWidth;

  const isCurrentProjectPortrait =
    selectedProject?.aspectRatio === 'portrait' ||
    selectedProject?.videoUrl?.includes('shorts') ||
    selectedProject?.videoUrl?.includes('reel');

  const embedUrl = selectedProject ? getEmbedUrl(selectedProject.videoUrl) : null;
  const isDirectVideo = selectedProject?.videoUrl && !embedUrl;

  return (
    <div className="w-full py-6 relative">
      {/* Top Banner & Aspect Ratio Organizer Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Info: Badge, Title & Aspect Ratio Tabs */}
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold tracking-wide">
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span>ভিডিও এডিটিং শোকেস</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
              মোট {filteredProjects.length} টি গোল ভিডিও
            </span>
            {onBackToAll && (
              <button
                onClick={onBackToAll}
                className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors ml-2 underline underline-offset-4"
              >
                ← অল প্রজেক্টে ফিরুন
              </button>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>Video Editing Circular Showcase</span>
            <span className="w-3 h-3 rounded-full bg-purple-400 animate-pulse inline-block" />
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            ভিডিও এডিটিং ও মোশন গ্রাফিক্সের কাজগুলো উপরে সরাসরি প্লে হয় এবং নিচে গোল আকারে সাজানো রয়েছে। যেকোনো গোল আইটেমে ক্লিক করলেই উপরের অংশে তৎক্ষণাৎ ভিডিও চালু হবে।
          </p>

          {/* Aspect Ratio Filter Tabs (অনুপাতগুলো সুন্দরভাবে সাজানো) */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              অনুপাত ফিল্টার:
            </span>

            <button
              onClick={() => {
                setAspectFilter('all');
                setIsPlayingInline(false);
              }}
              type="button"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                aspectFilter === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/25'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700'
              }`}
            >
              <span>সকল ভিডিও ({projects.length})</span>
            </button>

            <button
              onClick={() => {
                setAspectFilter('landscape');
                setIsPlayingInline(false);
              }}
              type="button"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                aspectFilter === 'landscape'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>১৬:৯ ল্যান্ডস্কেপ মোশন</span>
            </button>

            <button
              onClick={() => {
                setAspectFilter('portrait');
                setIsPlayingInline(false);
              }}
              type="button"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                aspectFilter === 'portrait'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/25'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>৯:১৬ রিলস ও শর্টস</span>
            </button>
          </div>
        </div>

        {/* Right Corner Cursor Controls */}
        <div className="relative z-10 flex items-center gap-3 sm:gap-4 bg-slate-950/90 border-2 border-purple-500/40 p-3 rounded-2xl shadow-lg shadow-purple-500/10 self-start lg:self-center">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold">
            <MousePointer className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
            <span className="hidden sm:inline">কার্সার কন্ট্রোল:</span>
            <span>{String(currentIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}</span>
          </div>

          <button
            onClick={handlePrev}
            id="video-circular-gallery-prev-btn"
            type="button"
            className="group p-3 rounded-xl bg-slate-800 hover:bg-purple-600 text-white border border-slate-700 hover:border-purple-400 shadow-md hover:shadow-purple-500/30 transition-all hover:scale-105 active:scale-95"
            title="পূর্ববর্তী ভিডিও (বাম দিকে)"
            aria-label="Previous circular video"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            id="video-circular-gallery-next-btn"
            type="button"
            className="group px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm border border-purple-400 shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            title="পরবর্তী ভিডিও (ডান দিকে)"
            aria-label="Next circular video"
          >
            <span>পরবর্তী</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* TOP SECTION: Featured Video Theater Stage ("উপরের অংশে যেন প্লে হয়") */}
      <div ref={topPlayerRef} className="mb-10">
        <AnimatePresence mode="wait">
          {selectedProject && (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-purple-500/40 shadow-2xl relative overflow-hidden"
            >
              {/* Ambient lighting */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Video Screen Column (Takes prime spot on the left/center) */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center">
                  <div
                    ref={spotlightVideoRef}
                    className="relative w-full rounded-2xl overflow-hidden bg-black border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 flex flex-col items-center justify-center group"
                  >
                    {isPlayingInline ? (
                      // Video Player in Exact Aspect Ratio (No cutoff!)
                      <div className={`w-full flex items-center justify-center ${
                        isCurrentProjectPortrait ? 'max-w-[320px] aspect-[9/16]' : 'aspect-video'
                      }`}>
                        {embedUrl ? (
                          <iframe
                            src={embedUrl}
                            title={selectedProject.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="w-full h-full border-0 block"
                          />
                        ) : isDirectVideo ? (
                          <video
                            src={selectedProject.videoUrl}
                            controls
                            autoPlay
                            playsInline
                            className="w-full h-full object-contain"
                          />
                        ) : null}
                      </div>
                    ) : (
                      // Preview Screen with Big Instant Play Overlay
                      <div
                        onClick={() => setIsPlayingInline(true)}
                        className={`relative w-full cursor-pointer overflow-hidden ${
                          isCurrentProjectPortrait ? 'max-w-[320px] aspect-[9/16]' : 'aspect-video'
                        }`}
                      >
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/projects/motion-graphics-showreel.jpg';
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Dark Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                        {/* Top Live Badge */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${
                            isCurrentProjectPortrait
                              ? 'bg-pink-950/80 text-pink-300 border-pink-500/40'
                              : 'bg-purple-950/80 text-purple-300 border-purple-500/40'
                          }`}>
                            {isCurrentProjectPortrait ? '📱 ৯:১৬ রিলস' : '🖥️ ১৬:৯ ফুল এইচডি'}
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-black/80 text-xs font-bold text-slate-300 border border-white/10 backdrop-blur-md">
                            সক্রিয় ভিডিও
                          </span>
                        </div>

                        {/* Big Pulsing Center Play Button */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.8)] transform scale-100 group-hover:scale-110 transition-transform animate-pulse">
                            <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white text-white ml-1 drop-shadow-lg" />
                          </div>
                          <span className="mt-3 px-4 py-1.5 rounded-full bg-black/80 border border-white/20 text-xs sm:text-sm font-extrabold text-white tracking-wide shadow-lg group-hover:bg-purple-600 transition-colors">
                            ▶ এখানে সরাসরি প্লে করুন
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Player Controls Bar */}
                    <div className="w-full p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                      {isPlayingInline ? (
                        <button
                          onClick={() => setIsPlayingInline(false)}
                          type="button"
                          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
                          <span>থাম্বনেইলে ফিরুন</span>
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                          <span>HD 1080p কোয়ালিটি</span>
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        {isPlayingInline && (
                          <button
                            onClick={handleFullscreenSpotlight}
                            type="button"
                            className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors px-2 py-1 rounded-md bg-slate-900 border border-slate-800"
                            title="ফুল স্ক্রিন করুন"
                          >
                            <Expand className="w-3.5 h-3.5" />
                            <span>ফুল স্ক্রিন</span>
                          </button>
                        )}
                        <button
                          onClick={() => onOpenProjectModal(selectedProject)}
                          type="button"
                          className="inline-flex items-center gap-1 text-purple-300 hover:text-white transition-colors px-2 py-1 rounded-md bg-purple-950/60 border border-purple-800/60"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>মডালে বিস্তারিত</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Info Column: Video Details & Quick Actions */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider">
                        {selectedProject.categoryLabel || 'Video Editing'}
                      </span>
                      <span className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                        isCurrentProjectPortrait
                          ? 'bg-pink-950/60 border-pink-800/60 text-pink-300'
                          : 'bg-sky-950/60 border-sky-800/60 text-sky-300'
                      }`}>
                        {isCurrentProjectPortrait ? '📱 ৯:১৬ রিলস ও শর্টস' : '🖥️ ১৬:৯ ল্যান্ডস্কেপ মোশন'}
                      </span>
                      {selectedProject.metrics && (
                        <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold">
                          {selectedProject.metrics}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {selectedProject.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {/* Tools Used */}
                    <div className="mt-5">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        ব্যবহৃত সফটওয়্যার ও স্কিল:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(selectedProject.toolsUsed && selectedProject.toolsUsed.length > 0
                          ? selectedProject.toolsUsed
                          : selectedProject.tags
                        ).map((tool, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-bold rounded-xl bg-slate-800 text-purple-300 border border-slate-700 flex items-center gap-1.5"
                          >
                            <Video className="w-3 h-3 text-purple-400" />
                            <span>{tool}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Buttons */}
                  <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setIsPlayingInline(true)}
                      type="button"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-purple-500 via-indigo-600 to-pink-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white text-white" />
                      <span>{isPlayingInline ? 'চলমান রয়েছে ▶' : 'উপরে সরাসরি প্লে করুন'}</span>
                    </button>

                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-extrabold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-md transition-all hover:scale-102 active:scale-98"
                      >
                        <span>সরাসরি লিঙ্ক</span>
                        <ExternalLink className="w-4 h-4 text-sky-400" />
                      </a>
                    )}

                    <button
                      onClick={handleNext}
                      type="button"
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold text-purple-400 hover:text-purple-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 transition-colors ml-auto"
                    >
                      <span>পরবর্তী ভিডিও</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM SECTION: Circular Video Selector Carousel ("গোলাকারে ভিডিও প্রজেক্টগুলো এড করে দাও") */}
      <div className="p-4 sm:p-6 rounded-3xl bg-slate-950/60 border border-slate-850 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping inline-block" />
            <h4 className="text-sm sm:text-base font-bold text-white">
              গোলাকার ভিডিও তালিকা (যেকোনোটিতে ক্লিক করলে উপরে প্লে হবে):
            </h4>
          </div>
          <span className="text-xs text-slate-400">
            {currentIndex + 1} / {filteredProjects.length}
          </span>
        </div>

        {/* Circular Sliding Track */}
        <div className="relative w-full overflow-hidden py-3 px-1">
          <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-6 cursor-grab active:cursor-grabbing"
            animate={{ x: trackOffset }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          >
            {filteredProjects.map((project, idx) => {
              const isSelected = selectedProject?.id === project.id;
              const isPortrait =
                project.aspectRatio === 'portrait' ||
                project.videoUrl?.includes('shorts') ||
                project.videoUrl?.includes('reel');

              return (
                <div
                  key={project.id}
                  onClick={() => handleSelectProject(project, idx)}
                  id={`video-circular-item-${project.id}`}
                  className="shrink-0 flex flex-col items-center group select-none text-center"
                  style={{ width: '220px' }}
                >
                  {/* Circular Outer Disc */}
                  <div
                    className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 transition-all duration-500 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-tr from-purple-500 via-sky-400 to-pink-500 scale-108 shadow-[0_0_35px_rgba(168,85,247,0.5)] ring-4 ring-purple-400/40'
                        : 'bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-800 hover:bg-gradient-to-tr hover:from-purple-500 hover:via-sky-400 hover:to-indigo-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]'
                    }`}
                  >
                    {/* Orbit Ring */}
                    {isSelected && (
                      <div className="absolute inset-[-8px] rounded-full border-2 border-dashed border-purple-400 animate-spin-slow pointer-events-none" />
                    )}

                    {/* Circular Frame */}
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative border-2 border-slate-900 shadow-inner">
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/projects/motion-graphics-showreel.jpg';
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-700 select-none"
                      />

                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-950/80 via-transparent to-transparent group-hover:opacity-40 transition-opacity" />

                      {/* Circular Play Icon */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full backdrop-blur-[2px]">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-500 to-sky-400 text-white scale-110 shadow-purple-500/50'
                            : 'bg-black/80 border border-white/30 text-white group-hover:scale-110 group-hover:bg-purple-600'
                        }`}>
                          <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                        </div>
                        <span className="text-[10px] font-extrabold text-white mt-1.5 drop-shadow-md">
                          {isSelected ? 'উপরে চলছে' : 'উপরে চালান'}
                        </span>
                      </div>

                      {/* Aspect Ratio Badge on Circle */}
                      <div className="absolute top-2.5 left-1/2 -translate-x-1/2">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold backdrop-blur-md border ${
                          isPortrait
                            ? 'bg-pink-950/85 text-pink-300 border-pink-500/40'
                            : 'bg-sky-950/85 text-sky-300 border-sky-500/40'
                        }`}>
                          {isPortrait ? '৯:১৬' : '১৬:৯'}
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                        <span className="px-2 py-0.5 rounded-full bg-black/85 border border-white/20 text-[9px] font-extrabold text-purple-300 backdrop-blur-md">
                          #{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title and Badges */}
                  <div className="mt-3 px-2 w-full">
                    <p className={`text-sm font-bold truncate transition-colors ${
                      isSelected ? 'text-purple-300 font-extrabold' : 'text-slate-200 group-hover:text-purple-300'
                    }`}>
                      {project.title}
                    </p>
                    <div className="mt-1 flex items-center justify-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-purple-950/60 text-purple-300 border border-purple-800/40">
                        {project.toolsUsed?.[0] || 'Premiere Pro'}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-sky-900/60 text-sky-300 border border-sky-700/60">
                          সক্রিয়
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Circular Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
          {filteredProjects.map((p, idx) => {
            const isSelected = selectedProject?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectProject(p, idx)}
                type="button"
                className={`transition-all duration-300 rounded-full ${
                  isSelected
                    ? 'w-8 h-2.5 bg-gradient-to-r from-purple-400 to-sky-400 shadow-md shadow-purple-400/40'
                    : 'w-2.5 h-2.5 bg-slate-800 hover:bg-slate-600 hover:scale-125'
                }`}
                title={`ভিডিও #${idx + 1}: ${p.title}`}
                aria-label={`Jump to circular video ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
