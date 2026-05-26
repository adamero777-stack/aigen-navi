'use client';
import { useState } from 'react';

interface Props {
  videos: string[];
  toolName: string;
}

export default function VideoGallery({ videos, toolName }: Props) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  if (videos.length === 0) {
    return (
      <div style={{ padding: 32, textAlign: 'center', background: '#f8fafc', borderRadius: 8 }}>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 12 }}>動画は順次追加予定です</p>
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(toolName + ' 使い方')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0054ff', textDecoration: 'underline' }}
        >
          YouTubeで「{toolName} 使い方」を検索 →
        </a>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {videos.map((videoId) => (
          <button
            key={videoId}
            onClick={() => setSelectedVideo(videoId)}
            style={{
              padding: 0,
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              overflow: 'hidden',
              cursor: 'pointer',
              background: '#000',
              position: 'relative',
              aspectRatio: '16/9',
            }}
            aria-label="動画を再生"
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(0,0,0,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 0, height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: '16px solid white',
                marginLeft: 4,
              }} />
            </div>
          </button>
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
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 960, aspectRatio: '16/9', position: 'relative' }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8 }}
            />
            <button
              onClick={() => setSelectedVideo(null)}
              style={{
                position: 'absolute', top: -40, right: 0,
                color: '#fff', background: 'transparent', border: 'none',
                fontSize: 28, cursor: 'pointer', padding: 8,
              }}
              aria-label="閉じる"
            >✕</button>
          </div>
        </div>
      )}
    </>
  );
}
