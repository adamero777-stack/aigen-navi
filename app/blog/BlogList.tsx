'use client';

interface Article {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  thumbnail: string;
}

export default function BlogList({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
        <p style={{ fontSize: 16, marginBottom: 16 }}>記事を準備中です。</p>
        <a href="https://note.com/aigennavi" target="_blank" rel="noopener noreferrer" style={{ color: '#0054ff', textDecoration: 'none', fontSize: 14 }}>
          noteでフォローして最新情報を受け取る →
        </a>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {articles.map((a, i) => (
        <a key={i} href={a.link} target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', gap: 16, padding: 16, borderRadius: 8, border: '1px solid #e5e7eb', textDecoration: 'none', color: 'inherit' }}
        >
          {a.thumbnail && (
            <img src={a.thumbnail} alt="" style={{ width: 160, height: 100, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px', lineHeight: 1.5 }}>{a.title}</h2>
            <p style={{ fontSize: 13, color: '#666', margin: '0 0 8px', lineHeight: 1.6 }}>{a.description}</p>
            <time style={{ fontSize: 12, color: '#999' }}>{a.pubDate ? new Date(a.pubDate).toLocaleDateString('ja-JP') : ''}</time>
          </div>
        </a>
      ))}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <a href="https://note.com/aigennavi" target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-block', padding: '12px 32px', borderRadius: 8, background: '#1a1a1a', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
        >
          noteで全ての記事を読む →
        </a>
      </div>
    </div>
  );
}
