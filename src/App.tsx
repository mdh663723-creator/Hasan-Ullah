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
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminStatusBar } from './components/AdminStatusBar';
import { WatermarkBackground } from './components/WatermarkBackground';
import { CursorLight } from './components/CursorLight';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('portfolio_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          const updatedName = parsed.name === 'Hasan Ullah' ? 'Hasanullah' : parsed.name;
          // If user uploaded a custom data URL, keep it; otherwise use the updated USER_PROFILE.avatarUrl
          if (parsed.avatarUrl && parsed.avatarUrl.startsWith('data:image')) {
            return { ...USER_PROFILE, ...parsed, name: updatedName };
          }
          return { ...USER_PROFILE, ...parsed, name: updatedName, tagline: USER_PROFILE.tagline, avatarUrl: USER_PROFILE.avatarUrl };
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
      const saved = localStorage.getItem('portfolio_user_projects_v25');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cvProj = INITIAL_PROJECTS.find((p) => p.id === 'proj-behance-256189277');
          // Always ensure CV project has the authentic original Behance image with real person
          const updated = parsed.map((p: Project) => {
            if (p.id === 'proj-behance-256189277' && cvProj) {
              return { ...cvProj, ...p, image: cvProj.image, liveUrl: cvProj.liveUrl };
            }
            return p;
          });
          const hasCv = updated.some((p: Project) => p.id === 'proj-behance-256189277');
          if (!hasCv && cvProj) {
            return [cvProj, ...updated.filter((p: Project) => !deletedIds.includes(p.id))];
          }
          return updated.filter((p: Project) => !deletedIds.includes(p.id));
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

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('portfolio_is_admin_v1');
      if (saved === 'true') return true;
      if (saved === 'false') return false;
      // Default on dev preview / localhost so Hasanullah has immediate access during design
      // Note: when external visitors open the shared link (ais-pre...), saved is null and hostname is not ais-dev, so they default to visitor view!
      if (window.location.hostname.includes('ais-dev') || window.location.hostname === 'localhost') {
        localStorage.setItem('portfolio_is_admin_v1', 'true');
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  });

  // Visitor preview mode allows admin to test how visitors see the site without Add Project
  const [isVisitorPreview, setIsVisitorPreview] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // If URL has ?admin or ?login, open admin login modal
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('admin') || params.has('login')) {
        setIsAdminModalOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // When previewing as visitor, effectiveIsAdmin is false
  const effectiveIsAdmin = isAdmin && !isVisitorPreview;

  // Sync projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_user_projects_v25', JSON.stringify(projects));
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
    if (!effectiveIsAdmin) return;
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
    if (!effectiveIsAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setEditingProject(project);
    setIsAddModalOpen(true);
  };

  const handleOpenAddProject = () => {
    if (!effectiveIsAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setEditingProject(null);
    setIsAddModalOpen(true);
  };

  const handleResetProjects = () => {
    if (!effectiveIsAdmin) return;
    setProjects(INITIAL_PROJECTS);
    try {
      localStorage.setItem('portfolio_user_projects_v9', JSON.stringify(INITIAL_PROJECTS));
    } catch {
      // ignore
    }
  };

  const handleDeleteCustomProject = (id: string) => {
    if (!effectiveIsAdmin) return;
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
        isAdmin={effectiveIsAdmin}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Vibrant Ambient Gradients & Hasanullah Portrait */}
        <Hero
          profile={profile}
          onViewShowcase={handleViewShowcase}
          onUpdateAvatar={
            effectiveIsAdmin
              ? (newUrl) => setProfile((prev) => ({ ...prev, avatarUrl: newUrl }))
              : undefined
          }
        />

        {/* Work Showcase with Live Project Links & Interactive Category Filters */}
        <Showcase
          projects={projects}
          onOpenProjectModal={(proj) => setSelectedProject(proj)}
          onOpenAddProjectModal={handleOpenAddProject}
          onEditProject={effectiveIsAdmin ? handleEditProject : undefined}
          onDeleteCustomProject={effectiveIsAdmin ? handleDeleteCustomProject : undefined}
          onResetProjects={effectiveIsAdmin ? handleResetProjects : undefined}
          isAdmin={effectiveIsAdmin}
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

      {/* Footer with Hasanullah Logo Badge & discreet Admin Login */}
      <Footer
        profile={profile}
        isAdmin={effectiveIsAdmin}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Project Details Modal with Video Player, Poster toggle and Edit trigger */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEditProject={effectiveIsAdmin ? handleEditProject : undefined}
        isAdmin={effectiveIsAdmin}
      />

      {/* Add / Edit Project Modal (Only opens if authenticated as Admin) */}
      <AddProjectModal
        isOpen={isAddModalOpen && effectiveIsAdmin}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProject(null);
        }}
        onSaveProject={handleSaveProject}
        initialProject={editingProject}
      />

      {/* Admin Login / Security Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          setIsVisitorPreview(false);
          try {
            localStorage.setItem('portfolio_is_admin_v1', 'true');
          } catch {
            // ignore
          }
        }}
        onLogout={() => {
          setIsAdmin(false);
          setIsVisitorPreview(false);
          try {
            localStorage.setItem('portfolio_is_admin_v1', 'false');
          } catch {
            // ignore
          }
        }}
        isAdmin={effectiveIsAdmin}
      />

      {/* Floating Admin Status & Visitor Preview Bar */}
      <AdminStatusBar
        isAdmin={effectiveIsAdmin}
        isVisitorPreview={isVisitorPreview}
        onToggleVisitorPreview={() => setIsVisitorPreview(!isVisitorPreview)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onLogout={() => {
          setIsAdmin(false);
          setIsVisitorPreview(false);
          try {
            localStorage.setItem('portfolio_is_admin_v1', 'false');
          } catch {
            // ignore
          }
        }}
      />
    </div>
  );
}
