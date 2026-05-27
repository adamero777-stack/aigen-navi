import Header from '@/components/Header';
import BackToTop from '@/components/BackToTop';
import ToolsSidebar from '@/components/ToolsSidebar';
import PurposeSidebar from '@/components/PurposeSidebar';
import BlogList from './BlogList';

export const metadata = {
  title: 'ブログ - AI画像・動画生成の最新情報',
  description: 'AI画像・動画生成ツールの使い方、比較、最新ニュースをお届けするブログ。Midjourney、ChatGPT、Flux、Kling、Runwayなどの活用術。',
  alternates: { canonical: 'https://aigen-navi.jp/blog' },
};

async function fetchNoteArticles() {
  try {
    const res = await fetch('https://note.com/aigennavi/rss', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items: Array<{title:string;link:string;description:string;pubDate:string;thumbnail:string}> = [];
    const itemRegex = /<item>([\\s\\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
      const block = match[1];
      const get = (tag: string) => {
        const m = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
        return m ? (m[1] || m[2] || '').trim() : '';
      };
      const encMatch = block.match(/enclosure[^>]*url="([^"]+)"/);
      items.push({
        title: get('title'),
        link: get('link'),
        description: get('description').replace(/<[^>]*>/g, '').slice(0, 120),
        pubDate: get('pubDate'),
        thumbnail: encMatch ? encMatch[1] : '',
      });
    }
    return items;
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const articles = await fetchNoteArticles();
  return (
    <>
      <Header />
      <ToolsSidebar />
      <PurposeSidebar />
      <main className="main-area">
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '40px 20px 80px' }}>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>ブログ</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
            AI画像・動画生成ツールの使い方や最新情報をお届けします。
          </p>
          <BlogList articles={articles} />
        </div>
      </main>
      <BackToTop />
    </>
  );
}
