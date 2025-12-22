import React from 'react';
import PromoBanner from '@/components/PromoBanner';

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
    isActive: true,
    priority: 1,
  },
];
