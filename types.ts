export interface AiTool {
  id: string;
  name: string;
  slug: string;
  category: 'Image Gen' | 'Text Gen' | 'Coding' | 'Video' | 'Audio' | 'Productivity';
  pricing: 'Free' | 'Paid' | 'Freemium';
  description: string;
  overview?: string;
  pros?: string[];
  cons?: string[];
  logoUrl: string;
  website: string;
  rating: number;
}

export type Page = 'home' | 'tools' | 'about';

// Fix: Add User interface for geminiService and DatabaseView
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer' | string;
  status: 'active' | 'inactive' | string;
  lastLogin: string;
}

// Fix: Add View enum for Navigation component
export enum View {
  DASHBOARD = 'dashboard',
  DATABASE = 'database',
  FUNCTIONS = 'functions',
  SETTINGS = 'settings',
}