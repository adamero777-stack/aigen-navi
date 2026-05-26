export type Purpose = 'sns' | 'ad' | 'youtube' | 'blog' | 'business' | 'hobby' | 'short' | 'pro-video' | 'education';
export type Priority = 'ease' | 'cost' | 'quality';

export const TOOL_TAGS: Record<string, { purposes: Purpose[]; priority: Record<Priority, number> }> = {
  midjourney:         { purposes: ['sns','ad','hobby','blog','business'], priority: { quality: 10, cost: 5, ease: 6 } },
  'chatgpt-image':    { purposes: ['sns','blog','ad','business','hobby'], priority: { quality: 8, cost: 7, ease: 10 } },
  'stable-diffusion': { purposes: ['hobby','blog','ad','sns'],            priority: { quality: 6, cost: 10, ease: 4 } },
  flux:               { purposes: ['ad','blog','business','hobby'],       priority: { quality: 10, cost: 7, ease: 5 } },
  kling:              { purposes: ['short','youtube','pro-video','hobby'],priority: { quality: 9, cost: 7, ease: 7 } },
  runway:             { purposes: ['pro-video','youtube','ad','short'],   priority: { quality: 10, cost: 5, ease: 6 } },
  veo:                { purposes: ['pro-video','ad','youtube'],           priority: { quality: 10, cost: 4, ease: 7 } },
  'adobe-firefly':    { purposes: ['ad','business','blog','sns'],         priority: { quality: 8, cost: 6, ease: 8 } },
  'canva-pro':        { purposes: ['sns','blog','business','ad'],         priority: { quality: 6, cost: 7, ease: 10 } },
  envato:             { purposes: ['ad','business','blog','sns','hobby'], priority: { quality: 8, cost: 7, ease: 9 } },
  'getimg-ai':        { purposes: ['sns','ad','blog','hobby','short'],    priority: { quality: 8, cost: 9, ease: 9 } },
  pixeldojo:          { purposes: ['sns','hobby','blog','short'],         priority: { quality: 8, cost: 8, ease: 8 } },
};

export const PURPOSE_LABELS: Record<Purpose, { icon: string; title: string; description: string }> = {
  sns:         { icon: '📱', title: 'SNS投稿用', description: 'Instagram、X、TikTokなど。インパクトと回転率を重視したツール' },
  ad:          { icon: '🎯', title: '広告・マーケティング用', description: 'LP素材、バナー広告。商用利用OKで品質安定のツール' },
  youtube:     { icon: '📺', title: 'YouTube用', description: '動画コンテンツ。サムネイル、本編、エフェクトに対応' },
  blog:        { icon: '📝', title: 'ブログ・記事用', description: 'アイキャッチ、記事内画像。読者の目を引く一枚を生成' },
  business:    { icon: '💼', title: 'ビジネス・資料用', description: 'プレゼン資料、提案書。クリーンで伝わるビジュアル向き' },
  hobby:       { icon: '🎨', title: 'アート・趣味用', description: '個人制作、ポートフォリオ。表現力に振り切ったツール' },
  short:       { icon: '📲', title: 'ショート動画用', description: 'TikTok、Reels、Shorts。短尺高密度コンテンツ向け' },
  'pro-video': { icon: '🎬', title: 'プロ映像・CM用', description: '商用映像制作。最高品質と細かい制御が必須なシーン' },
  education:   { icon: '🎓', title: '教育・解説用', description: 'チュートリアル、研修教材。理解しやすい構成を作るツール' },
};
