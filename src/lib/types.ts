// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  author: string;
  read_time: string;
  image_url: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

// Portfolio Types
export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: string;
  details: string[];
  before_image_url?: string;
  after_image_url: string;
  testimonial_content?: string;
  testimonial_author?: string;
  testimonial_role?: string;
  created_at: string;
  updated_at: string;
}

// Product Types
export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  brand?: string;
  features: string[];
  tags?: string[];
  rating?: number;
  reviews?: number;
  created_at: string;
  updated_at: string;
}