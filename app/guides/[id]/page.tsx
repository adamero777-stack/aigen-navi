import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides, getGuide } from '@/lib/guides';

export function generateStaticParams() {
  return guides.map((g) => ({ id: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const guide = getGuide(id);
  if (!guide) return {};
  return {
    title: `${guide.title} | AIGEN NAVI`,
    description: guide.description,
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guide = getGuide(id);
  if (!guide) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    author: { '@type': 'Organization', name: 'AIGEN NAVI', url: 'https://aigen-navi.jp' },
    publisher: { '@type': 'Organization', name: 'AIGEN NAVI', url: 'https://aigen-navi.jp' },
    mainEntityOfPage: `https://aigen-navi.jp/guides/${guide.id}`,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://aigen-navi.jp' },
      { '@type': 'ListItem', position: 2, name: 'AIサービス解説', item: 'https://aigen-navi.jp/guides' },
      { '@type': 'ListItem', position: 3, name: guide.name, item: `https://aigen-navi.jp/guides/${guide.id}` },
    ],
  };

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* パンくず */}
      <nav style={{ fontSize: 12, color: '#888', marginBottom: 24 }}>
        <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>ホーム</Link>
        {' › '}
        <Link href="/guides" style={{ color: '#888', textDecoration: 'none' }}>AIサービス解説</Link>
        {' › '}
        <span style={{ color: 'var(--color-text)' }}>{guide.name}</span>
      </nav>

      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent)' }}>{guide.category}</span>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.5, margin: '8px 0 12px', color: 'var(--color-text)' }}>
        {guide.title.replace(' | AIGEN NAVI', '')}
      </h1>
      <p style={{ fontSize: 12, color: '#999', marginBottom: 24 }}>
        最終更新：{guide.updatedAt}　提供：{guide.developer}
      </p>

      <p style={{ fontSize: 15, lineHeight: 2, color: 'var(--color-text)', marginBottom: 36 }}>{guide.intro}</p>

      {guide.sections.map((s, i) => (
        <section key={i} style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 19,
              fontWeight: 700,
              color: 'var(--color-text)',
              borderLeft: '4px solid var(--color-accent)',
              paddingLeft: 12,
              marginBottom: 16,
            }}
          >
            {s.heading}
          </h2>
          {s.body.map((p, j) => (
            <p key={j} style={{ fontSize: 15, lineHeight: 2, color: 'var(--color-text)', marginBottom: 14 }}>
              {p}
            </p>
          ))}
        </section>
      ))}

      {/* FAQ */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: 'var(--color-text)',
            borderLeft: '4px solid var(--color-accent)',
            paddingLeft: 12,
            marginBottom: 16,
          }}
        >
          よくある質問
        </h2>
        {guide.faqs.map((f, i) => (
          <div key={i} style={{ marginBottom: 18, background: '#f8f9fb', borderRadius: 10, padding: '16px 18px' }}>
            <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px', color: 'var(--color-text)' }}>Q. {f.q}</p>
            <p style={{ fontSize: 14, lineHeight: 1.9, margin: 0, color: '#444' }}>A. {f.a}</p>
          </div>
        ))}
      </section>

      {/* CTA：公式 + 診断 */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: '#ffd000',
            color: '#111',
            fontSize: 14,
            fontWeight: 700,
            padding: '10px 22px',
            borderRadius: 20,
            textDecoration: 'none',
          }}
        >
          30秒でAIツール診断する
        </Link>
        <a
          href={guide.officialUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          style={{
            display: 'inline-block',
            background: '#fff',
            border: '2px solid var(--color-accent)',
            color: 'var(--color-accent)',
            fontSize: 14,
            fontWeight: 700,
            padding: '8px 22px',
            borderRadius: 20,
            textDecoration: 'none',
          }}
        >
          公式サイト
        </a>
      </div>

      {/* 他のガイドへの内部リンク */}
      <section>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: 'var(--color-text)' }}>
          他のAIサービス解説
        </h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {guides
            .filter((g) => g.id !== guide.id)
            .map((g) => (
              <Link
                key={g.id}
                href={`/guides/${g.id}`}
                style={{
                  fontSize: 13,
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 20,
                  padding: '6px 14px',
                  textDecoration: 'none',
                  background: '#fff',
                }}
              >
                {g.name}
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
