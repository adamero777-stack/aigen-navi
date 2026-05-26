import Link from 'next/link';
import Header from '@/components/Header';
import BackToTop from '@/components/BackToTop';
import ToolsSidebar from '@/components/ToolsSidebar';
import PurposeSidebar from '@/components/PurposeSidebar';
import type { Tool } from '@/types/tool';
import toolsData from '@/data/tools.json';

const tools = toolsData as Tool[];

export const metadata = {
  title: 'AIツール一覧 | AIGEN NAVI',
  description: '画像・動画AI生成ツール全12種類の一覧。料金、特徴、おすすめ用途を一目で比較。',
};

const categories = [
  { label: '🎬 動画生成AI', filter: (t: Tool) => t.type === 'video' },
  { label: '📷 画像生成AI', filter: (t: Tool) => t.type === 'static' },
  { label: '📷🎬 画像・動画 両対応', filter: (t: Tool) => t.type === 'both' },
];

export default function ToolsListPage() {
  return (
    <>
      <Header />
      <ToolsSidebar />
      <PurposeSidebar />
      <main className="main-area">
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '40px 20px 80px' }}>
          <Link href="/" style={{ fontSize: 14, color: 'var(--color-text-muted)', textDecoration: 'none' }}>← トップへ戻る</Link>
          <h1 style={{ fontSize: 28, marginTop: 20, marginBottom: 8 }}>AIツール一覧</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
            画像・動画AI生成ツールを種類別に紹介。詳細ページで使い方・料金・紹介動画もチェックできます。
          </p>

          {categories.map(cat => {
            const items = tools.filter(cat.filter);
            if (items.length === 0) return null;
            return (
              <section key={cat.label} style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 20, marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid #0054ff' }}>{cat.label}</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  {items.map(t => (
                    <div key={t.id} style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: 18, margin: 0 }}>{t.name}</h3>
                        <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{t.monthlyPrice}</span>
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 12, lineHeight: 1.6 }}>{t.description}</p>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                        <Link href={`/tools/${t.id}`} className="btn-accent" style={{ background: '#facc15', color: '#000', fontSize: 13, padding: '6px 12px' }}>
                          詳しい情報を見る →
                        </Link>
                        {(t.affiliateUrl || t.websiteUrl) && (
                          <a href={t.affiliateUrl || t.websiteUrl} target="_blank" rel={t.affiliateUrl ? 'sponsored noopener noreferrer' : 'noopener noreferrer'} style={{ fontSize: 13, color: '#0054ff', textDecoration: 'underline' }}>
                            {t.affiliateUrl ? '公式サイト（PR）' : '公式サイト'} →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <BackToTop />
    </>
  );
}
