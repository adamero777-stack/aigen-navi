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
    title: `${tool.name}の特徴・料金・使い方 | AIGEN NAVI`,
    description: tool.description || `${tool.name}の詳細情報、料金、特徴をまとめています。`,
    alternates: { canonical: `https://aigen-navi.jp/tools/${id}` },
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
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: tool.name,
              description: tool.description,
              url: tool.affiliateUrl || tool.websiteUrl,
              applicationCategory: tool.type === 'music' ? 'MusicApplication' : 'MultimediaApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: tool.freeTrialAvailable ? '0' : '10',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: tool.qualityScore,
                bestRating: 10,
                worstRating: 1,
                ratingCount: 100,
              },
            }),
          }}
        />
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

          {tool.alternativeTools && tool.alternativeTools.length > 0 && (
            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, marginBottom: 12 }}>関連ツール</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {tool.alternativeTools.map((altId: string) => {
                  const alt = tools.find((t: Tool) => t.id === altId);
                  if (!alt) return null;
                  return (
                    <Link key={altId} href={`/tools/${altId}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: 8, textDecoration: 'none', color: 'inherit', fontSize: 14 }}>
                      <span style={{ fontWeight: 600 }}>{alt.name}</span>
                      <span style={{ fontSize: 12, color: '#999' }}>{alt.monthlyPrice} →</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
            <Link href="/tools" style={{ padding: '10px 20px', border: '1px solid #e5e7eb', borderRadius: 8, textDecoration: 'none', color: '#333', fontSize: 13, fontWeight: 600 }}>📋 ツール一覧</Link>
            <Link href="/#diagnosis" style={{ padding: '10px 20px', border: '1px solid #e5e7eb', borderRadius: 8, textDecoration: 'none', color: '#333', fontSize: 13, fontWeight: 600 }}>🔍 診断する</Link>
            <Link href="/videos" style={{ padding: '10px 20px', border: '1px solid #e5e7eb', borderRadius: 8, textDecoration: 'none', color: '#333', fontSize: 13, fontWeight: 600 }}>🎬 解説動画</Link>
            <Link href="/blog" style={{ padding: '10px 20px', border: '1px solid #e5e7eb', borderRadius: 8, textDecoration: 'none', color: '#333', fontSize: 13, fontWeight: 600 }}>📝 ブログ</Link>
          </div>
        </div>
        <footer style={{ borderTop: '1px solid var(--color-border)', padding: '32px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: 620, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 12 }}>
            <Link href="/" style={{ fontSize: 12, color: '#999', textDecoration: 'none' }}>トップ</Link>
            <Link href="/tools" style={{ fontSize: 12, color: '#999', textDecoration: 'none' }}>ツール一覧</Link>
            <Link href="/videos" style={{ fontSize: 12, color: '#999', textDecoration: 'none' }}>解説動画</Link>
            <Link href="/blog" style={{ fontSize: 12, color: '#999', textDecoration: 'none' }}>ブログ</Link>
            <Link href="/purpose/music" style={{ fontSize: 12, color: '#999', textDecoration: 'none' }}>音楽AI</Link>
          </div>
          <p style={{ fontSize: 12, color: '#bbb', margin: 0 }}>© 2026 AIGEN NAVI — 料金情報は各公式サイトでご確認ください</p>
        </footer>
      </main>
      <BackToTop />
    </>
  );
}
