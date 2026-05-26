import AIToolComparator from '@/components/AIToolComparator';
import Header from '@/components/Header';
import BackToTop from '@/components/BackToTop';
import ToolsSidebar from '@/components/ToolsSidebar';
import PurposeSidebar from '@/components/PurposeSidebar';
import type { Tool } from '@/types/tool';
import toolsData from '@/data/tools.json';

export const metadata = {
  title: 'AI生成ツールナビ | AIGEN NAVI',
  description: '品質・コスト・速度の3軸でAI画像・動画生成ツールをリアルタイム比較。',
};

export default function Home() {
  const tools = toolsData as Tool[];
  return (
    <>
      <Header />
      <ToolsSidebar />
      <PurposeSidebar />
      <main className="main-area">
        <div id="diagnosis" style={{ maxWidth: 620, margin: '0 auto', padding: '40px 20px 80px' }}>
          <AIToolComparator tools={tools} />
        </div>
        <footer style={{ borderTop: '1px solid var(--color-border)', padding: '32px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
            © 2026 AIGEN NAVI — 料金情報は各公式サイトでご確認ください
          </p>
        </footer>
      </main>
      <BackToTop />
    </>
  );
}
