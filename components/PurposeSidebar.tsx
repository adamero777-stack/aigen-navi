import Link from 'next/link';
import Image from 'next/image';

const purposes = [
  { icon: '📱', label: 'SNS投稿用', href: '/purpose/sns' },
  { icon: '📺', label: 'YouTube用', href: '/purpose/youtube' },
  { icon: '📝', label: 'ブログ用', href: '/purpose/blog' },
  { icon: '🎯', label: '広告用', href: '/purpose/ad' },
  { icon: '💼', label: 'ビジネス用', href: '/purpose/business' },
  { icon: '🎬', label: 'プロ映像用', href: '/purpose/pro-video' },
  { icon: '📲', label: 'ショート動画', href: '/purpose/short' },
  { icon: '🎵', label: '音楽・BGM', href: '/purpose/music' },
  { icon: '🎓', label: '教育・解説', href: '/purpose/education' },
  { icon: '🎨', label: 'アート・趣味', href: '/purpose/hobby' },
];

const popularVideos = [
  { id: '38pRtUOybr8', title: 'Midjourney完全ガイド' },
  { id: 'J8n0RAcG-JA', title: 'ChatGPT画像生成活用事例' },
  { id: 'SFLLwpTxD_Q', title: 'KlingAI 3.0新機能' },
  { id: 'dKFOE_aeJkI', title: 'Suno AI使い方' },
];

export default function PurposeSidebar() {
  return (
    <aside className="purpose-sidebar">
      <h2 style={{ fontSize: 12, fontWeight: 700, color: '#999', letterSpacing: '0.05em', marginBottom: 16, marginTop: 0 }}>目的から探す</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {purposes.map(p => (
          <li key={p.href} style={{ marginBottom: 2 }}>
            <Link href={p.href} className="sidebar-link">{p.icon} {p.label}</Link>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 28, paddingTop: 16, borderTop: '1px solid #e5e7eb' }}>
        <Link href="/videos" style={{ display: 'block', padding: '10px 12px', background: '#0054ff', color: '#fff', borderRadius: 6, textDecoration: 'none', fontSize: 13, fontWeight: 600, textAlign: 'center' }}>
          🎬 解説動画を見る
        </Link>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: '0.05em', marginBottom: 10 }}>人気の動画</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {popularVideos.map(v => (
            <Link key={v.id} href="/videos" style={{ display: 'block', borderRadius: 6, overflow: 'hidden', textDecoration: 'none' }}>
              <Image
                src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                alt={v.title}
                width={320}
                height={180}
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 6 }}
              />
              <span style={{ fontSize: 11, color: '#333', lineHeight: 1.4, display: 'block', marginTop: 4 }}>{v.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
