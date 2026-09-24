import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  MousePointer,
  ExternalLink,
  Eye,
  Sparkles,
  FolderOpen,
  Layers,
  ArrowRight,
  Palette,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
  FileText,
  Download
} from 'lucide-react';
import { Project } from '../types';

interface GraphicDesignCircularGalleryProps {
  projects: Project[];
  onOpenProjectModal: (project: Project) => void;
  onEditProject?: (project: Project) => void;
  onDeleteCustomProject?: (id: string) => void;
  onBackToAll?: () => void;
}

export const GraphicDesignCircularGallery: React.FC<GraphicDesignCircularGalleryProps> = ({
  projects,
  onOpenProjectModal,
  onEditProject,
  onDeleteCustomProject,
  onBackToAll
}) => {
  // Active selected project for the circular spotlight preview
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    return projects.length > 0 ? projects[0] : null;
  });

  // Track the current sliding index for the circular items
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Big enlarged view lightbox modal state (default to full uncropped image document)
  const [isBigViewOpen, setIsBigViewOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [lightboxMode, setLightboxMode] = useState<'image' | 'embed'>('image');

  // Auto-update selectedProject if list changes
  useEffect(() => {
    if (projects.length > 0 && (!selectedProject || !projects.find(p => p.id === selectedProject.id))) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  // Reset zoom when project changes
  useEffect(() => {
    setIsZoomed(false);
  }, [selectedProject?.id]);

  // Navigate one by one from left to right or right to left
  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const nextIdx = prev > 0 ? prev - 1 : projects.length - 1;
      setSelectedProject(projects[nextIdx]);
      return nextIdx;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIdx = prev < projects.length - 1 ? prev + 1 : 0;
      setSelectedProject(projects[nextIdx]);
      return nextIdx;
    });
  };

  // When clicking an individual circular item:
  // "ডিজানের উপর ক্লিক করলে ডান দিক থেকে বামে যায়, বাম দিক থেকে ডানে চলে যায়।"
  // "কিন্তু এমনভাবে করো যে ডিজাইনের উপর আবার ক্লিক করলে ভিউ করতে চাইলে ডিজাইনের উপর ক্লিক করলে সেটা বড় করে দেখাবে।"
  const handleSelectProject = (project: Project, index: number) => {
    if (selectedProject?.id === project.id && currentIndex === index) {
      // Clicked again on currently active project -> open big view!
      setIsBigViewOpen(true);
    } else {
      setSelectedProject(project);
      setCurrentIndex(index);
    }
  };

  // Calculate the shift distance for sliding one by one
  // Each card is ~220px + 24px gap = ~244px
  const itemWidth = 244;
  const trackOffset = -currentIndex * itemWidth;

  // Keyboard navigation support (Escape to close big view, Left/Right Arrow keys to slide)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsBigViewOpen(false);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projects.length]);

  return (
    <div className="w-full py-8 relative">
      {/* Top Banner & Corner Cursor Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Info: Folder Badge & Title */}
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide">
              <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>গ্রাফিক্স ডিজাইন ফোল্ডার</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
              মোট {projects.length} টি গোল প্রজেক্ট
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
            <span>Graphic Design Circular Showcase</span>
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse inline-block" />
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            সব গ্রাফিক্স ডিজাইন শুধুমাত্র এই ফোল্ডারের মধ্যে গোল আকারে সাজানো রয়েছে। ওপরের ডানদিকের কার্সার অ্যারোতে ক্লিক করে একটা একটা করে বাম দিক থেকে ডানে স্লাইড করুন এবং যেকোনো ডিজাইনে ক্লিক করে বড় গোল ভিউ দেখুন।
          </p>
        </div>

        {/* Right Corner Cursor Controls (এক কোণায় কার্সারে ক্লিক করার কন্ট্রোল) */}
        <div className="relative z-10 flex items-center gap-4 bg-slate-950/90 border-2 border-sky-500/40 p-3 rounded-2xl shadow-lg shadow-sky-500/10">
          {/* Cursor Indicator Label */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold">
            <MousePointer className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
            <span className="hidden sm:inline">কার্সার কন্ট্রোল:</span>
            <span>{String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          </div>

          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            id="circular-gallery-prev-btn"
            type="button"
            className="group p-3 rounded-xl bg-slate-800 hover:bg-sky-600 text-white border border-slate-700 hover:border-sky-400 shadow-md hover:shadow-sky-500/30 transition-all hover:scale-105 active:scale-95"
            title="পূর্ববর্তী ডিজাইন (বাম দিকে)"
            aria-label="Previous circular design"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Next Arrow Button (একটা একটা বাম দিক থেকে ডান দিকে আসবে) */}
          <button
            onClick={handleNext}
            id="circular-gallery-next-btn"
            type="button"
            className="group px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm border border-sky-400 shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            title="পরবর্তী ডিজাইন (ডান দিকে)"
            aria-label="Next circular design"
          >
            <span>পরবর্তী</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Circular Track Container with Left-to-Right Sliding Motion */}
      <div className="relative w-full overflow-hidden py-4 px-2">
        {/* Soft edge blur vignettes */}
        <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-6 cursor-grab active:cursor-grabbing"
          animate={{ x: trackOffset }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        >
          {projects.map((project, idx) => {
            const isSelected = selectedProject?.id === project.id;
            return (
              <div
                key={project.id}
                onClick={() => handleSelectProject(project, idx)}
                id={`circular-item-${project.id}`}
                className="shrink-0 flex flex-col items-center group select-none text-center"
                style={{ width: '220px' }}
              >
                {/* Circular Outer Disc ("একদম গোল আকারে") */}
                <div
                  className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 transition-all duration-500 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-tr from-sky-400 via-amber-400 to-blue-500 scale-108 shadow-[0_0_35px_rgba(56,189,248,0.5)] ring-4 ring-sky-400/40'
                      : 'bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-800 hover:bg-gradient-to-tr hover:from-amber-400 hover:via-sky-400 hover:to-indigo-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(251,191,36,0.35)]'
                  }`}
                >
                  {/* Orbit Ring Indicator for Active Item */}
                  {isSelected && (
                    <div className="absolute inset-[-8px] rounded-full border-2 border-dashed border-sky-400 animate-spin-slow pointer-events-none" />
                  )}

                  {/* Inner Circular Frame & Artwork Image */}
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative border-2 border-slate-900 shadow-inner">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = project.id === 'proj-behance-256189277' || project.tags?.includes('CV Design')
                          ? '/projects/behance/256189277_original_cover.jpg'
                          : '/projects/shoe-mockup.webp';
                      }}
                      className={`w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 select-none ${
                        project.id === 'proj-behance-256189277' || project.tags?.includes('CV Design')
                          ? 'object-top'
                          : 'object-center'
                      }`}
                    />

                    {/* Dark Vignette Overlay for Depth */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-950/70 via-transparent to-transparent group-hover:opacity-40 transition-opacity" />

                    {/* Center Circular Eye / Maximize Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full backdrop-blur-xs p-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-sky-400 text-slate-950 flex items-center justify-center shadow-lg transform scale-80 group-hover:scale-100 transition-transform">
                        <Maximize2 className="w-5 h-5 font-black" />
                      </div>
                      <span className="text-[10px] font-extrabold text-white mt-1">
                        {isSelected ? 'ক্লিক করে বড় দেখুন' : 'সিলেক্ট করুন'}
                      </span>
                    </div>

                    {/* Circular Item Badge */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-extrabold backdrop-blur-md ${
                        project.id === 'proj-behance-256189277' || project.tags?.includes('CV Design')
                          ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md'
                          : 'bg-black/80 border-white/20 text-sky-300'
                      }`}>
                        {project.id === 'proj-behance-256189277' || project.tags?.includes('CV Design') ? '📄 প্রফেশনাল সিভি' : `#${idx + 1}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title and Badge below the Circle */}
                <div className="mt-4 px-2 w-full">
                  <p className={`text-sm font-bold truncate transition-colors ${
                    isSelected ? 'text-sky-300 font-extrabold' : 'text-slate-200 group-hover:text-amber-300'
                  }`}>
                    {project.title}
                  </p>
                  <div className="mt-1 flex items-center justify-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-amber-950/60 text-amber-300 border border-amber-800/40">
                      {project.toolsUsed?.[0] || 'Photoshop'}
                    </span>
                    {isSelected && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-sky-900/60 text-sky-300 border border-sky-700/60">
                        সক্রিয় (ক্লিক করে বড় দেখুন)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Circular Navigation Dots */}
      <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
        {projects.map((p, idx) => {
          const isSelected = selectedProject?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelectProject(p, idx)}
              type="button"
              className={`transition-all duration-300 rounded-full ${
                isSelected
                  ? 'w-8 h-2.5 bg-gradient-to-r from-amber-400 to-sky-400 shadow-md shadow-amber-400/40'
                  : 'w-2.5 h-2.5 bg-slate-800 hover:bg-slate-600 hover:scale-125'
              }`}
              title={`ডিজাইন #${idx + 1}: ${p.title}`}
              aria-label={`Jump to circular design ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* Interactive Circular Spotlight Stage ("যখন একটা ক্লিক করবে, একদিক থেকে আসবে একটা ক্লিক করলে গোল আকারে আসবে") */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-sky-500/30 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Gradient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Big Circular Spotlight Frame or Full CV Portrait Document */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                {(selectedProject.id === 'proj-behance-256189277' || selectedProject.tags?.includes('CV Design')) ? (
                  // Dedicated Full A4 Document Spotlight Preview for CV
                  <motion.div
                    initial={{ rotate: -2, scale: 0.9 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                    className="relative w-64 sm:w-72 md:w-80 aspect-[210/297] rounded-3xl p-2.5 bg-gradient-to-tr from-amber-400 via-sky-400 to-amber-300 shadow-[0_0_50px_rgba(245,158,11,0.35)] group cursor-pointer"
                    onClick={() => {
                      setLightboxMode('image');
                      setIsBigViewOpen(true);
                    }}
                    title="ক্লিক করে সম্পূর্ণ সিভি বড় স্ক্রিনে পড়ুন"
                  >
                    {/* Rotating Orbit Outer Ring */}
                    <div className="absolute inset-[-8px] rounded-3xl border-2 border-dashed border-amber-400/60 animate-spin-slow pointer-events-none" />

                    {/* Inner Full Document Container */}
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-950 relative border-2 border-slate-900 shadow-2xl flex items-center justify-center">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/projects/behance/256189277_original_cover.jpg';
                        }}
                        className="w-full h-full object-contain group-hover:scale-103 transition-transform duration-500"
                      />

                      {/* Interactive Zoom Prompt Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-2xl backdrop-blur-xs">
                        <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                          <Maximize2 className="w-4 h-4 text-slate-950" />
                          <span>📄 সম্পূর্ণ সিভি বড় করে পড়ুন</span>
                        </div>
                      </div>
                    </div>

                    {/* Top CV Document Tag */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black shadow-lg border border-amber-300 flex items-center gap-1.5 whitespace-nowrap">
                      <FileText className="w-3.5 h-3.5 text-slate-950" />
                      <span>সম্পূর্ণ ১-পৃষ্ঠা এ৪ সিভি (ফুল ডকুমেন্ট)</span>
                    </div>
                  </motion.div>
                ) : (
                  // Standard Circular Spotlight Frame for Other Graphic Designs
                  <motion.div
                    initial={{ rotate: -10, scale: 0.85 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                    className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 rounded-full p-2 bg-gradient-to-tr from-sky-400 via-purple-500 to-amber-400 shadow-[0_0_50px_rgba(56,189,248,0.4)] group cursor-pointer"
                    onClick={() => setIsBigViewOpen(true)}
                    title="ক্লিক করে বড় স্ক্রিনে সম্পূর্ণ ডিজাইন দেখুন"
                  >
                    {/* Rotating Orbit Outer Ring */}
                    <div className="absolute inset-[-10px] rounded-full border-2 border-dashed border-sky-400/60 animate-spin-slow pointer-events-none" />

                    {/* Inner Big Circular Image */}
                    <div className="w-full h-full rounded-full overflow-hidden bg-black relative border-4 border-slate-950 shadow-2xl">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/projects/shoe-mockup.webp';
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* High-tech Circular Lens Glow overlay */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500/20 via-transparent to-amber-500/20 pointer-events-none" />

                      {/* Interactive Zoom Prompt Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full backdrop-blur-xs">
                        <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                          <Maximize2 className="w-4 h-4 text-slate-950" />
                          <span>বড় করে দেখুন</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Subtitle / Hint under Spotlight */}
                <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5 cursor-pointer hover:text-amber-300 transition-colors" onClick={() => setIsBigViewOpen(true)}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>হাই-রেজোলিউশনে সম্পূর্ণ পড়তে ছবির উপর ক্লিক করুন</span>
                </p>
              </div>

              {/* Right Column: Project Details & Action Buttons (একদিক থেকে মসৃণভাবে আসে) */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="lg:col-span-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                      {selectedProject.categoryLabel || 'Graphic Design'}
                    </span>
                    {selectedProject.metrics && (
                      <span className="px-3 py-1 rounded-xl bg-sky-950/60 border border-sky-800/60 text-sky-300 text-xs font-semibold">
                        {selectedProject.metrics}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold ml-auto">
                      ডিজাইন #{currentIndex + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Tools & Tags */}
                  <div className="mt-5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      ব্যবহৃত সফটওয়্যার ও টুলস:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProject.toolsUsed && selectedProject.toolsUsed.length > 0
                        ? selectedProject.toolsUsed
                        : selectedProject.tags
                      ).map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-bold rounded-xl bg-slate-800 text-sky-300 border border-slate-700 flex items-center gap-1.5"
                        >
                          <Palette className="w-3 h-3 text-amber-400" />
                          <span>{tool}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3">
                  {/* Dedicated Full CV View Button if project is CV */}
                  {(selectedProject.id === 'proj-behance-256189277' || selectedProject.tags?.includes('CV Design')) ? (
                    <button
                      onClick={() => onOpenProjectModal(selectedProject)}
                      type="button"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>📄 সম্পূর্ণ সিভি ভিউয়ার খুলুন</span>
                    </button>
                  ) : null}

                  {/* Primary Big View Button */}
                  <button
                    onClick={() => setIsBigViewOpen(true)}
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4 text-slate-950" />
                    <span>বড় করে সম্পূর্ণ ডিজাইন দেখুন</span>
                  </button>

                  {/* Primary Behance Live Link Button */}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-extrabold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-md transition-all hover:scale-102 active:scale-98"
                    >
                      <span>View on Behance</span>
                      <ExternalLink className="w-4 h-4 text-sky-400" />
                    </a>
                  )}

                  {/* Quick Next Design Button */}
                  <button
                    onClick={handleNext}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold text-sky-400 hover:text-sky-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 transition-colors ml-auto"
                  >
                    <span>পরবর্তী গোল ডিজাইন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Big Lightbox Modal ("ডিজাইনের উপর আবার ক্লিক করলে সেটা বড় করে দেখাবে") */}
      <AnimatePresence>
        {isBigViewOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto"
            onClick={() => setIsBigViewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="relative w-full max-w-5xl bg-slate-950 border-2 border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[94vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Control Bar */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md z-20">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-extrabold text-xs">
                    {selectedProject.categoryLabel || 'Graphic Design'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-300">
                    ডিজাইন {currentIndex + 1} / {projects.length}
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-white truncate max-w-xs sm:max-w-md hidden md:inline">
                    {selectedProject.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mode switch for Behance CV */}
                  {(selectedProject.id === 'proj-behance-256189277' || selectedProject.tags?.includes('CV Design')) && (
                    <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700 mr-1">
                      <button
                        type="button"
                        onClick={() => setLightboxMode('image')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                          lightboxMode === 'image'
                            ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>সম্পূর্ণ সিভি</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLightboxMode('embed')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          lightboxMode === 'embed'
                            ? 'bg-sky-500 text-white shadow-sm'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        Behance উইজেট
                      </button>
                    </div>
                  )}

                  {/* Download button for CV */}
                  {(selectedProject.id === 'proj-behance-256189277' || selectedProject.tags?.includes('CV Design')) && (
                    <a
                      href={selectedProject.image}
                      download="Hasanullah_Professional_CV_Resume.jpg"
                      className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-800/60 transition-colors flex items-center gap-1.5 text-xs font-bold"
                      title="আসল হাই-রেজুলিউশন সিভি ডাউনলোড করুন"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">ডাউনলোড</span>
                    </a>
                  )}

                  {/* Zoom Toggle */}
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    type="button"
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
                    title={isZoomed ? "আসল সাইজে ফিরুন (1x)" : "জুম ইন করুন (Zoom 1.5x)"}
                  >
                    {isZoomed ? <ZoomOut className="w-4 h-4 text-amber-400" /> : <ZoomIn className="w-4 h-4 text-sky-400" />}
                    <span className="hidden sm:inline">{isZoomed ? 'আসল সাইজ' : 'জুম করুন'}</span>
                  </button>

                  {/* External Behance Link */}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 sm:px-3 sm:py-2 rounded-xl bg-sky-600/30 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold"
                      title="Behance-এ আসল প্রোজেক্ট দেখুন"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">Behance</span>
                    </a>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={() => setIsBigViewOpen(false)}
                    type="button"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                    title="বন্ধ করুন (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Center: Big High-Res Artwork View with Navigation Arrows */}
              <div className="relative flex-1 bg-black/90 flex items-center justify-center p-3 sm:p-6 min-h-[350px] sm:min-h-[500px] overflow-auto select-none">
                {/* Previous Arrow in Big View */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  type="button"
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-2xl bg-black/80 hover:bg-sky-600 text-white border border-white/20 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  title="আগের ডিজাইন (বাম দিকে)"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>

                {/* Next Arrow in Big View */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  type="button"
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-2xl bg-black/80 hover:bg-sky-600 text-white border border-white/20 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  title="পরের ডিজাইন (ডান দিকে)"
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>

                {/* Big Artwork Image or Behance Embed Reader */}
                {(selectedProject.id === 'proj-behance-256189277' || selectedProject.videoUrl?.includes('behance.net')) && lightboxMode === 'embed' ? (
                  <div className="w-full max-w-4xl h-[72vh] min-h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-800">
                    <iframe
                      src={selectedProject.videoUrl || "https://www.behance.net/embed/project/256189277?ilo0=1"}
                      title={selectedProject.title}
                      allow="clipboard-write; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full border-0 block"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-start max-w-full max-h-[72vh] overflow-y-auto overflow-x-auto p-2">
                    {(selectedProject.id === 'proj-behance-256189277' || selectedProject.tags?.includes('CV Design')) && (
                      <div className="text-[11px] text-amber-300 font-semibold mb-2">
                        ✦ হাসানুল্লাহর নিজস্ব প্রফেশনাল ১-পৃষ্ঠা এ৪ সিভি • স্ক্রোল ও জুম করে সম্পূর্ণটা পড়ুন
                      </div>
                    )}
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = (selectedProject.id === 'proj-behance-256189277' || selectedProject.tags?.includes('CV Design'))
                          ? '/projects/behance/256189277_original_cover.jpg'
                          : '/projects/shoe-mockup.webp';
                      }}
                      className={`object-contain rounded-2xl shadow-2xl transition-all duration-300 select-none ${
                        isZoomed
                          ? 'w-full max-w-4xl h-auto cursor-zoom-out'
                          : 'max-h-[66vh] w-auto cursor-zoom-in'
                      }`}
                      onClick={() => setIsZoomed(!isZoomed)}
                      title="ক্লিক করে জুম ইন/আউট করুন"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Details Footer */}
              <div className="p-5 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                    {selectedProject.description}
                  </p>
                  {/* Tools */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {(selectedProject.toolsUsed || selectedProject.tags || []).map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 text-xs font-semibold rounded-lg bg-slate-800 text-amber-300 border border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <span>Behance-এ দেখুন</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setIsBigViewOpen(false)}
                    type="button"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold border border-slate-700 transition-colors cursor-pointer"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
