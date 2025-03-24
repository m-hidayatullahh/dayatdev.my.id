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
  image: string;
  demoLink: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}