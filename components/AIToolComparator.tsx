'use client';

import React, { useState, useMemo } from 'react';
import type { Tool } from '@/types/tool';

type MediaType = 'static' | 'video' | 'both';
type Purpose = 'sns' | 'ad' | 'youtube' | 'blog' | 'business' | 'hobby' | 'short' | 'pro-video' | 'education';
type Priority = 'ease' | 'cost' | 'quality';

interface Props { tools: Tool[]; }

const LOGO_MAP: Record<string, string> = {
  midjourney:         'https://logo.clearbit.com/midjourney.com',
  'dall-e3':          'https://logo.clearbit.com/openai.com',
  'stable-diffusion': 'https://logo.clearbit.com/stability.ai',
  runway:             'https://logo.clearbit.com/runwayml.com',
  descript:           'https://logo.clearbit.com/descript.com',
  'adobe-firefly':    'https://logo.clearbit.com/adobe.com',
  genmo:              'https://logo.clearbit.com/genmo.ai',
  'canva-pro':        'https://logo.clearbit.com/canva.com',
};

const PURPOSES_IMAGE = [
  { key: 'sns' as Purpose, icon: '📱', label: 'SNS投稿・バナー', desc: 'Instagram、X、広告バナー等' },
  { key: 'blog' as Purpose, icon: '📝', label: 'ブログ・記事の挿絵', desc: 'アイキャッチ、記事内画像' },
  { key: 'ad' as Purpose, icon: '🎯', label: '広告・マーケティング', desc: 'LP素材、バナー広告等' },
  { key: 'business' as Purpose, icon: '💼', label: 'プレゼン・資料', desc: 'ビジネス用途の画像' },
  { key: 'hobby' as Purpose, icon: '🎨', label: 'アート・個人制作', desc: '趣味、ポートフォリオ' },
];

const PURPOSES_VIDEO = [
  { key: 'youtube' as Purpose, icon: '📺', label: 'YouTube・配信', desc: '動画コンテンツ制作' },
  { key: 'short' as Purpose, icon: '📱', label: 'ショート動画', desc: 'TikTok、Reels、Shorts' },
  { key: 'pro-video' as Purpose, icon: '🎬', label: 'プロ映像・CM', desc: '商用映像制作' },
  { key: 'education' as Purpose, icon: '🎓', label: '教育・解説', desc: 'チュートリアル、研修用' },
  { key: 'hobby' as Purpose, icon: '🎮', label: '趣味・実験', desc: '個人プロジェクト' },
];

const PRIORITIES = [
  { key: 'ease' as Priority, icon: '⚡', label: 'とにかく手軽に', desc: '初心者でもすぐ使える' },
  { key: 'cost' as Priority, icon: '💰', label: 'コスパ重視', desc: '安く・無料で済ませたい' },
  { key: 'quality' as Priority, icon: '✨', label: 'クオリティ最優先', desc: 'プロ品質にこだわる' },
];

const TOOL_TAGS: Record<string, { purposes: Purpose[]; priority: Record<Priority, number> }> = {
  midjourney:         { purposes: ['sns','ad','hobby','blog','business'], priority: { quality: 10, cost: 5, ease: 6 } },
  'dall-e3':          { purposes: ['sns','blog','ad','business','hobby'], priority: { quality: 8, cost: 7, ease: 9 } },
  'stable-diffusion': { purposes: ['hobby','blog','ad','sns'],           priority: { quality: 6, cost: 10, ease: 4 } },
  runway:             { purposes: ['pro-video','youtube','ad','short'],   priority: { quality: 10, cost: 5, ease: 6 } },
  descript:           { purposes: ['youtube','education','short'],        priority: { quality: 7, cost: 8, ease: 10 } },
  'adobe-firefly':    { purposes: ['ad','business','blog','sns'],        priority: { quality: 8, cost: 6, ease: 8 } },
  genmo:              { purposes: ['short','hobby','youtube','education'],priority: { quality: 7, cost: 9, ease: 9 } },
  'canva-pro':        { purposes: ['sns','blog','business','ad'],        priority: { quality: 6, cost: 7, ease: 10 } },
};

