// Service Types
export interface Service {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  shortDescription?: string;
  category: string;
  features: string[];
  technologies: string[];
  slug: string;
  detailPageUrl?: string;
  icon?: string;
  image?: string;
  isActive: boolean;
  isFeatured?: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

// Testimonial Types
export interface Testimonial {
  _id: string;
  clientName: string;
  clientPosition: string;
  companyName: string;
  companyTag?: string;
  content: string;
  rating: number;
  avatar?: string;
  companyLogo?: string;
  clientImage?: string;
  location: {
    city?: string;
    country?: string;
    countryCode?: string;
  };
  projectType?: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt?: string;
}

// Project Types
export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  clientName: string;
  industry: string;
  projectType?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  technologies: string[];
  teamSize?: number;
  duration?: string;
  projectUrl?: string;
  caseStudyUrl?: string;
  images?: {
    hero?: string;
    gallery?: string[];
    mockups?: string[];
  };
  testimonial?: Testimonial;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt?: string;
}

// Contact Types
export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  source?: string;
}

export interface Contact extends ContactForm {
  _id: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'closed';
  notes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

// Blog Types
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  categories: string[];
  tags: string[];
  readTime: number;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  views: number;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Hero Statistics
export interface HeroStats {
  experts: string;
  clients: string;
  nps: string;
  years: string;
}

// Navigation Types
export interface NavigationItem {
  title: string;
  href?: string;
  items?: NavigationItem[];
}