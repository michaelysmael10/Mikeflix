export interface User {
  id: string;
  name: string;
  email: string;
  subscription: 'free' | 'premium';
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Content {
  id: string;
  title: string;
  description: string;
  category: 'movie' | 'series';
  language: string;
  status: 'published' | 'draft';
  views: string;
  createdAt: string;
  thumbnail: string;
  videoUrl: string;
  rating?: string;
  year?: number;
  duration?: string;
}

export interface Subscription {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  logo: string;
}