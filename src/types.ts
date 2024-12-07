export interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  grade: number;
  subject: string;
  channelName: string;
  watched: boolean;
  favorite: boolean;
  addedBy: string; // 'admin' | 'user'
}

export interface HeroContent {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
  active: boolean;
  standalone?: boolean; // When true, only this hero will be shown
  includeVideos?: boolean; // When false, random videos won't be included in hero rotation
}

export interface FeaturedContent {
  id: string;
  type: 'video' | 'custom';
  videoId?: string;
  imageUrl?: string;
  link?: string;
  title: string;
}

export interface Subject {
  id: string;
  name: string;
}

export const GRADES = [5, 6, 7, 8, 9, 10, 11, 12];

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Matematik' },
  { id: 'physics', name: 'Fizik' },
  { id: 'chemistry', name: 'Kimya' },
  { id: 'biology', name: 'Biyoloji' },
  { id: 'turkish', name: 'Türkçe' },
  { id: 'history', name: 'Tarih' },
  { id: 'geography', name: 'Coğrafya' },
  { id: 'english', name: 'İngilizce' }
];
