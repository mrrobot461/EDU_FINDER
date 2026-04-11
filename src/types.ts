export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  image: string;
  categoryId: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}