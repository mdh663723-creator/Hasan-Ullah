import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Link as LinkIcon, Image, Tag, FileText, Sparkles, Video, Palette, Check, Edit3, Upload, CheckCircle2 } from 'lucide-react';
import { Project, ProjectCategory } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProject: (project: Project) => void;
  initialProject?: Project | null;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onSaveProject,
  initialProject
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('graphic');
  const [description, setDescription] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [image, setImage] = useState('');
  const [toolsInput, setToolsInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [metrics, setMetrics] = useState('');
  const [detectedBehance, setDetectedBehance] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialProject) {
      setTitle(initialProject.title || '');
      setCategory(initialProject.category || 'graphic');
      setDescription(initialProject.description || '');
      setLiveUrl(initialProject.liveUrl || '');
      setVideoUrl(initialProject.videoUrl || '');
      setImage(initialProject.image || '');
      setToolsInput(initialProject.toolsUsed ? initialProject.toolsUsed.join(', ') : '');
      setTagsInput(initialProject.tags ? initialProject.tags.join(', ') : '');
      setMetrics(initialProject.metrics || '');
      setDetectedBehance(Boolean(initialProject.image?.includes('shoe-mockup') || initialProject.liveUrl?.includes('255584833')));
    } else {
      setTitle('');
      setCategory('graphic');
      setDescription('');
      setLiveUrl('');
      setVideoUrl('');
      setImage('');
      setToolsInput('');
      setTagsInput('');
      setMetrics('');
      setDetectedBehance(false);
    }
  }, [initialProject, isOpen]);

  // Intelligent parser for URLs, iframe embed codes, and Behance links
  const handleImageOrEmbedInput = (val: string) => {
    let clean = val.trim();

    // If user pasted an iframe tag
    if (clean.includes('<iframe')) {
      const srcMatch = clean.match(/src=["']([^"']+)["']/i);
      if (srcMatch && srcMatch[1]) {
        clean = srcMatch[1];
      }
    }

    // Check if Behance 255795753 (Creative Graphic Design Showcase)
    if (clean.includes('255795753')) {
      setImage('/projects/graphic-design-showcase.jpg');
      setDetectedBehance(true);
      if (!title || title.trim() === '') {
        setTitle('Creative Visual Identity & Graphic Design Showcase');
      }
      setCategory('graphic');
      if (!liveUrl) {
        setLiveUrl('https://www.behance.net/gallery/255795753');
      }
      if (!videoUrl) {
        setVideoUrl('https://www.behance.net/embed/project/255795753?ilo0=1');
      }
      if (!toolsInput) {
        setToolsInput('Photoshop, Illustrator');
      }
      if (!tagsInput) {
        setTagsInput('Brand Identity, Visual Design, Adobe Illustrator, Adobe Photoshop, Behance Showcase');
      }
      if (!metrics) {
        setMetrics('Featured on Behance • Visual Identity');
      }
      return;
    }

    // Check if Behance 255584833 (Hasan's Shoe Mockup Design)
    if (clean.includes('255584833') || clean.toLowerCase().includes('shoz') || clean.toLowerCase().includes('shoe')) {
      setImage('/projects/shoe-mockup.webp');
      setDetectedBehance(true);
      if (!title || title.trim() === '') {
        setTitle('Premier Shoes Advertisement & Mockup Design');
      }
      setCategory('graphic');
      if (!liveUrl) {
        setLiveUrl('https://www.behance.net/gallery/255584833/Shoz-Muckup-Design');
      }
      if (!videoUrl) {
        setVideoUrl('https://www.behance.net/embed/project/255584833?ilo0=1');
      }
      if (!toolsInput) {
        setToolsInput('Photoshop, Illustrator');
      }
      if (!tagsInput) {
        setTagsInput('Shoe Mockup, Product Advertisement, Commercial Graphic, Photoshop');
      }
      if (!metrics) {
        setMetrics('Commercial Ad • Photorealistic Mockup');
      }
      return;
    }

    // General Behance URL handling
    if (clean.includes('behance.net/embed/project/')) {
      setVideoUrl(clean);
      const match = clean.match(/project\/(\d+)/);
      if (match) {
        if (!liveUrl) setLiveUrl(`https://www.behance.net/gallery/${match[1]}/Design`);
      }
      // If we already have shoe-mockup or image keep it, otherwise set image to clean if image URL
      if (!image) setImage(clean);
      return;
    }

    setImage(clean);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      if (typeof loadEvt.target?.result === 'string') {
        setImage(loadEvt.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  const categoryLabels: Record<ProjectCategory, string> = {
    all: 'Creative Work',
    graphic: 'Graphic Design',
    video: 'Video Editing',
    'ai-automation': 'AI Automation',
    web: 'Web & Digital'
  };

  const sampleImages: Record<ProjectCategory, string> = {
    all: '/projects/shoe-mockup.webp',
    graphic: '/projects/shoe-mockup.webp',
    video: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
    'ai-automation': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
    web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !liveUrl.trim()) return;

    let finalImage = image.trim();
    if (finalImage.includes('<iframe')) {
      const match = finalImage.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) {
        finalImage = match[1];
      }
    }
    if (finalImage.includes('255584833') || finalImage.includes('embed/project')) {
      finalImage = '/projects/shoe-mockup.webp';
    }
    if (!finalImage) {
      finalImage = sampleImages[category];
    }

    const tagsArray = tagsInput
      ? tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : category === 'video'
      ? ['Premiere Pro', 'Video Editing']
      : ['Photoshop', 'Graphic Design'];

    const toolsArray = toolsInput
      ? toolsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : category === 'video'
      ? ['Adobe Premiere Pro', 'CapCut']
      : ['Adobe Photoshop', 'Adobe Illustrator'];

    const targetCategory = category === 'all' ? 'graphic' : category;

    const savedProj: Project = {
      id: initialProject ? initialProject.id : `custom-${Date.now()}`,
      title: title.trim(),
      category: targetCategory,
      categoryLabel: categoryLabels[targetCategory],
      description: description.trim() || 'Professional graphic design and video editing portfolio project.',
      image: finalImage,
      videoUrl: videoUrl.trim() || undefined,
      tags: tagsArray,
      toolsUsed: toolsArray,
      liveUrl: liveUrl.trim().startsWith('http') ? liveUrl.trim() : `https://${liveUrl.trim()}`,
      featured: initialProject ? initialProject.featured : true,
      metrics: metrics.trim() || (category === 'video' ? 'Full HD/4K Rendered' : 'High-Res Vector / Export')
    };

    onSaveProject(savedProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/65 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-sky-150 p-6 sm:p-8 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-sky-100">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {initialProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Add or update graphic design, video editing, or AI automation projects
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Project Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Minimalist Brand Logo & Social Banners or Viral Reels Edit"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-slate-800"
            />
          </div>

          {/* Category & Live Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-slate-800 font-semibold"
              >
                <option value="graphic">🎨 Graphic Design</option>
                <option value="video">🎬 Video Editing</option>
                <option value="ai-automation">🤖 AI Automation</option>
                <option value="web">🌐 Web & Digital</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Live Link / Behance / YouTube *
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-sky-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={liveUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    setLiveUrl(val);
                    if (val.includes('behance.net') || val.includes('<iframe') || val.includes('255584833')) {
                      handleImageOrEmbedInput(val);
                    }
                  }}
                  placeholder="https://behance.net/gallery/... or YouTube link"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Video / Embed URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Interactive Embed / Video URL (Behance, YouTube, Vimeo, MP4)
            </label>
            <div className="relative">
              <Video className="w-4 h-4 text-purple-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => handleImageOrEmbedInput(e.target.value)}
                placeholder="https://www.behance.net/embed/project/... or YouTube embed / iframe"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-slate-800"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Accepts Behance embed iframes, project links, or YouTube videos for interactive playback.
            </p>
          </div>

          {/* Cover Image / Poster URL with File Upload & Live Preview */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Design Photo / Cover Image *
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded-lg border border-sky-200 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload From Device</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="relative">
              <Image className="w-4 h-4 text-sky-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageOrEmbedInput(e.target.value)}
                placeholder="Paste image URL, Behance iframe embed code, or click Upload above"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-slate-800"
              />
            </div>

            {/* Behance Recognized Alert */}
            {detectedBehance && (
              <div className="mt-2.5 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Behance project detected: High-res shoe advertisement design photo linked!</span>
              </div>
            )}

            {/* Image Preview Box */}
            {image && (
              <div className="mt-2.5 p-3 rounded-2xl bg-sky-50/80 border border-sky-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={image}
                    alt="Design Preview"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/projects/shoe-mockup.webp';
                    }}
                    className="w-16 h-12 rounded-lg object-cover border border-sky-300 shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-sky-950 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Design Photo Active
                    </span>
                    <p className="text-[11px] text-slate-500 truncate max-w-[220px] sm:max-w-xs">
                      {image.startsWith('data:') ? 'Custom uploaded device image' : image}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setImage('');
                    setDetectedBehance(false);
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-white transition-colors shrink-0"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Tools Used & Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Tools Used
              </label>
              <input
                type="text"
                value={toolsInput}
                onChange={(e) => setToolsInput(e.target.value)}
                placeholder="Photoshop, Premiere Pro, Illustrator"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Highlights / Metric
              </label>
              <input
                type="text"
                value={metrics}
                onChange={(e) => setMetrics(e.target.value)}
                placeholder="e.g. 14% CTR Boost • 4K 60FPS"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-slate-800"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Project Overview
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the design goals, target audience, and results..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-slate-800 resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-sky-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="save-project-submit-btn"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/30 transition-all hover:scale-102 active:scale-98"
            >
              <Check className="w-4 h-4" />
              <span>{initialProject ? 'Save Changes' : 'Add Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
