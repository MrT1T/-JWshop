'use client';

import React from 'react';
import { promoBanners } from '@/data/promoBanners';

const PromoBannerManager: React.FC = () => {

  // Get active banner with highest priority
  const activeBanner = promoBanners
    .filter((banner) => banner.isActive)
    .sort((a, b) => a.priority - b.priority)[0];

  if (!activeBanner) return null;

  // Check if banner is within date range
  const now = new Date();
  if (activeBanner.startDate && now < activeBanner.startDate) return null;
  if (activeBanner.endDate && now > activeBanner.endDate) return null;

  return <activeBanner.component />;
};

export default PromoBannerManager;
