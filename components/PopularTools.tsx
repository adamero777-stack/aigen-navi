'use client';
import Link from 'next/link';
import type { Tool } from '@/types/tool';

const TOP5 = ['midjourney', 'suno', 'getimg-ai', 'kling', 'soundraw'];
const TAGLINES: Record<string, string> = {
  midjourney: 'アート最高峰の画像生成AI',
  suno: 'テキストから本格楽曲を90秒で生成',
  'getimg-ai': 'リアル系の生成から編集までワンストップ',
  kling: 'コスパ最強のAI動画生成',
  soundraw: '商用BGMを効率よく量産',
};
const TYPE_META: Record<string, { label: string; color: string }> = {
  static: { label: '画像', color: '#3b82f6' },
  video: { label: '動画', color: '#ef4444' },
  music: { label: '音楽', color: '#8b5cf6' },
  both: { label: '画像/動画', color: '#059669' },
};

export default function PopularTools({ tools }: { tools: Tool[] }) {
  const popular = TOP5.map(id => tools.find(t => t.id === id)).filter(Boolean) as Tool[];
  return (
    <section style={{ margin: '0 auto 48px', padding: '0 20px', maxWidth: 700 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: 'var(--color-text)' }}>人気のAI生成ツール</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        {popular.map((tool, i) => {
          const meta = TYPE_META[tool.type] || TYPE_META.static;
          const tagline = TAGLINES[tool.id] || '';
          const ctaUrl = tool.affiliateUrl || tool.websiteUrl;
          return (
            <div key={tool.id} style={{
              flex: '0 0 calc(50% - 6px)', padding: '14px 16px', borderRadius: 10,
              border: '1px solid var(--color-border)', background: '#fff',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{
                  width: 26, height: 26, borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0,
                  background: i === 0 ? 'var(--color-accent)' : i === 1 ? '#8b5cf6' : i === 2 ? '#f59e0b' : '#e2e8f0',
                  color: i < 3 ? '#fff' : '#64748b',
                }}>{i + 1}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: meta.color,
                  background: meta.color + '14', padding: '1px 7px', borderRadius: 4,
                }}>{meta.label}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)' }}>{tool.name}</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: '0 0 10px', paddingLeft: 34 }}>{tagline}</p>
              <div style={{ display: 'flex', gap: 8, paddingLeft: 34, flexWrap: 'wrap' }}>
                <Link href={'/tools/' + tool.id} style={{
                  fontSize: 12, fontWeight: 700, color: '#1a1a1a',
                  textDecoration: 'none', padding: '6px 16px', borderRadius: 20,
                  background: '#ffd000',
                }}>詳しく見る</Link>
                {ctaUrl && (
                  <a href={ctaUrl} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: 12, fontWeight: 700, color: 'var(--color-accent)',
                    textDecoration: 'none', padding: '6px 16px', borderRadius: 20,
                    border: '2px solid var(--color-accent)', background: '#fff',
                  }}>公式サイト →</a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
