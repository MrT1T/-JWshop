import React from 'react';
import PromoBanner from '@/components/PromoBanner';
import WinterSale from '@/components/PromoBanner/Promos/WinterSale';

export interface PromoBannerConfig {
  id: string;
  component: React.FC;
  priority: number; // Higher priority shows first
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}

export const promoBanners: PromoBannerConfig[] = [
  {
    id: 'free-shipping',
    component: PromoBanner,
    isActive: false,
    priority: 99,
  },
  {
    id: 'winter-sale',
    component: WinterSale,
    isActive: true,
    priority: 1,
  },
];
