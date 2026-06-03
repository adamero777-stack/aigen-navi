'use client';
import { useState, useEffect } from 'react';

interface Article { title: string; link: string; pubDate: string; thumbnail: string; }

export default function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/rss')
      .then(r => r.text())
      .then(xml => {
        const items: Article[] = [];
        const re = /<item>([\s\S]*?)<\/item>/g;
        let m;
        while ((m = re.exec(xml)) !== null) {
          const b = m[1];
          const g = (tag: string) => {
            const x = b.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${tag}>`));
            return x ? (x[1] || x[2] || '').trim() : '';
          };
          const th = b.match(/<media:thumbnail[^>]*>([^<]+)<\/media:thumbnail>/);
          items.push({ title: g('title'), link: g('link'), pubDate: g('pubDate'), thumbnail: th ? th[1].trim() : '' });
        }
        setArticles(items.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  if (articles.length === 0) return null;

  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: 'var(--color-text)' }}>最新のAI生成ガイド</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {articles.map((a, i) => (
          <a key={i} href={a.link} target="_blank" rel="noopener noreferrer"
            style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--color-border)', textDecoration: 'none', color: 'inherit', background: '#fff' }}>
            {a.thumbnail && <img src={a.thumbnail} alt="" style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} />}
            <div style={{ padding: '10px 12px' }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.5, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{a.title}</h3>
              <time style={{ fontSize: 11, color: '#999', display: 'block', marginTop: 6 }}>
                {a.pubDate ? new Date(a.pubDate).toLocaleDateString('ja-JP') : ''}
              </time>
            </div>
          </a>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 14 }}>
        <a href="/blog" style={{ fontSize: 14, color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>すべての記事を読む →</a>
      </div>
    </section>
  );
}
