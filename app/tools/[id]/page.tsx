import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import BackToTop from '@/components/BackToTop';
import ToolsSidebar from '@/components/ToolsSidebar';
import PurposeSidebar from '@/components/PurposeSidebar';
import VideoGallery from './VideoGallery';
import type { Tool } from '@/types/tool';
import toolsData from '@/data/tools.json';

const tools = toolsData as Tool[];

export async function generateStaticParams() {
  return tools.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = tools.find((t) => t.id === id);
  if (!tool) return { title: 'Not Found | AIGEN NAVI' };
  return {
    title: `${tool.name}の特徴・使い方 | AIGEN NAVI`,
    description: tool.description || `${tool.name}の詳細情報、料金、特徴をまとめています。`,
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = tools.find((t) => t.id === id);
  if (!tool) notFound();

  return (
    <>
      <Header />
      <ToolsSidebar />
      <PurposeSidebar />
      <main className="main-area">
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '40px 20px 80px' }}>
          <Link href="/" style={{ fontSize: 14, color: 'var(--color-text-muted)', textDecoration: 'none' }}>← トップへ戻る</Link>

          <h1 style={{ fontSize: 32, marginTop: 20, marginBottom: 8 }}>{tool.name}</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, lineHeight: 1.7 }}>{tool.description}</p>

          <section style={{ marginBottom: 32, padding: 20, background: '#f8fafc', borderRadius: 8 }}>
            <h2 style={{ fontSize: 18, marginBottom: 12 }}>基本情報</h2>
            <dl style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px 16px', margin: 0 }}>
              <dt style={{ color: 'var(--color-text-muted)' }}>料金</dt>
              <dd style={{ margin: 0 }}>{tool.monthlyPrice}</dd>
              <dt style={{ color: 'var(--color-text-muted)' }}>生成時間</dt>
              <dd style={{ margin: 0 }}>{tool.generationTime}</dd>
              <dt style={{ color: 'var(--color-text-muted)' }}>最適用途</dt>
              <dd style={{ margin: 0 }}>{tool.bestFor}</dd>
              {tool.imageQuality && (<><dt style={{ color: 'var(--color-text-muted)' }}>画質</dt><dd style={{ margin: 0 }}>{tool.imageQuality}</dd></>)}
            </dl>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, marginBottom: 12 }}>特徴</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tool.features.map((f, i) => (<span key={i} className="tag">{f}</span>))}
            </div>
          </section>

          {(tool.affiliateUrl || tool.websiteUrl) && (
            <section style={{ marginBottom: 40 }}>
              <a
                href={tool.affiliateUrl || tool.websiteUrl}
                target="_blank"
                rel={tool.affiliateUrl ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
                className="btn-accent"
                style={{ display: 'inline-flex' }}
              >
                {tool.affiliateUrl ? '公式サイトを見る（PR）' : '公式サイトを見る'}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </section>
          )}

          {/* メリット・デメリット */}
          {(tool.pros || tool.cons) && (
            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, marginBottom: 12 }}>メリット・デメリット</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {tool.pros && (
                  <div style={{ padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                    <h3 style={{ fontSize: 14, color: '#16a34a', marginBottom: 8 }}>✅ メリット</h3>
                    <ul style={{ padding: '0 0 0 16px', margin: 0 }}>
                      {tool.pros.map((p: string, i: number) => (<li key={i} style={{ fontSize: 13, marginBottom: 4, lineHeight: 1.6 }}>{p}</li>))}
                    </ul>
                  </div>
                )}
                {tool.cons && (
                  <div style={{ padding: 16, background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca' }}>
                    <h3 style={{ fontSize: 14, color: '#dc2626', marginBottom: 8 }}>⚠️ デメリット</h3>
                    <ul style={{ padding: '0 0 0 16px', margin: 0 }}>
                      {tool.cons.map((c: string, i: number) => (<li key={i} style={{ fontSize: 13, marginBottom: 4, lineHeight: 1.6 }}>{c}</li>))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* こんな人におすすめ */}
          {tool.recommendedFor && (
            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, marginBottom: 12 }}>こんな人におすすめ</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {tool.recommendedFor.map((r: string, i: number) => (
                  <span key={i} style={{ display: 'inline-block', padding: '6px 12px', background: '#eff6ff', color: '#1d4ed8', borderRadius: 20, fontSize: 13 }}>&#x1F464; {r}</span>
                ))}
              </div>
            </section>
          )}

          {/* 料金プラン */}
          {tool.detailedPricing && (
            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, marginBottom: 12 }}>料金プラン</h2>
              <div style={{ padding: 16, background: '#fefce8', borderRadius: 8, border: '1px solid #fde68a' }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8 }}>&#x1F4B0; {tool.detailedPricing}</p>
              </div>
            </section>
          )}

          {/* 類似ツールとの違い */}
          {tool.comparison && (
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 18, marginBottom: 12 }}>類似ツールとの違い</h2>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8 }}>&#x1F50D; {tool.comparison}</p>
              </div>
            </section>
          )}

          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, marginBottom: 12 }}>{tool.name}の使い方・紹介動画</h2>
            <VideoGallery videos={tool.youtubeVideos || []} toolName={tool.name} />
          </section>
        </div>
      </main>
      <BackToTop />
    </>
  );
}
