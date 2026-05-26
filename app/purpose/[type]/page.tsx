import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import BackToTop from '@/components/BackToTop';
import ToolsSidebar from '@/components/ToolsSidebar';
import PurposeSidebar from '@/components/PurposeSidebar';
import type { Tool } from '@/types/tool';
import toolsData from '@/data/tools.json';
import { TOOL_TAGS, PURPOSE_LABELS, type Purpose } from '@/lib/toolTags';

const tools = toolsData as Tool[];

export async function generateStaticParams() {
  return Object.keys(PURPOSE_LABELS).map(type => ({ type }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const purpose = PURPOSE_LABELS[type as Purpose];
  if (!purpose) return { title: 'Not Found | AIGEN NAVI' };
  return {
    title: `${purpose.title}のAIツール比較 | AIGEN NAVI`,
    description: purpose.description,
  };
}

export default async function PurposePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const purpose = PURPOSE_LABELS[type as Purpose];
  if (!purpose) notFound();

  const results = tools
    .map(t => {
      const tags = TOOL_TAGS[t.id];
      if (!tags || !tags.purposes.includes(type as Purpose)) return null;
      const score = (tags.purposes.length - tags.purposes.indexOf(type as Purpose)) * 10;
      return { tool: t, score };
    })
    .filter((r): r is { tool: Tool; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return (
    <>
      <Header />
      <ToolsSidebar />
      <PurposeSidebar />
      <main className="main-area">
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '40px 20px 80px' }}>
          <Link href="/" style={{ fontSize: 14, color: 'var(--color-text-muted)', textDecoration: 'none' }}>← トップへ戻る</Link>
          <h1 style={{ fontSize: 28, marginTop: 20, marginBottom: 8 }}>
            {purpose.icon} {purpose.title}におすすめのAIツール
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, lineHeight: 1.7 }}>{purpose.description}</p>

          <div style={{ display: 'grid', gap: 16 }}>
            {results.map((r, i) => (
              <div key={r.tool.id} style={{ padding: 20, border: '1px solid #e5e7eb', borderRadius: 12, background: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#0054ff' }}>#{i + 1}</span>
                  <h2 style={{ fontSize: 20, margin: 0 }}>{r.tool.name}</h2>
                  <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{r.tool.monthlyPrice}</span>
                </div>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 12, lineHeight: 1.6 }}>{r.tool.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {r.tool.features.slice(0, 4).map((f, fi) => (<span key={fi} className="tag">{f}</span>))}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  {(r.tool.affiliateUrl || r.tool.websiteUrl) && (
                    <a href={r.tool.affiliateUrl || r.tool.websiteUrl} target="_blank" rel={r.tool.affiliateUrl ? 'sponsored noopener noreferrer' : 'noopener noreferrer'} className="btn-accent">
                      {r.tool.affiliateUrl ? '公式サイトを見る（PR）' : '公式サイトを見る'}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  )}
                  <Link href={`/tools/${r.tool.id}`} className="btn-accent" style={{ background: '#facc15', color: '#000' }}>
                    詳しい情報を見る →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BackToTop />
    </>
  );
}
