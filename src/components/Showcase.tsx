import React, { useState, useMemo } from 'react';
import {
  ExternalLink,
  Plus,
  Search,
  Filter,
  Layers,
  Trash2,
  ArrowUpRight,
  Play,
  Edit3,
  Film,
  Palette,
  RefreshCw,
  Eye,
  Bot,
  FileText
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { GraphicDesignCircularGallery } from './GraphicDesignCircularGallery';
import { VideoEditingCircularGallery } from './VideoEditingCircularGallery';

interface ShowcaseProps {
  projects: Project[];
  onOpenProjectModal: (project: Project) => void;
  onOpenAddProjectModal: () => void;
  onEditProject?: (project: Project) => void;
  onDeleteCustomProject?: (id: string) => void;
  onResetProjects?: () => void;
}

export const Showcase: React.FC<ShowcaseProps> = ({
  projects,
  onOpenProjectModal,
  onOpenAddProjectModal,
  onEditProject,
  onDeleteCustomProject,
  onResetProjects
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ProjectCategory; label: string; icon: string; color: string }[] = [
    { id: 'all', label: 'All Projects', icon: '✨', color: 'from-sky-500 to-blue-600' },
    { id: 'video', label: 'Video Editing', icon: '🎬', color: 'from-purple-500 to-pink-600' },
    { id: 'graphic', label: 'Graphic Design', icon: '🎨', color: 'from-amber-500 to-orange-600' },
    { id: 'ai-automation', label: 'AI Automation', icon: '🤖', color: 'from-emerald-500 to-teal-600' },
    { id: 'web', label: 'Web & Digital', icon: '🌐', color: 'from-blue-500 to-indigo-600' }
  ];

  // Video editing projects
  const videoProjects = useMemo(() => {
    return projects.filter((p) => p.category === 'video');
  }, [projects]);

  // Graphic design projects
  const graphicProjects = useMemo(() => {
    return projects.filter((p) => p.category === 'graphic');
  }, [projects]);

  // Other projects (AI Automation, Web, etc.)
  const otherProjects = useMemo(() => {
    return projects.filter((p) => p.category !== 'video' && p.category !== 'graphic');
  }, [projects]);

  // Filtered video projects for search
  const filteredVideoProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return videoProjects;
    return videoProjects.filter((project) => {
      const titleMatch = project.title.toLowerCase().includes(q);
      const descMatch = project.description.toLowerCase().includes(q);
      const tagMatch = project.tags.some((tag) => tag.toLowerCase().includes(q));
      const toolMatch = project.toolsUsed?.some((tool) => tool.toLowerCase().includes(q));
      return titleMatch || descMatch || tagMatch || toolMatch;
    });
  }, [videoProjects, searchQuery]);

  // Filtered graphic design projects for search
  const filteredGraphicProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return graphicProjects;
    return graphicProjects.filter((project) => {
      const titleMatch = project.title.toLowerCase().includes(q);
      const descMatch = project.description.toLowerCase().includes(q);
      const tagMatch = project.tags.some((tag) => tag.toLowerCase().includes(q));
      const toolMatch = project.toolsUsed?.some((tool) => tool.toLowerCase().includes(q));
      return titleMatch || descMatch || tagMatch || toolMatch;
    });
  }, [graphicProjects, searchQuery]);

  // Search filtered projects across all or single category
  const searchedProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const sourceList =
      selectedCategory === 'all'
        ? projects
        : projects.filter((p) => p.category === selectedCategory);

    if (!q) return sourceList;

    return sourceList.filter((project) => {
      const titleMatch = project.title.toLowerCase().includes(q);
      const descMatch = project.description.toLowerCase().includes(q);
      const tagMatch = project.tags.some((tag) => tag.toLowerCase().includes(q));
      const toolMatch = project.toolsUsed?.some((tool) => tool.toLowerCase().includes(q));
      return titleMatch || descMatch || tagMatch || toolMatch;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Project Card Renderer
  const renderProjectCard = (project: Project) => {
    return (
      <div
        key={project.id}
        id={`project-card-${project.id}`}
        className="group flex flex-col bg-slate-950 rounded-3xl overflow-hidden border-2 border-slate-800/90 shadow-md hover:shadow-2xl hover:shadow-sky-500/20 hover:border-sky-500/60 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
        onClick={() => onOpenProjectModal(project)}
      >
        {/* Image Banner & Overlays */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = (project.id === 'proj-behance-256189277' || project.tags?.includes('CV Design'))
                ? '/projects/behance/256189277_original_cover.jpg'
                : '/projects/shoe-mockup.webp';
            }}
            className={`w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out ${
              (project.id === 'proj-behance-256189277' || project.tags?.includes('CV Design'))
                ? 'object-top'
                : 'object-center'
            }`}
          />

          {/* Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md bg-slate-950/80 text-sky-300 border border-white/10 shadow-sm flex items-center gap-1.5">
              {project.category === 'video' ? <Film className="w-3 h-3 text-purple-400" /> : <Palette className="w-3 h-3 text-amber-400" />}
              <span>{project.categoryLabel}</span>
            </span>

            <div className="flex items-center gap-1.5 pointer-events-auto">
              {project.isCustom && onDeleteCustomProject && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete project "${project.title}"?`)) {
                      onDeleteCustomProject(project.id);
                    }
                  }}
                  className="p-1.5 rounded-full bg-red-950/80 hover:bg-red-600 text-red-200 transition-colors backdrop-blur-md shadow-sm border border-red-800/50"
                  title="Delete project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              {project.aspectRatio && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-xs ${
                  project.id === 'proj-behance-256189277' || project.tags?.includes('CV Design')
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-extrabold shadow-sm'
                    : 'bg-black/70 text-slate-300 border-white/10'
                }`}>
                  {project.id === 'proj-behance-256189277' || project.tags?.includes('CV Design')
                    ? '📄 প্রফেশনাল সিভি'
                    : project.aspectRatio === 'portrait'
                    ? '9:16 Reel'
                    : '16:9'}
                </span>
              )}
            </div>
          </div>

          {/* Play Button Overlay for Videos */}
          {project.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
              <div className="w-13 h-13 rounded-full bg-gradient-to-r from-purple-500 via-indigo-600 to-pink-600 flex items-center justify-center text-white shadow-xl transform scale-80 group-hover:scale-100 transition-all">
                <Play className="w-6 h-6 fill-white text-white ml-0.5" />
              </div>
            </div>
          )}

          {/* Bottom Image Metrics overlay */}
          {project.metrics && (
            <div className="absolute bottom-2.5 left-3.5 right-3.5 text-[11px] font-medium text-slate-300 truncate flex items-center gap-1.5 opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
              <span>{project.metrics}</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-1">
              {project.title}
            </h3>

            <p className="mt-1.5 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {(project.toolsUsed && project.toolsUsed.length > 0 ? project.toolsUsed : project.tags).slice(0, 3).map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[11px] font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-md group-hover:border-slate-700 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link Buttons */}
          <div
            className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            {project.id === 'proj-behance-256189277' || project.tags?.includes('CV Design') ? (
              <button
                type="button"
                onClick={() => onOpenProjectModal(project)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-md shadow-amber-500/20 transition-all hover:scale-101 active:scale-98 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-950" />
                <span>সম্পূর্ণ সিভি পড়ুন</span>
              </button>
            ) : (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`project-live-btn-${project.id}`}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:scale-101 active:scale-98 ${
                  project.category === 'video'
                    ? 'bg-gradient-to-r from-purple-500 via-indigo-600 to-pink-600 hover:from-purple-600 hover:to-indigo-700'
                    : 'bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700'
                }`}
              >
                {project.category === 'video' ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Watch Video</span>
                  </>
                ) : (
                  <>
                    <span>View Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </a>
            )}

            {onEditProject && (
              <button
                onClick={() => onEditProject(project)}
                type="button"
                className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-300 hover:text-sky-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all hover:scale-105"
                title="Edit Project"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onOpenProjectModal(project)}
              id={`project-details-btn-${project.id}`}
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-300 hover:text-sky-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all hover:scale-105"
              title="Quick Preview Details"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="showcase" className="py-20 sm:py-24 bg-gradient-to-b from-transparent via-slate-950/60 to-transparent relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
      <div
        className="pointer-events-none absolute top-32 right-6 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-20 left-6 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Creative Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Video Editing &{' '}
              <span className="bg-gradient-to-r from-purple-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">
                Graphic Design Works
              </span>
            </h2>
            <p className="text-slate-400 mt-2.5 max-w-xl text-sm sm:text-base leading-relaxed">
              Explore branding, thumbnails, motion graphics, and video editing works.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {onResetProjects && (
              <button
                onClick={() => {
                  if (confirm('Restore all default showcase projects?')) {
                    onResetProjects();
                  }
                }}
                type="button"
                id="showcase-reset-btn"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-sky-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 shadow-sm transition-all"
                title="Reset to default showcase projects"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Projects</span>
              </button>
            )}

            <button
              onClick={onOpenAddProjectModal}
              id="showcase-add-work-btn"
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/35 transition-all hover:scale-102 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? projects.length
                  : cat.id === 'video'
                  ? videoProjects.length
                  : cat.id === 'graphic'
                  ? graphicProjects.length
                  : projects.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  id={`filter-category-${cat.id}`}
                  type="button"
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-md shadow-sky-500/25 scale-102`
                      : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`ml-1 text-[11px] px-1.5 py-0.5 rounded-full font-extrabold ${
                    active ? 'bg-white/25 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] sm:w-80">
            <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or tool..."
              id="showcase-search-input"
              className="w-full pl-9 pr-8 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 shadow-inner transition-all text-slate-100 placeholder-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* View Mode: Video Circular Showcase OR Graphic Circular Showcase OR All Projects */}
        {selectedCategory === 'video' ? (
          filteredVideoProjects.length === 0 ? (
            <div className="py-20 text-center bg-slate-900/60 rounded-3xl border-2 border-dashed border-slate-800 shadow-md">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-purple-400">
                <Filter className="w-7 h-7" />
              </div>
              <p className="text-lg font-bold text-white">
                কোনো ভিডিও প্রজেক্ট পাওয়া যায়নি
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-5 px-5 py-2 text-xs font-bold text-sky-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
              >
                সার্চ রিসেট করুন
              </button>
            </div>
          ) : (
            <VideoEditingCircularGallery
              projects={filteredVideoProjects}
              onOpenProjectModal={onOpenProjectModal}
              onEditProject={onEditProject}
              onDeleteCustomProject={onDeleteCustomProject}
              onBackToAll={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            />
          )
        ) : selectedCategory === 'graphic' ? (
          filteredGraphicProjects.length === 0 ? (
            <div className="py-20 text-center bg-slate-900/60 rounded-3xl border-2 border-dashed border-slate-800 shadow-md">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
                <Filter className="w-7 h-7" />
              </div>
              <p className="text-lg font-bold text-white">
                কোনো গ্রাফিক্স ডিজাইন পাওয়া যায়নি
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-5 px-5 py-2 text-xs font-bold text-sky-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
              >
                সার্চ রিসেট করুন
              </button>
            </div>
          ) : (
            <GraphicDesignCircularGallery
              projects={filteredGraphicProjects}
              onOpenProjectModal={onOpenProjectModal}
              onEditProject={onEditProject}
              onDeleteCustomProject={onDeleteCustomProject}
              onBackToAll={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            />
          )
        ) : (
          /* "All Projects" or Other Categories */
          <div>
            {/* If user is actively searching, display search results */}
            {searchQuery ? (
              searchedProjects.length === 0 ? (
                <div className="py-20 text-center bg-slate-900/60 rounded-3xl border-2 border-dashed border-slate-800 shadow-md">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
                    <Filter className="w-7 h-7" />
                  </div>
                  <p className="text-lg font-bold text-white">
                    No matching projects found
                  </p>
                  <p className="text-sm text-slate-400 mt-1.5 max-w-sm mx-auto">
                    Try adjusting your search criteria or switch categories.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-5 px-5 py-2 text-xs font-bold text-sky-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchedProjects.map(renderProjectCard)}
                </div>
              )
            ) : selectedCategory === 'all' ? (
              /* All Projects: Both Video & Graphic design clearly and beautifully presented */
              <div>
                {/* Quick Access Circular Portals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  <div
                    onClick={() => setSelectedCategory('video')}
                    className="group relative overflow-hidden p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-800/60 hover:border-purple-500 shadow-lg hover:shadow-purple-500/20 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/40 group-hover:scale-110 transition-transform">
                          <Film className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-800">
                              Circular Gallery
                            </span>
                            <span className="text-xs text-slate-400">{videoProjects.length} টি ভিডিও</span>
                          </div>
                          <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors mt-0.5">
                            ভিডিও এডিটিং ও মোশন শোকেস
                          </h4>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <span>গোল আকারে দেখুন</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedCategory('graphic')}
                    className="group relative overflow-hidden p-5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-orange-950/70 border border-amber-800/60 hover:border-amber-500 shadow-lg hover:shadow-amber-500/20 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/40 group-hover:scale-110 transition-transform">
                          <Palette className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800">
                              Circular Gallery
                            </span>
                            <span className="text-xs text-slate-400">{graphicProjects.length} টি ডিজাইন</span>
                          </div>
                          <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mt-0.5">
                            গ্রাফিক্স ডিজাইন শোকেস
                          </h4>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <span>গোল আকারে দেখুন</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* SECTION 1: Featured Video Editing & Motion Graphics Works */}
                <div className="mb-16">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-md">
                        <Film className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                            ভিডিও এডিটিং ও মোশন গ্রাফিক্স কাজসমূহ
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-950 text-purple-300 border border-purple-800">
                            {videoProjects.length} টি প্রজেক্ট
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400">
                          মোশন গ্রাফিক্স শো-রিল, ৩ডি অ্যানিমেশন, ভিএফএক্স লাইট গ্লো এবং ভাইরাল রিলস
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCategory('video')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-purple-300 hover:text-white bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 transition-colors self-start sm:self-auto"
                    >
                      <span>সব ভিডিও গোল আকারে দেখুন</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videoProjects.map(renderProjectCard)}
                  </div>
                </div>

                {/* SECTION 2: Featured Graphic Design & Branding Works */}
                <div className="mb-16">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
                        <Palette className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                            গ্রাফিক্স ডিজাইন ও ব্র্যান্ডিং কাজসমূহ
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
                            {graphicProjects.length} টি প্রজেক্ট
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400">
                          ইউটিউব থাম্বনেইল, সোশ্যাল মিডিয়া এড ডিজাইন, ব্র্যান্ডিং, ব্রোশার ও টি-শার্ট আর্ট
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCategory('graphic')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-amber-300 hover:text-white bg-amber-950/60 hover:bg-amber-900/60 border border-amber-800/60 transition-colors self-start sm:self-auto"
                    >
                      <span>সব গ্রাফিক্স গোল আকারে দেখুন</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {graphicProjects.map(renderProjectCard)}
                  </div>
                </div>

                {/* SECTION 3: Other Projects (AI Automation & Digital) if any */}
                {otherProjects.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-800/80">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                          এআই অটোমেশন ও ডিজিটাল প্রজেক্ট
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400">
                          স্মার্ট অটোমেশন ওয়ার্কফ্লো এবং ডিজিটাল প্রোডাক্টস
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {otherProjects.map(renderProjectCard)}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Specific other categories (e.g. AI Automation, Web) */
              searchedProjects.length === 0 ? (
                <div className="py-20 text-center bg-slate-900/60 rounded-3xl border-2 border-dashed border-slate-800 shadow-md">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
                    <Filter className="w-7 h-7" />
                  </div>
                  <p className="text-lg font-bold text-white">
                    No matching projects found
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="mt-5 px-5 py-2 text-xs font-bold text-sky-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchedProjects.map(renderProjectCard)}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};
