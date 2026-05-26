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
