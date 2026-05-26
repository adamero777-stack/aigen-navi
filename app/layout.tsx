import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI生成ツールナビ | AIGEN NAVI',
  description: 'あなたの優先度に合わせて最適なAI生成ツールを見つけましょう',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
