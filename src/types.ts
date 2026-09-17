export type ProjectCategory = 'all' | 'graphic' | 'video' | 'ai-automation' | 'web';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  image: string;
  videoUrl?: string; // e.g., YouTube embed / direct video / Vimeo
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  tags: string[];
  toolsUsed?: string[]; // Photoshop, Premiere Pro, After Effects, Illustrator, CapCut, n8n, etc.
  liveUrl: string; // behance, youtube, drive, live preview
  client?: string;
  featured?: boolean;
  metrics?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  colorGradient?: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface UserProfile {
  name: string;
  tagline: string;
  title: string;
  avatarUrl: string;
  email: string;
  location: string;
  availability: string;
  experienceYears: string;
  completedProjects: string;
  clientRating: string;
  learningFocus?: string;
  facebookUrl?: string;
  telegramUrl?: string;
  whatsappUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  behanceUrl?: string;
  appUrl?: string;
}
