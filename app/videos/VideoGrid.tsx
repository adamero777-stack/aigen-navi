'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  videoId: string;
  category: string;
  relatedToolId: string;
  featured: boolean;
}

const CATEGORIES = [
  { key: 'all', label: 'すべて' },
  { key: 'image', label: '📷 画像AI' },
  { key: 'video', label: '🎬 動画AI' },
  { key: 'music', label: '🎵 音楽AI' },
];

const TOOL_NAMES: Record<string, string> = {
  midjourney: 'Midjourney',
  'chatgpt-image': 'ChatGPT画像生成',
  'stable-diffusion': 'Stable Diffusion',
  flux: 'Flux',
  kling: 'Kling AI',
  runway: 'Runway',
  veo: 'Google Veo',
  'adobe-firefly': 'Adobe Firefly',
  'canva-pro': 'Canva Pro',
  envato: 'Envato Elements',
  'getimg-ai': 'Getimg.ai',
  pixeldojo: 'Pixel Dojo',
  suno: 'Suno AI',
  udio: 'Udio',
  soundraw: 'Soundraw',
};

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [filter, setFilter] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filtered = filter === 'all' ? videos : videos.filter(v => v.category === filter);

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {CATEGORIES.map(c => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: filter === c.key ? '2px solid #0054ff' : '1px solid #e5e7eb',
              background: filter === c.key ? '#eff6ff' : '#fff',
              color: filter === c.key ? '#0054ff' : '#666',
              fontWeight: filter === c.key ? 600 : 400,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >{c.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filtered.map(v => (
          <div key={v.id} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            <button
              onClick={() => setSelectedVideo(v.videoId)}
              style={{
                padding: 0, border: 'none', cursor: 'pointer', background: '#000',
                position: 'relative', width: '100%', aspectRatio: '16/9', display: 'block',
              }}
              aria-label="動画を再生"
            >
              <img
                src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
                alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid white', marginLeft: 3 }} />
              </div>
              {v.featured && (
                <span style={{ position: 'absolute', top: 6, left: 6, background: '#facc15', color: '#000', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>おすすめ</span>
              )}
            </button>
            <div style={{ padding: '8px 10px' }}>
              <p style={{ fontSize: 12, fontWeight: 600, margin: '0 0 4px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{v.title}</p>
              <Link href={`/tools/${v.relatedToolId}`} style={{ fontSize: 11, color: '#0054ff', textDecoration: 'none' }}>
                {TOOL_NAMES[v.relatedToolId] || v.relatedToolId} の詳細 →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: 20,
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 960, aspectRatio: '16/9', position: 'relative' }}>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8 }}
            />
            <button
              onClick={() => setSelectedVideo(null)}
              style={{ position: 'absolute', top: -40, right: 0, color: '#fff', background: 'transparent', border: 'none', fontSize: 28, cursor: 'pointer', padding: 8 }}
              aria-label="閉じる"
            >\u2715</button>
          </div>
        </div>
      )}
    </>
  );
}
