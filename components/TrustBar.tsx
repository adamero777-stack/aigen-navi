export default function TrustBar() {
  const items = [
    { icon: '🔍', num: '15', label: 'ツール比較' },
    { icon: '⚡', num: '30秒', label: 'で診断完了' },
    { icon: '📊', num: '3', label: 'カテゴリ対応' },
  ];
  return (
    <section style={{
      display: 'flex', justifyContent: 'center', gap: 36,
      padding: '24px 0',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
      marginBottom: 40,
    }}>
      {items.map(({ icon, num, label }) => (
        <div key={label} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20 }}>{icon}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-accent)', lineHeight: 1.3 }}>{num}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{label}</div>
        </div>
      ))}
    </section>
  );
}
