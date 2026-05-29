export interface Artwork {
  id: string
  imageUri: string
  thumbnailUri?: string
  analysis: AnalysisResult | null
  tutorial: Tutorial | null
  practices: Practice[]
  createdAt: Date
  isFavorite: boolean
  tags: string[]
}

export interface AnalysisResult {
  id: string
  composition: CompositionAnalysis
  color: ColorAnalysis
  technique: TechniqueAnalysis
  style: StyleAnalysis
  lightShadow: LightShadowAnalysis
  overallSummary: string
}

export interface CompositionAnalysis {
  layoutType: string
  focalPoint: string
  spatialHierarchy: string
  negativeSpace: string
  details: string
}

export interface ColorAnalysis {
  primaryColors: string[]
  schemeType: string
  temperature: string
  saturation: string
  emotion: string
  details: string
}

export interface TechniqueAnalysis {
  medium: string
  brushStroke: string
  texture: string
  specialTechniques: string[]
  details: string
}

export interface StyleAnalysis {
  genre: string
  artistReference: string
  characteristics: string[]
  details: string
}

export interface LightShadowAnalysis {
  lightDirection: string
  contrast: string
  volume: string
  details: string
}

export interface Tutorial {
  id: string
  steps: TutorialStep[]
  materials: string[]
  tips: string[]
}

export interface TutorialStep {
  order: number
  title: string
  description: string
  keyPoints: string[]
  regionHint?: string
}

export interface Practice {
  id: string
  imageUri: string
  feedback: Feedback | null
  completedImprovements: string[]
  createdAt: Date
}

export interface Feedback {
  id: string
  strengths: string[]
  weaknesses: string[]
  suggestions: Suggestion[]
  overallRating: number
}

export interface Suggestion {
  area: string
  description: string
  priority: 'high' | 'medium' | 'low'
  isResolved: boolean
}

export interface AISettings {
  id: string
  model: 'openai' | 'claude' | 'gemini'
  language: string
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface ArtworkCreateRequest {
  imageUri: string
  thumbnailUri?: string
  tags?: string[]
}

export interface AnalysisRequest {
  imageBase64: string
  language?: string
}

export interface PracticeRequest {
  artworkId: string
  practiceImageBase64: string
  language?: string
}

export interface AISettingsUpdateRequest {
  model?: string
  openaiKey?: string
  claudeKey?: string
  geminiKey?: string
  language?: string
}