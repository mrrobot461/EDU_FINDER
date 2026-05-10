// src/lib/iconMap.ts
import { 
  Terminal, 
  Briefcase, 
  FlaskConical, 
  Palette, 
  Languages, 
  Theater, 
  Megaphone, 
  Heart, 
  User, 
  Calculator, 
  Music, 
  Camera, 
  HelpCircle,
  Code,
  Activity,
  Globe,
  TrendingUp,
  Type
} from 'lucide-react';

const icons: Record<string, React.ComponentType<any>> = {
  terminal: Terminal,
  tech: Code,
  business: Briefcase,
  science: FlaskConical,
  design: Palette,
  languages: Languages,
  marketing: TrendingUp,
  health: Activity,
  math: Calculator,
  arts: Type,
  default: HelpCircle
};

export const getIconComponent = (iconName: string | null | undefined) => {
  if (!iconName) return HelpCircle;
  return icons[iconName.toLowerCase()] || HelpCircle;
};

export default getIconComponent;
