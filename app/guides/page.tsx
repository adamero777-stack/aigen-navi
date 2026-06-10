import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import BackToTop from '@/components/BackToTop';
import ToolsSidebar from '@/components/ToolsSidebar';
import PurposeSidebar from '@/components/PurposeSidebar';
import { guides } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'AIサービス解説ガイド一覧 | AIGEN NAVI',
  description:
    'Claude・Codex・Google AI StudioなどのAIサービスの使い方・料金を初心者向けに解説。2026年最新情報を随時更新中。',
};

export default function GuidesPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: guides.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.name,
      url: `https://aigen-navi.jp/guides/${g.id}`,
    })),
  };

  return (
    <>
      <Header />
      <ToolsSidebar />
      <PurposeSidebar />
      <main className="main-area">
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>
        AIサービス解説ガイド
      </h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 32, lineHeight: 1.8 }}>
        話題のAIサービスの「できること・料金・始め方」を初心者向けにまとめています。
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        {guides.map((g) => (
          <div
            key={g.id}
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 12,
              padding: '20px 18px',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-accent)' }}>{g.category}</span>
            <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>{g.name}</h2>
            <p
              style={{
                fontSize: 13,
                color: '#555',
                lineHeight: 1.7,
                margin: 0,
                flexGrow: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical' as const,
                overflow: 'hidden',
              }}
            >
              {g.intro}
            </p>
            <div style={{ marginTop: 4 }}>
              <Link
                href={`/guides/${g.id}`}
                style={{
                  display: 'inline-block',
                  background: '#ffd000',
                  color: '#111',
                  fontSize: 13,
                  fontWeight: 700,
                  padding: '8px 18px',
                  borderRadius: 20,
                  textDecoration: 'none',
                }}
              >
                詳しく見る
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