const WHY_TEXT: Record<string, Record<string, string>> = {
  midjourney:         { ease: 'Discordから手軽にプロ品質の画像を生成', cost: 'プラン内なら大量生成が可能', quality: '現時点で最高峰の画像品質。アート性が際立つ' },
  'dall-e3':          { ease: 'ChatGPTから日本語で指示するだけ。最も簡単', cost: 'ChatGPT Plus内で追加料金なし', quality: 'テキスト理解力が高く、意図通りの画像を生成' },
  'stable-diffusion': { ease: 'WebUIで無料利用可能', cost: '完全無料でローカル実行可能。コスト最強', quality: 'カスタムモデルで独自の品質を追求できる' },
  runway:             { ease: 'ブラウザ上で直感的に操作可能', cost: '無料枠あり。プロ機能は有料', quality: 'AI動画生成のトップクラス。映像プロ御用達' },
  descript:           { ease: 'テキスト編集感覚で動画を編集。最も直感的', cost: '月$12〜で動画編集が完結', quality: '文字起こし精度が高く、効率的な編集が可能' },
  'adobe-firefly':    { ease: 'Photoshop・Expressと連携。Adobe慣れなら最速', cost: '月$4.99〜と安い。CC統合で追加コスト不要', quality: 'Adobe品質。著作権的にも安心して商用利用可能' },
  genmo:              { ease: 'ブラウザで即座に動画生成。学習コストゼロ', cost: '無料プランが充実。気軽に試せる', quality: 'テンプレートが豊富で安定した品質' },
  'canva-pro':        { ease: 'テンプレート選んで編集するだけ。デザイン知識不要', cost: 'AI機能込みで年$180。オールインワン', quality: 'テンプレートベースで一定品質を担保' },
};

