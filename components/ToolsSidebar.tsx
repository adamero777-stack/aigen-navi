import Link from 'next/link';
import type { Tool } from '@/types/tool';
import toolsData from '@/data/tools.json';

const tools = toolsData as Tool[];

const categories = [
  { label: '🎬 動画', filter: (t: Tool) => t.type === 'video' },
  { label: '📷 画像', filter: (t: Tool) => t.type === 'static' },
  { label: '📷🎬 どちらも', filter: (t: Tool) => t.type === 'both' },
];

export default function ToolsSidebar() {
  return (
    <aside className="tools-sidebar">
      <h2 style={{ fontSize: 12, fontWeight: 700, color: '#999', letterSpacing: '0.05em', marginBottom: 16, marginTop: 0 }}>ツール一覧</h2>
      {categories.map(cat => {
        const items = tools.filter(cat.filter);
        return (
          <div key={cat.label} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8, paddingBottom: 4, borderBottom: '1px solid #e5e7eb' }}>{cat.label}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {items.map(t => (
                <li key={t.id} style={{ marginBottom: 2 }}>
                  <Link href={`/tools/${t.id}`} className="sidebar-link">{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </aside>
  );
}
