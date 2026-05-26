import Link from 'next/link';

const purposes = [
  { icon: '📱', label: 'SNS投稿用', href: '/purpose/sns' },
  { icon: '📺', label: 'YouTube用', href: '/purpose/youtube' },
  { icon: '📝', label: 'ブログ用', href: '/purpose/blog' },
  { icon: '🎯', label: '広告用', href: '/purpose/ad' },
  { icon: '💼', label: 'ビジネス用', href: '/purpose/business' },
  { icon: '🎬', label: 'プロ映像用', href: '/purpose/pro-video' },
  { icon: '📲', label: 'ショート動画', href: '/purpose/short' },
  { icon: '🎓', label: '教育・解説', href: '/purpose/education' },
  { icon: '🎨', label: 'アート・趣味', href: '/purpose/hobby' },
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
    </aside>
  );
}