export default function AIToolComparator({ tools }: Props) {
  const [step, setStep] = useState(0);
  const [media, setMedia] = useState<MediaType | null>(null);
  const [purpose, setPurpose] = useState<Purpose | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);

  const results = useMemo(() => {
    if (!media || !purpose || !priority) return [];
    return tools
      .filter(t => media === 'both' || t.type === media)
      .map(t => {
        const tags = TOOL_TAGS[t.id];
        if (!tags) return { tool: t, score: 0 };
        const purposeMatch = tags.purposes.includes(purpose) ? (tags.purposes.length - tags.purposes.indexOf(purpose)) * 10 : 0;
        const priorityScore = tags.priority[priority] * 8;
        return { tool: t, score: purposeMatch + priorityScore };
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [media, purpose, priority, tools]);

  const selectMedia = (m: MediaType) => { setMedia(m); setPurpose(null); setPriority(null); setStep(1); };
  const selectPurpose = (p: Purpose) => { setPurpose(p); setPriority(null); setStep(2); };
  const selectPriority = (p: Priority) => { setPriority(p); setStep(3); };
  const reset = () => { setStep(0); setMedia(null); setPurpose(null); setPriority(null); };
  const goBack = () => {
    if (step === 3) { setPriority(null); setStep(2); }
    else if (step === 2) { setPurpose(null); setStep(1); }
    else if (step === 1) { setMedia(null); setStep(0); }
  };

  const purposes = media === 'video' ? PURPOSES_VIDEO : media === 'static' ? PURPOSES_IMAGE : [...PURPOSES_IMAGE, ...PURPOSES_VIDEO];

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>

      {/* ヘッダー */}
      <header className="anim-fade-up" style={{ textAlign: 'center', marginBottom: 48, paddingTop: 12 }}>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, lineHeight: 1.3, color: 'var(--color-text)', marginBottom: 14 }}>
          3つの質問で見つかる<br />
          <span style={{ color: 'var(--color-accent)' }}>最適なAI生成ツール</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
          用途とこだわりを選ぶだけ。あなたにぴったりのツールを提案します
        </p>
      </header>

      {/* プログレス */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 40 }}>
        {[0,1,2,3].map(i => (
          <div key={i} className={`progress-dot ${step === i ? 'active' : step > i ? 'done' : ''}`} />
        ))}
      </div>

      {/* STEP 0 */}
      {step === 0 && (
        <StepWrap title="何を作りたい？" sub="Step 1 / 3">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {([
              { key: 'static' as MediaType, icon: '🖼️', label: '画像' },
              { key: 'video' as MediaType, icon: '🎬', label: '動画' },
              { key: 'both' as MediaType, icon: '🎨', label: 'どちらも' },
            ]).map((m, i) => (
              <div key={m.key} className={`select-card anim-scale-in d${i+1}`} onClick={() => selectMedia(m.key)}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{m.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </StepWrap>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <StepWrap title="主な用途は？" sub="Step 2 / 3" onBack={goBack}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
            {purposes.map((p, i) => (
              <div key={p.key} className={`select-card anim-scale-in d${Math.min(i+1,6)}`} onClick={() => selectPurpose(p.key)}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{p.label}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </StepWrap>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <StepWrap title="一番大事なのは？" sub="Step 3 / 3" onBack={goBack}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {PRIORITIES.map((p, i) => (
              <div key={p.key} className={`select-card anim-scale-in d${i+1}`} onClick={() => selectPriority(p.key)}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{p.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{p.label}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </StepWrap>
      )}

      {/* STEP 3: 結果 */}
      {step === 3 && results.length > 0 && (
        <div className="anim-fade-up">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
            <span className="tag tag-blue">{media === 'static' ? '🖼️ 画像' : media === 'video' ? '🎬 動画' : '🎨 両方'}</span>
            <span className="tag tag-blue">{[...PURPOSES_IMAGE,...PURPOSES_VIDEO].find(p => p.key === purpose)?.label}</span>
            <span className="tag tag-blue">{PRIORITIES.find(p => p.key === priority)?.label}</span>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>あなたへのおすすめ</h2>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 32 }}>選択内容に基づいたランキング</p>

          <div style={{ display: 'grid', gap: 14 }}>
            {results.map((r, i) => {
              const why = WHY_TEXT[r.tool.id]?.[priority!] || r.tool.bestFor;
              const logoUrl = LOGO_MAP[r.tool.id];
              return (
                <div key={r.tool.id} className={`result-card anim-fade-up d${Math.min(i+1,6)} ${i === 0 ? 'is-best' : ''}`} style={{ padding: 24 }}>

                  {/* ヘッダー行 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    {/* ランクバッジ */}
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: i <= 2 ? 18 : 13, fontWeight: 700, flexShrink: 0,
                      background: i === 0 ? 'var(--color-accent)' : i === 1 ? '#94a3b8' : i === 2 ? '#c2884d' : '#e2e8f0',
                      color: i <= 2 ? '#fff' : 'var(--color-text-muted)',
                    }}>
                      {i <= 2 ? ['🥇','🥈','🥉'][i] : i + 1}
                    </div>

                    {/* ロゴ */}
                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt={r.tool.name}
                        width={36}
                        height={36}
                        style={{
                          borderRadius: 8,
                          objectFit: 'contain',
                          flexShrink: 0,
                          background: '#fff',
                          border: '1px solid var(--color-border)',
                        }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}

                    {/* 名前・価格 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                        <span style={{ fontSize: 17, fontWeight: 700 }}>{r.tool.name}</span>
                        <span style={{
                          fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const,
                          padding: '3px 8px', borderRadius: 999,
                          background: r.tool.type === 'static' ? 'rgba(37,99,235,0.08)' : 'rgba(124,58,237,0.08)',
                          color: r.tool.type === 'static' ? '#2563eb' : '#7c3aed',
                        }}>
                          {r.tool.type === 'static' ? 'Image' : 'Video'}
                        </span>
                      </div>
                      <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{r.tool.monthlyPrice}</span>
                    </div>
                  </div>

                  {/* おすすめ理由 */}
                  <div style={{
                    padding: '12px 16px', marginBottom: 16,
                    background: i === 0 ? 'rgba(37,99,235,0.06)' : '#fff',
                    borderLeft: `3px solid ${i === 0 ? 'var(--color-accent)' : '#cbd5e1'}`,
                  }}>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                      {why}
                    </p>
                  </div>

                  {/* 詳細 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, marginBottom: 14 }}>
                    <MiniCell label="生成速度" value={r.tool.generationTime} />
                    {r.tool.imageQuality && <MiniCell label="画質" value={r.tool.imageQuality} />}
                    <MiniCell label="サポート" value={
                      r.tool.supportLevel === 'priority' ? '優先対応' : r.tool.supportLevel === 'email' ? 'メール' : 'コミュニティ'
                    } />
                  </div>

                  {/* 機能タグ */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {r.tool.features.slice(0, 4).map((f, fi) => (
                      <span key={fi} className="tag">{f}</span>
                    ))}
                  </div>

                  {/* CTA */}
                  {r.tool.websiteUrl && (
                    <a href={r.tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-accent">
                      公式サイトを見る
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32 }}>
            <button className="btn-ghost" onClick={goBack}>← 条件を変える</button>
            <button className="btn-ghost" onClick={reset}>最初からやり直す</button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepWrap({ title, sub, onBack, children }: {
  title: string; sub: string; onBack?: () => void; children: React.ReactNode;
}) {
  return (
    <div className="anim-fade-up">
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-accent)', marginBottom: 8 }}>{sub}</p>
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>{title}</h2>
      </div>
      {children}
      {onBack && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button className="btn-ghost" onClick={onBack}>← 戻る</button>
        </div>
      )}
    </div>
  );
}

function MiniCell({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: '10px 12px', background: '#fff', borderRadius: 10, border: '1px solid #b0d4f1' }}>
      <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' as const, marginBottom: 3 }}>{label}</p>
      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{value}</p>
    </div>
  );
}
