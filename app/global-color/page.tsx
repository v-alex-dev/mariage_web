'use client';

import { useEffect, useState } from 'react';
import { COLOR_SECTIONS, DEFAULT_COLORS, STORAGE_KEY, COUPLE_NAME } from '@/app/lib/colorConfig';
import type { ColorMap } from '@/app/types/colors';

function loadColors(): ColorMap {
  if (typeof window === 'undefined') return DEFAULT_COLORS as ColorMap;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = raw ? (JSON.parse(raw) as Partial<ColorMap>) : {};
    return { ...DEFAULT_COLORS, ...stored } as ColorMap;
  } catch {
    return DEFAULT_COLORS as ColorMap;
  }
}
