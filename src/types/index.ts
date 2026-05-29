export interface Artwork {
  id: string;
  imageUri: string;
  thumbnailUri?: string;
  analysis: AnalysisResult | null;
  tutorial: Tutorial | null;
  practices: Practice[];
  createdAt: number;
  isFavorite: boolean;
  tags: string[];
}

export interface AnalysisResult {
  composition: CompositionAnalysis;
  color: ColorAnalysis;
  technique: TechniqueAnalysis;
  style: StyleAnalysis;
  lightShadow: LightShadowAnalysis;
  overallSummary: string;
}

export interface CompositionAnalysis {
  layoutType: string;
  focalPoint: string;
  spatialHierarchy: string;
  negativeSpace: string;
  details: string;
}

export interface ColorAnalysis {
  primaryColors: string[];
  schemeType: string;
  temperature: string;
  saturation: string;
  emotion: string;
  details: string;
}

export interface TechniqueAnalysis {
  medium: string;
  brushStroke: string;
  texture: string;
  specialTechniques: string[];
  details: string;
}

export interface StyleAnalysis {
  genre: string;
  artistReference: string;
  characteristics: string[];
  details: string;
}

export interface LightShadowAnalysis {
  lightDirection: string;
  contrast: string;
  volume: string;
  details: string;
}

export interface Tutorial {
  steps: TutorialStep[];
  materials: string[];
  tips: string[];
}

export interface TutorialStep {
  order: number;
  title: string;
  description: string;
  keyPoints: string[];
  regionHint?: string;
}

export interface Practice {
  id: string;
  imageUri: string;
  feedback: Feedback | null;
  completedImprovements: string[];
  createdAt: number;
}

export interface Feedback {
  strengths: string[];
  weaknesses: string[];
  suggestions: Suggestion[];
  overallRating: number;
}

export interface Suggestion {
  area: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  isResolved: boolean;
}

export interface AISettings {
  model: 'openai' | 'claude' | 'gemini';
  apiKeys: {
    openai: string;
    claude: string;
    gemini: string;
  };
  language: string;
}
