// src/types.ts
export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  image: string;
  category_id: string; // Changed from categoryId to match DB
  url: string;
}

export interface Category {
  id: string;
  name: string;
  icon_name: string; // Changed from icon to icon_name
  description: string;
}