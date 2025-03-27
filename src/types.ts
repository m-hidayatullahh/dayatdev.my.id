export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  githubLink: string;
}

export interface DigitalProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  demoLink: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
  level: number;
  technologies?: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  slug?: string; // Optional untuk direct access
  author?: string; // Optional jika ingin menampilkan author berbeda
  featured?: boolean; // Optional untuk post featured
  metadata?: {
    author: string;
    keywords: string[];
    difficulty: string;
    language: string;
    updatedAt: string;
  };
  relatedPosts?: number[]; // Optional untuk post terkait
}