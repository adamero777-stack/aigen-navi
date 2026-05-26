export interface Tool {
  id: string;
  name: string;
  type: 'static' | 'video' | 'both';
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
  freeTrialAvailable?: boolean;
  supportLevel?: 'community' | 'email' | 'priority';
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
