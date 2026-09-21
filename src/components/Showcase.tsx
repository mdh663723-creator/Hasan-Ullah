import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Eye, Plus, Search, Filter, Sparkles, Layers, Trash2, ArrowUpRight, Play, Edit3, Film, Palette, RefreshCw } from 'lucide-react';
import { Project, ProjectCategory } from '../types';

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
    { id: 'graphic', label: 'Graphic Design', icon: '🎨', color: 'from-amber-500 to-orange-600' },
    { id: 'video', label: 'Video Editing', icon: '🎬', color: 'from-purple-500 to-pink-600' },
    { id: 'ai-automation', label: 'AI Automation', icon: '🤖', color: 'from-emerald-500 to-teal-600' },
    { id: 'web', label: 'Web & Digital', icon: '🌐', color: 'from-blue-500 to-indigo-600' }
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const titleMatch = project.title.toLowerCase().includes(q);
      const descMatch = project.description.toLowerCase().includes(q);
      const tagMatch = project.tags.some((tag) => tag.toLowerCase().includes(q));
      const toolMatch = project.toolsUsed?.some((tool) => tool.toLowerCase().includes(q));

      return matchesCategory && (titleMatch || descMatch || tagMatch || toolMatch);
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="showcase" className="py-20 sm:py-24 bg-gradient-to-b from-black via-slate-950 to-black relative">
      {/* Background visual accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
      <div
        className="pointer-events-none absolute top-32 right-6 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-20 left-6 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl -z-10"
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
              Graphic Design &{' '}
              <span className="bg-gradient-to-r from-purple-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">
                Video Editing Works
              </span>
            </h2>
            <p className="text-slate-300 mt-3 max-w-2xl text-base sm:text-lg leading-relaxed">
              Explore branding logos, social media posters, high-CTR YouTube thumbnails, viral Reels/Shorts, and AI automation workflows. Click any project to inspect full details or play video.
            </p>
          </div>

          {/* Action Buttons (Add Project & Reset) */}
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
              const count = cat.id === 'all' ? projects.length : projects.filter(p => p.category === cat.id).length;
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
              placeholder="Search by project title or tool..."
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

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center bg-slate-900/60 rounded-3xl border-2 border-dashed border-slate-800 shadow-md">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
              <Filter className="w-7 h-7" />
            </div>
            <p className="text-lg font-bold text-white">
              No matching projects found
            </p>
            <p className="text-sm text-slate-400 mt-1.5 max-w-sm mx-auto">
              Try adjusting your search criteria or switch categories. You can also add a new custom project!
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
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group flex flex-col bg-slate-950 rounded-3xl overflow-hidden border-2 border-slate-800/90 shadow-md hover:shadow-2xl hover:shadow-sky-500/20 hover:border-sky-500/60 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
                onClick={() => onOpenProjectModal(project)}
              >
                {/* Image Banner & Overlays */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/projects/shoe-mockup.webp';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Gradient vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                  {/* If video or interactive project, show Media Button Overlay */}
                  {project.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className={`w-13 h-13 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-all ${
                        project.videoUrl.includes('behance') ? 'group-hover:bg-sky-600/95' : 'group-hover:bg-purple-600/90'
                      }`}>
                        {project.videoUrl.includes('behance') ? (
                          <Sparkles className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Category Pill on Image */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className={`px-3 py-1 text-xs font-extrabold tracking-wide uppercase rounded-xl shadow-xs border backdrop-blur-md ${
                      project.category === 'video'
                        ? 'bg-purple-900/90 text-purple-200 border-purple-400/40'
                        : project.category === 'graphic'
                        ? 'bg-amber-900/90 text-amber-200 border-amber-400/40'
                        : 'bg-slate-900/95 text-sky-300 border-slate-700'
                    }`}>
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Top Right Badges */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}

                    {/* Edit Project Button on Card */}
                    {onEditProject && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProject(project);
                        }}
                        className="p-1.5 rounded-lg bg-black/70 hover:bg-sky-600 text-white backdrop-blur-md transition-colors shadow-xs"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Delete Project Button */}
                    {onDeleteCustomProject && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Are you sure you want to remove "${project.title}"?`)) {
                            onDeleteCustomProject(project.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white backdrop-blur-xs transition-colors shadow-xs"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Bottom Image Metrics overlay */}
                  {project.metrics && (
                    <div className="absolute bottom-3 left-4 right-4 text-xs font-semibold text-sky-300 truncate flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                      <span>{project.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Project Title */}
                    <h3 className="text-xl font-extrabold text-white group-hover:text-sky-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="mt-2.5 text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tools / Software Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(project.toolsUsed && project.toolsUsed.length > 0 ? project.toolsUsed : project.tags).slice(0, 4).map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-bold text-sky-300 bg-sky-950/60 border border-sky-800/60 rounded-lg group-hover:bg-sky-900/60 transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Buttons */}
                  <div
                    className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between gap-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Primary Live Link Button */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`project-live-btn-${project.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/20 hover:shadow-sky-500/40 transition-all hover:scale-102 active:scale-98"
                    >
                      {project.category === 'video' ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Watch / Link</span>
                        </>
                      ) : (
                        <>
                          <span>View Project</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </a>

                    {/* Edit button */}
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

                    {/* View Details Modal Trigger */}
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
