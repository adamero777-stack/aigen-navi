import type { MetadataRoute } from 'next';
import toolsData from '@/data/tools.json';
import { guides } from '@/lib/guides';

const BASE = 'https://aigen-navi.jp';

const purposes = ['sns','ad','youtube','blog','business','hobby','short','pro-video','education'];

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = toolsData.map(t => ({
    url: `${BASE}/tools/${t.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const purposePages = purposes.map(p => ({
    url: `${BASE}/purpose/${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const guidePages = guides.map(g => ({
    url: `${BASE}/guides/${g.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${BASE}/tools`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/videos`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE}/guides`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    ...guidePages,
    ...tools,
    ...purposePages,
  ];
}
