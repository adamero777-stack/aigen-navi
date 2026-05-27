import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://aigen-navi.jp'),
  title: {
    default: 'AI生成ツールナビ | AIGEN NAVI - 最適なAI画像・動画生成ツールが見つかる',
    template: '%s | AIGEN NAVI',
  },
  description: '3つの質問であなたにぴったりのAI画像・動画生成ツールが見つかる。Midjourney、ChatGPT、Flux、Kling、Runway、Veoなど主要12ツールを品質・コスト・速度で徹底比較。',
  keywords: ['AI画像生成', 'AI動画生成', 'AIツール比較', 'Midjourney', 'ChatGPT画像生成', 'Stable Diffusion', 'Flux', 'Kling AI', 'Runway', 'Google Veo', 'Adobe Firefly', 'Canva'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://aigen-navi.jp',
    siteName: 'AIGEN NAVI',
    title: 'AI生成ツールナビ | AIGEN NAVI',
    description: '3つの質問で最適なAI画像・動画生成ツールが見つかる。主要12ツールを徹底比較。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI生成ツールナビ | AIGEN NAVI',
    description: '3つの質問で最適なAI画像・動画生成ツールが見つかる。主要12ツールを徹底比較。',
  },
  alternates: {
    canonical: 'https://aigen-navi.jp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AIGEN NAVI',
  url: 'https://aigen-navi.jp',
  description: '3つの質問で最適なAI画像・動画生成ツールが見つかる比較サイト',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://aigen-navi.jp/tools',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
