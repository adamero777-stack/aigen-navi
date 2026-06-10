export interface GuideSection {
  heading: string;
  body: string[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface Guide {
  id: string;
  name: string;
  title: string;        // SEOタイトル
  description: string;  // meta description
  category: string;
  developer: string;
  officialUrl: string;
  updatedAt: string;
  intro: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedToolIds: string[]; // data/tools.json のid
}

export const guides: Guide[] = [
  {
    id: 'claude',
    name: 'Claude（クロード）',
    title: 'Claudeとは？使い方・料金・できることを初心者向けに解説【2026年最新】',
    description:
      'Anthropic社のAI「Claude」の使い方・料金プラン・最新モデル（Fable 5）をわかりやすく解説。ChatGPTとの違いや、日本語での活用方法も紹介します。',
    category: '対話型AI・LLM',
    developer: 'Anthropic',
    officialUrl: 'https://claude.ai',
    updatedAt: '2026-06-10',
    intro:
      'Claude（クロード）は、米Anthropic（アンソロピック）社が開発する対話型AIです。文章作成・要約・プログラミング・画像読み取りなど幅広いタスクをこなし、特に自然な日本語と長文の処理能力に定評があります。2026年6月には最上位クラスの新モデル「Claude Fable 5」が一般公開され、注目度がさらに高まっています。',
    sections: [
      {
        heading: 'Claudeでできること',
        body: [
          '文章の作成・要約・翻訳・校正といったテキスト処理全般が得意です。ビジネスメールの下書きから、ブログ記事の構成案、長いPDF資料の要約まで、日本語で自然にこなします。',
          'プログラミング支援も強力で、コードの生成・修正・解説に対応。開発者向けには、ターミナルから操作できる「Claude Code」というエージェント型のコーディングツールも提供されています。',
          '画像のアップロードにも対応しており、グラフの読み取りや手書きメモのテキスト化、スクリーンショットの内容についての質問などが可能です。',
        ],
      },
      {
        heading: '料金プラン',
        body: [
          '無料プランでも主要な機能を試せます。ただし、利用回数（メッセージ数）に制限があり、混雑時は制限が厳しくなります。',
          '有料のProプランでは利用上限が大きく緩和され、最新・最上位のモデルや新機能への優先アクセスが得られます。さらに上位のMaxプランや、チーム向けプランも用意されています。',
          '本格的に使うなら、まず無料で試して、上限に不満を感じたらProに移行するのがおすすめの流れです。',
        ],
      },
      {
        heading: '最新モデル「Claude Fable 5」とは',
        body: [
          '2026年6月9日に公開された最新モデルです。これまで一部の企業にしか提供されていなかった最上位クラス（Mythosクラス)の性能を、安全対策（セーフガード）を組み込んだ形で一般ユーザーにも開放したのが最大の特徴です。',
          'コーディング・推論・長文処理など多くのベンチマークでトップ水準のスコアを記録しており、現在利用できるAIモデルの中でも最高クラスの性能とされています。',
        ],
      },
      {
        heading: '始め方（3ステップ）',
        body: [
          '① claude.ai にアクセスし、メールアドレスまたはGoogleアカウントで登録します。',
          '② 画面下の入力欄に、日本語でやりたいことをそのまま入力します（例：「この文章を要約して」）。',
          '③ ファイルや画像を添付したい場合は、入力欄のクリップアイコンからアップロードできます。スマホアプリ（iOS/Android）もあります。',
        ],
      },
    ],
    faqs: [
      {
        q: 'Claudeは無料で使えますか？',
        a: 'はい、無料プランがあります。メッセージ数に制限はありますが、主要機能を試すには十分です。ヘビーに使う場合は有料のProプランがおすすめです。',
      },
      {
        q: 'ChatGPTとの違いは何ですか？',
        a: 'どちらも高性能な対話型AIですが、Claudeは長文の読解・処理能力と、自然で丁寧な日本語の文章生成に強みがあるとされています。用途によって使い分けるのが現実的です。',
      },
      {
        q: '日本語に対応していますか？',
        a: 'はい、完全に日本語で利用できます。質問も回答も日本語でやり取りでき、精度も高水準です。',
      },
    ],
    relatedToolIds: ['getimg', 'suno'],
  },
  {
    id: 'codex',
    name: 'Codex（コーデックス）',
    title: 'OpenAI Codexとは？使い方・料金・Claude Codeとの違いを解説【2026年最新】',
    description:
      'OpenAIのAIコーディングエージェント「Codex」を初心者向けに解説。できること・料金・始め方・Claude Codeとの違いまで、2026年最新情報でまとめました。',
    category: 'AIコーディング',
    developer: 'OpenAI',
    officialUrl: 'https://openai.com/codex/',
    updatedAt: '2026-06-10',
    intro:
      'Codex（コーデックス）は、OpenAIが提供するAIコーディングエージェントです。「この機能を作って」「このバグを直して」と自然言語で指示するだけで、AIがコードの作成・修正・テストまで自律的に進めてくれます。ChatGPT上で動くクラウド版と、ターミナルで動くCLI版があります。',
    sections: [
      {
        heading: 'Codexでできること',
        body: [
          '自然言語の指示から、新機能の実装・バグ修正・コードレビュー・テスト作成などを自律的に実行します。複数のタスクを並行して任せることも可能です。',
          'GitHubリポジトリと連携でき、作業結果をプルリクエストとして提出させる、といった実際の開発フローに組み込んだ使い方ができます。',
          'クラウド版（ChatGPT内）はブラウザだけで使え、CLI版は自分のPCのターミナル上でローカルのコードを直接編集できます。',
        ],
      },
      {
        heading: '料金プラン',
        body: [
          'CodexはChatGPTの有料プラン（Plus以上）に含まれる形で提供されています。プランのグレードによって利用できる量が変わります。',
          '開発者向けには、APIキー経由で従量課金で使う方法もあります。まずはChatGPT Plusで試すのが手軽です。',
        ],
      },
      {
        heading: 'Claude Codeとの違い',
        body: [
          '同ジャンルの競合として、Anthropicの「Claude Code」があります。どちらも自然言語でコーディングを任せられるエージェント型ツールで、できることは近いです。',
          '一般に、普段ChatGPTを使っているならCodex、Claudeを使っているならClaude Codeと、メインで使うAIに合わせて選ぶのが分かりやすい基準です。両方を併用する開発者も増えています。',
        ],
      },
      {
        heading: '始め方（3ステップ）',
        body: [
          '① ChatGPTの有料プランに加入し、サイドバーまたはツール一覧から「Codex」を開きます。',
          '② GitHubアカウントを連携し、作業対象のリポジトリを選択します。',
          '③ 「○○の機能を追加して」のように日本語で指示すると、Codexが作業を開始します。完了後は差分（変更内容）を確認して反映するだけです。',
        ],
      },
    ],
    faqs: [
      {
        q: 'プログラミング初心者でも使えますか？',
        a: '使えますが、生成されたコードの良し悪しを判断するには基礎知識があった方が安全です。学習と並行して「動くものを作る」用途には非常に強力です。',
      },
      {
        q: '無料で使えますか？',
        a: 'Codex本体はChatGPTの有料プランに含まれる機能です。無料プランでは利用できないか、ごく限定的になります。',
      },
      {
        q: '日本語で指示できますか？',
        a: 'はい、日本語の指示で問題なく動作します。仕様の細かい指定も日本語でそのまま伝えられます。',
      },
    ],
    relatedToolIds: ['getimg'],
  },
  {
    id: 'google-ai-studio',
    name: 'Google AI Studio',
    title: 'Google AI Studioとは？無料での使い方・Geminiとの関係を解説【2026年最新】',
    description:
      'Google AI Studioの使い方を初心者向けに解説。無料でGeminiの最新モデルを試す方法、APIキーの取得、Geminiアプリとの違いまで2026年最新情報でまとめました。',
    category: 'AI開発ツール・LLM',
    developer: 'Google',
    officialUrl: 'https://aistudio.google.com',
    updatedAt: '2026-06-10',
    intro:
      'Google AI Studio（グーグルAIスタジオ）は、Googleの最新AIモデル「Gemini」シリーズをブラウザ上で無料で試せる開発者向けツールです。プロンプトの実験からAPIキーの取得まで、Geminiを使ったアプリ開発の入口がここに揃っています。開発者向けと言いつつ、登録すれば誰でも無料で最新モデルに触れられるのが大きな魅力です。',
    sections: [
      {
        heading: 'Google AI Studioでできること',
        body: [
          'Geminiの各モデル（高性能版・高速版など）をブラウザ上で切り替えながら試せます。一般向けのGeminiアプリより細かい設定（温度・システム指示・出力長など）を調整できるのが特徴です。',
          '画像・音声・動画の入力にも対応しており、マルチモーダルな実験が可能。画像生成や音声読み上げ系の機能を試せるモードもあります。',
          'アプリ開発用のAPIキーを無料で発行でき、試したプロンプトをそのままコード（Python/JavaScript等）として書き出せます。',
        ],
      },
      {
        heading: '料金：基本無料で使える',
        body: [
          'AI Studio上での利用は無料です。Googleアカウントがあればすぐに始められます。',
          'API経由で本格的に使う場合は、無料枠を超えた分が従量課金になります。個人の実験レベルなら無料枠内で十分収まることが多いです。',
        ],
      },
      {
        heading: 'Geminiアプリとの違い',
        body: [
          '一般向けの「Gemini」（gemini.google.com）は日常利用向けのチャットアプリ、AI Studioは開発・実験向けのツールという位置づけです。',
          '同じモデルでも、AI Studioの方が新機能やプレビュー版モデルにいち早く触れられる傾向があります。「Geminiの素の性能を細かく試したい」ならAI Studio一択です。',
        ],
      },
      {
        heading: '始め方（3ステップ）',
        body: [
          '① aistudio.google.com にアクセスし、Googleアカウントでログインします。',
          '② 画面右側でモデルを選び、プロンプトを入力して実行します（日本語OK）。',
          '③ アプリ開発に使う場合は「Get API key」からAPIキーを発行します。',
        ],
      },
    ],
    faqs: [
      {
        q: '本当に無料ですか？',
        a: 'AI Studio上での試用は無料です。APIを大量に使う場合のみ、無料枠を超えた分が課金対象になります。',
      },
      {
        q: 'プログラミング知識は必要ですか？',
        a: 'プロンプトを試すだけなら不要です。チャット感覚で使えます。APIを使ったアプリ開発をする段階で初めてコードの知識が必要になります。',
      },
      {
        q: '商用利用はできますか？',
        a: 'APIの利用規約の範囲内で商用利用が可能です。最新の規約はGoogleの公式ドキュメントで確認してください。',
      },
    ],
    relatedToolIds: ['getimg', 'soundraw'],
  },
];

export function getGuide(id: string): Guide | undefined {
  return guides.find((g) => g.id === id);
}
