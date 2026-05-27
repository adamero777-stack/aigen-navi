import Header from '@/components/Header';
import BackToTop from '@/components/BackToTop';
import ToolsSidebar from '@/components/ToolsSidebar';
import PurposeSidebar from '@/components/PurposeSidebar';
import VideoGrid from './VideoGrid';
import videosData from '@/data/videos.json';

export const metadata = {
  title: '最新AI解説動画 | AIGEN NAVI',
  description: '画像・動画AI生成ツールの使い方・比較・最新情報を動画で学べます。',
};

export default function VideosPage() {
  return (
    <>
      <Header />
      <ToolsSidebar />
      <PurposeSidebar />
      <main className="main-area">
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '40px 20px 80px' }}>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>最新AI解説動画</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
            画像・動画AI生成ツールの使い方や最新情報を動画で学べます。サムネイルをクリックすると再生できます。
          </p>
          <VideoGrid videos={videosData} />
        </div>
      </main>
      <BackToTop />
    </>
  );
}
