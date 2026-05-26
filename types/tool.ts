export interface Tool {
  id: string;
  name: string;
  type: 'static' | 'video' | 'both';
  category: 'major' | 'affiliate';
  qualityScore: number;
  costScore: number;
  speedScore: number;
  monthlyPrice: string;
  imageQuality?: string;
  generationTime: string;
  features: string[];
  bestFor: string;
  description?: string;
  websiteUrl?: string;
  affiliateUrl?: string;
  freeTrialAvailable?: boolean;
  supportLevel?: 'community' | 'email' | 'priority';
  alternativeTools?: string[];
  youtubeVideos?: string[];
  pros?: string[];
  cons?: string[];
  recommendedFor?: string[];
  detailedPricing?: string;
  comparison?: string;
}

export interface ComparedResult {
  tool: Tool;
  score: number;
  rank: number;
  matchPercentage: number;
}

export interface UserPreferences {
  quality: number;
  cost: number;
  speed: number;
}
