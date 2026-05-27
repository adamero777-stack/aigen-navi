'use client';

import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'ツール診断', href: '/#diagnosis' },
  { label: 'ツール一覧', href: '/tools' },
  { label: '解説動画', href: '/videos' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,0.95)' : '#fff',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
      transition: 'all 0.2s',
    }}>
      <div style={{
        maxWidth: 820,
        margin: '0 auto',
        padding: '0 20px',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* 左：ロゴ */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/logo.png"
            alt="AIGEN NAVI"
            style={{ height: 36, objectFit: 'contain' }}
          />
        </a>

        {/* 右：ナビリンク */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
