import { Project, SkillCategory, UserProfile } from '../types';

export const USER_PROFILE: UserProfile = {
  name: 'Hasan Ullah',
  title: 'Graphic Designer & Video Editor',
  tagline: 'Creative Graphic Designer and Video Editor with 1 year of dedicated experience crafting high-CTR YouTube thumbnails, viral Reels & Shorts, modern brand identity suites, and AI automation workflows.',
  avatarUrl: '',
  email: 'mdh663723@gmail.com',
  location: 'Available Worldwide • Remote & Relocation',
  availability: 'Open for Freelance & Full-time Roles',
  experienceYears: '1 Year Experience',
  completedProjects: '35+ Completed Projects',
  clientRating: '100% Client Satisfaction',
  learningFocus: 'AI Automation, Prompt Engineering & Generative Workflows',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61593510214841',
  telegramUrl: 'https://t.me/hasanullah',
  whatsappUrl: 'https://wa.me/?text=Hi%20Hasanullah%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project',
  instagramUrl: 'https://instagram.com/',
  twitterUrl: 'https://twitter.com/',
  behanceUrl: 'https://www.behance.net/hasanullah88'
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-behance-shoe',
    title: 'Premier Shoes Advertisement & Mockup Design',
    category: 'graphic',
    categoryLabel: 'Graphic Design',
    description: 'Professional commercial shoe advertisement poster and photorealistic product mockup crafted in Adobe Photoshop. Features dynamic studio lighting, crisp product shadows, promotional typography, and high-impact brand visual aesthetics.',
    image: '/projects/shoe-mockup.webp',
    videoUrl: 'https://www.behance.net/embed/project/255584833?ilo0=1',
    tags: ['Adobe Photoshop', 'Shoe Mockup', 'Product Advertisement', 'Commercial Graphic', 'Photo Manipulation'],
    toolsUsed: ['Photoshop', 'Illustrator'],
    liveUrl: 'https://www.behance.net/gallery/255584833/Shoz-Muckup-Design',
    featured: true,
    aspectRatio: 'landscape',
    metrics: 'Commercial Ad • Photorealistic Mockup'
  },
  {
    id: 'proj-g1',
    title: 'Minimalist Brand Identity & Logo Suite',
    category: 'graphic',
    categoryLabel: 'Graphic Design',
    description: 'Complete brand identity package featuring modern minimalist vector logo, brand style guidelines, color palettes, business cards, and stationery designs with a clean aesthetic.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80',
    tags: ['Adobe Illustrator', 'Brand Identity', 'Logo Design', 'Vector Art'],
    toolsUsed: ['Illustrator', 'Photoshop'],
    liveUrl: 'https://www.behance.net',
    featured: true,
    aspectRatio: 'landscape',
    metrics: 'Modern Vector • 100% Scalable'
  },
  {
    id: 'proj-v1',
    title: 'Viral Instagram Reels & Shorts Dynamic Edits',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'High-retention short-form video editing: fast-paced jump cuts, custom motion typography, sound design (SFX), pop-up graphics, and color grading for maximum audience engagement.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
    tags: ['Adobe Premiere Pro', 'CapCut Pro', 'Viral Reels', 'Sound Design'],
    toolsUsed: ['Premiere Pro', 'After Effects', 'CapCut'],
    liveUrl: 'https://www.youtube.com',
    featured: true,
    aspectRatio: 'portrait',
    metrics: '90%+ Audience Retention Rate'
  },
  {
    id: 'proj-g2',
    title: 'High CTR YouTube Thumbnails & Banner Art',
    category: 'graphic',
    categoryLabel: 'Graphic Design',
    description: 'Eye-catching, high click-through-rate (CTR) YouTube thumbnails with bold typography, subject cutouts, dynamic lighting, and contrast optimization.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    tags: ['Photoshop', 'YouTube Thumbnail', 'Photo Manipulation', 'Typography'],
    toolsUsed: ['Photoshop', 'Lightroom'],
    liveUrl: 'https://www.behance.net',
    featured: true,
    aspectRatio: 'landscape',
    metrics: '14.8% Average CTR Boost'
  },
  {
    id: 'proj-v2',
    title: 'Cinematic Commercial Promo & Color Grading',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Commercial brand video and cinematic promo teaser with Hollywood-grade color grading in DaVinci Resolve, seamless audio mastering, and smooth visual transitions.',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=900&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-42998-large.mp4',
    tags: ['DaVinci Resolve', 'Color Grading', 'Commercial Promo', 'Cinematic'],
    toolsUsed: ['DaVinci Resolve', 'Premiere Pro'],
    liveUrl: 'https://www.vimeo.com',
    featured: true,
    aspectRatio: 'landscape',
    metrics: '4K 60FPS • Cinematic Master'
  },
  {
    id: 'proj-ai1',
    title: 'AI Video Captioning & Auto-Repurposing Pipeline',
    category: 'ai-automation',
    categoryLabel: 'AI Automation',
    description: 'AI-automated content repurposing pipeline: automatically extracting engaging short clips from long-form podcasts, generating synced subtitles, and optimizing multi-platform distribution.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
    tags: ['AI Automation', 'n8n Workflow', 'Whisper AI', 'Auto Captions'],
    toolsUsed: ['n8n', 'OpenAI Whisper', 'CapCut AI'],
    liveUrl: 'https://github.com',
    featured: true,
    aspectRatio: 'landscape',
    metrics: '10x Faster Content Turnaround'
  },
  {
    id: 'proj-g3',
    title: 'Social Media Advertising Campaign & Flyers',
    category: 'graphic',
    categoryLabel: 'Graphic Design',
    description: 'Professional ad creative package for Facebook and Instagram campaigns, featuring high-converting promotional banners, flyers, and cohesive social kits.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=900&q=80',
    tags: ['Photoshop', 'Illustrator', 'Social Media Kit', 'Ad Creatives'],
    toolsUsed: ['Photoshop', 'Illustrator', 'Canva Pro'],
    liveUrl: 'https://www.behance.net',
    featured: false,
    aspectRatio: 'square',
    metrics: 'High Ad Conversion Aesthetics'
  },
  {
    id: 'proj-v3',
    title: 'Motion Graphics Title Intro & Lower Thirds',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Custom motion graphics intros, logo animations, and modern lower-thirds pack for YouTube creators and corporate presentations.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
    tags: ['After Effects', 'Motion Graphics', 'Logo Animation', 'VFX'],
    toolsUsed: ['After Effects', 'Illustrator'],
    liveUrl: 'https://www.youtube.com',
    featured: false,
    aspectRatio: 'landscape',
    metrics: 'Custom 60FPS Motion Presets'
  },
  {
    id: 'proj-ai2',
    title: 'AI Generative Graphics & Smart Prompts Studio',
    category: 'ai-automation',
    categoryLabel: 'AI Automation',
    description: 'High-fidelity concept art, photorealistic product backgrounds, and commercial vector assets powered by Midjourney v6 and DALL-E 3 prompt engineering.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80',
    tags: ['Midjourney', 'Prompt Engineering', 'Generative AI', 'Photoshop'],
    toolsUsed: ['Midjourney v6', 'Photoshop Beta', 'ChatGPT'],
    liveUrl: 'https://www.discord.com',
    featured: false,
    aspectRatio: 'landscape',
    metrics: 'Photorealistic AI Concept Art'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Graphic Design & Visual Identity',
    subtitle: 'Logos, branding suites, posters, banners, and high-CTR thumbnail art',
    skills: [
      { name: 'Adobe Photoshop (Photo Manipulation & Retouching)', level: 95, colorGradient: 'from-sky-400 to-blue-600' },
      { name: 'Adobe Illustrator (Vector Art & Logo Design)', level: 92, colorGradient: 'from-amber-400 to-orange-600' },
      { name: 'YouTube Thumbnail & High-CTR Graphics', level: 96, colorGradient: 'from-rose-500 to-red-600' },
      { name: 'Social Media Posters, Banners & Ads', level: 94, colorGradient: 'from-cyan-400 to-blue-500' },
      { name: 'Brand Style Guides & Typography', level: 90, colorGradient: 'from-purple-400 to-indigo-600' },
      { name: 'Canva Pro & Rapid Social Creatives', level: 98, colorGradient: 'from-teal-400 to-emerald-500' }
    ]
  },
  {
    title: 'Video Editing & Motion Graphics',
    subtitle: 'Reels, shorts, YouTube videos, color grading, and motion graphics',
    skills: [
      { name: 'Adobe Premiere Pro (Multi-track Editing & Pacing)', level: 94, colorGradient: 'from-purple-500 to-indigo-600' },
      { name: 'Viral Reels, Shorts & TikTok Edits', level: 96, colorGradient: 'from-pink-500 to-rose-600' },
      { name: 'Adobe After Effects (Motion Graphics & VFX)', level: 86, colorGradient: 'from-blue-500 to-purple-600' },
      { name: 'DaVinci Resolve (Cinematic Color Grading)', level: 85, colorGradient: 'from-emerald-400 to-teal-600' },
      { name: 'Sound Design, SFX & Audio Mastering', level: 88, colorGradient: 'from-amber-400 to-yellow-500' },
      { name: 'CapCut Desktop (Keyframing & Fast Turnaround)', level: 95, colorGradient: 'from-sky-400 to-cyan-600' }
    ]
  },
  {
    title: 'AI Automation & Learning Focus',
    subtitle: 'AI automation tools, prompt engineering, and smart content workflows',
    skills: [
      { name: 'AI Automation (n8n, Make, Zapier Workflows)', level: 84, colorGradient: 'from-emerald-400 to-teal-600' },
      { name: 'AI Prompt Engineering (ChatGPT, Gemini, Claude)', level: 92, colorGradient: 'from-sky-400 to-blue-600' },
      { name: 'Generative Visuals (Midjourney, DALL-E, Flux)', level: 88, colorGradient: 'from-indigo-400 to-purple-600' },
      { name: 'AI Voiceover, Auto-Captioning & Repurposing', level: 90, colorGradient: 'from-pink-400 to-rose-500' },
      { name: 'Content Pipeline Optimization & Smart Tools', level: 82, colorGradient: 'from-cyan-400 to-sky-600' }
    ]
  }
];
