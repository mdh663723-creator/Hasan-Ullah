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

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('portfolio_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          // If user uploaded a custom data URL, keep it, otherwise empty
          if (parsed.avatarUrl && parsed.avatarUrl.startsWith('data:image')) {
            return { ...USER_PROFILE, ...parsed };
          }
          return { ...USER_PROFILE, ...parsed, avatarUrl: '' };
        }
      }
    } catch {
      // ignore
    }
    return USER_PROFILE;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_user_projects_v5') || localStorage.getItem('portfolio_user_projects_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Heal any project where image was pasted as an iframe or Behance URL
          const healed = parsed.map((p: Project) => {
            if (
              p.id === 'proj-behance-shoe' ||
              p.image?.includes('255584833') ||
              p.image?.includes('<iframe') ||
              p.liveUrl?.includes('255584833') ||
              p.videoUrl?.includes('255584833') ||
              p.title?.toLowerCase().includes('shoe') ||
              p.title?.toLowerCase().includes('shoz')
            ) {
              return {
                ...p,
                id: 'proj-behance-shoe',
                title: 'Premier Shoes Advertisement & Mockup Design',
                category: 'graphic',
                categoryLabel: 'Graphic Design',
                description: 'Professional commercial shoe advertisement poster and photorealistic product mockup crafted in Adobe Photoshop. Features dynamic studio lighting, crisp product shadows, promotional typography, and high-impact brand visual aesthetics.',
                image: '/projects/shoe-mockup.webp',
                videoUrl: 'https://www.behance.net/embed/project/255584833?ilo0=1',
                liveUrl: 'https://www.behance.net/gallery/255584833/Shoz-Muckup-Design',
                tags: ['Adobe Photoshop', 'Shoe Mockup', 'Product Advertisement', 'Commercial Graphic', 'Photo Manipulation'],
                toolsUsed: ['Photoshop', 'Illustrator'],
                featured: true,
                metrics: 'Commercial Ad • Photorealistic Mockup'
              };
            }
            return p;
          });

          // Ensure shoe mockup project is present
          const hasShoe = healed.some((p: Project) => p.id === 'proj-behance-shoe' || p.image === '/projects/shoe-mockup.webp');
          if (!hasShoe) {
            return [INITIAL_PROJECTS[0], ...healed];
          }
          return healed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PROJECTS;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_user_projects_v5', JSON.stringify(projects));
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
      localStorage.setItem('portfolio_user_projects_v4', JSON.stringify(INITIAL_PROJECTS));
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
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Motion Graphics Watermark Background that subtly zooms as user scrolls */}
      <WatermarkBackground customImageUrl={profile.avatarUrl || '/watermark.jpg'} />

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
