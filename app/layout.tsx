import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aigen-navi.jp'),
  title: {
    default: 'AI生成ツールナビ | AIGEN NAVI - 最適なAI画像・動画生成ツールが見つかる',
    template: '%s | AIGEN NAVI',
  },
  description: '3つの質問であなたにぴったりのAI画像・動画・音楽生成ツールが見つかる。Midjourney、ChatGPT、Flux、Kling、Runway、Veoなど主要12ツールを品質・コスト・速度で徹底比較。',
  keywords: ['AI画像生成', 'AI動画生成', 'AIツール比較', 'Midjourney', 'ChatGPT画像生成', 'Stable Diffusion', 'Flux', 'Kling AI', 'Runway', 'Google Veo', 'Adobe Firefly', 'Canva'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://aigen-navi.jp',
    siteName: 'AIGEN NAVI',
    title: 'AI生成ツールナビ | AIGEN NAVI',
    description: '3つの質問で最適なAI画像・動画生成ツールが見つかる。主要15ツールを徹底比較。',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AIGEN NAVI - AI生成ツールナビ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI生成ツールナビ | AIGEN NAVI',
    description: '3つの質問で最適なAI画像・動画生成ツールが見つかる。主要15ツールを徹底比較。',
  },
  alternates: {
    canonical: 'https://aigen-navi.jp',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
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
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XLPL7Z5M2V"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XLPL7Z5M2V');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
