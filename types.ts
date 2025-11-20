import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PageRoute {
  HOME = '/',
  PRODUCTS = '/products',
  SERVICES = '/services',
  CONTACT = '/contact',
  ABOUT = '/about'
}