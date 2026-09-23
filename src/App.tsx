/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Project, UserProfile } from './types';
import { INITIAL_PROJECTS, SKILL_CATEGORIES, USER_PROFILE } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Showcase } from './components/Showcase';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AddProjectModal } from './components/AddProjectModal';
import { WatermarkBackground } from './components/WatermarkBackground';
import { CursorLight } from './components/CursorLight';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('portfolio_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          // If user uploaded a custom data URL, keep it; otherwise use the updated USER_PROFILE.avatarUrl
          if (parsed.avatarUrl && parsed.avatarUrl.startsWith('data:image')) {
            return { ...USER_PROFILE, ...parsed };
          }
          return { ...USER_PROFILE, ...parsed, avatarUrl: USER_PROFILE.avatarUrl };
        }
      }
    } catch {
      // ignore
    }
    return USER_PROFILE;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const deletedIds = [
      'proj-ai1',
      'proj-v3',
      'proj-ai2',
      'proj-vid-corp-motion',
      'proj-vid-brain-concept',
      'proj-vid-quote-typography',
      'proj-vid-hasan-portfolio',
      'proj-vid-send-button-ui',
      'proj-vid-pendulum-logo',
      'proj-vid-perfume-commercial',
      'proj-vid-cinematic-portrait',
      'proj-vid-social-retention'
    ];
    try {
      const saved = localStorage.getItem('portfolio_user_projects_v20');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter((p: Project) => !deletedIds.includes(p.id));
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PROJECTS.filter((p: Project) => !deletedIds.includes(p.id));
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_user_projects_v20', JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [projects]);

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_user_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const handleSaveProject = (savedProject: Project) => {
    setProjects((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === savedProject.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = savedProject;
        return updated;
      }
      return [savedProject, ...prev];
    });

    // If modal was open for this project, update selectedProject too
    if (selectedProject && selectedProject.id === savedProject.id) {
      setSelectedProject(savedProject);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsAddModalOpen(true);
  };

  const handleOpenAddProject = () => {
    setEditingProject(null);
    setIsAddModalOpen(true);
  };

  const handleResetProjects = () => {
    setProjects(INITIAL_PROJECTS);
    try {
      localStorage.setItem('portfolio_user_projects_v9', JSON.stringify(INITIAL_PROJECTS));
    } catch {
      // ignore
    }
  };

  const handleDeleteCustomProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(null);
    }
  };

  const handleViewShowcase = () => {
    const el = document.getElementById('showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Interactive Cursor Light Effect that radiates gentle focused glow right at mouse pointer */}
      <CursorLight />

      {/* Motion Graphics Watermark Background that zooms smoothly from small to large as user scrolls */}
      <WatermarkBackground customImageUrl="/watermark-character.png" />

      {/* Top Navigation with Hasanullah Brand Logo & Photo */}
      <Navbar
        profile={profile}
        onOpenAddProject={handleOpenAddProject}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Vibrant Ambient Gradients & Hasanullah Portrait */}
        <Hero
          profile={profile}
          onViewShowcase={handleViewShowcase}
          onUpdateAvatar={(newUrl) => setProfile((prev) => ({ ...prev, avatarUrl: newUrl }))}
        />

        {/* Work Showcase with Live Project Links & Interactive Category Filters */}
        <Showcase
          projects={projects}
          onOpenProjectModal={(proj) => setSelectedProject(proj)}
          onOpenAddProjectModal={handleOpenAddProject}
          onEditProject={handleEditProject}
          onDeleteCustomProject={handleDeleteCustomProject}
          onResetProjects={handleResetProjects}
        />

        {/* Skills & Technical Capabilities with Colorful Gradients */}
        <SkillsSection
          categories={SKILL_CATEGORIES}
        />

        {/* About Hasanullah Section */}
        <AboutSection
          profile={profile}
        />

        {/* Contact Section with mdh663723@gmail.com and Interactive Form */}
        <ContactSection
          userEmail={profile.email}
          profile={profile}
        />
      </main>

      {/* Footer with Hasanullah Logo Badge */}
      <Footer profile={profile} />

      {/* Project Details Modal with Video Player, Poster toggle and Edit trigger */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEditProject={handleEditProject}
      />

      {/* Add / Edit Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProject(null);
        }}
        onSaveProject={handleSaveProject}
        initialProject={editingProject}
      />
    </div>
  );
}
