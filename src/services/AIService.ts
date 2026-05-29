import { AnalysisResult, Tutorial, Feedback } from '../types';

export interface AIService {
  analyzeArtwork(imageBase64: string, language: string): Promise<AnalysisResult>;
  generateTutorial(analysis: AnalysisResult, language: string): Promise<Tutorial>;
  comparePractice(originalImageBase64: string, practiceImageBase64: string, language: string): Promise<Feedback>;
}

export abstract class BaseAdapter implements AIService {
  protected apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  abstract analyzeArtwork(imageBase64: string, language: string): Promise<AnalysisResult>;
  abstract generateTutorial(analysis: AnalysisResult, language: string): Promise<Tutorial>;
  abstract comparePractice(originalImageBase64: string, practiceImageBase64: string, language: string): Promise<Feedback>;

  protected getLanguagePrompt(language: string): string {
    const langMap: Record<string, string> = {
      'zh': '中文',
      'en': 'English',
      'ja': '日本語',
      'ko': '한국어',
    };
    return langMap[language] || '中文';
  }
}

export class OpenAIAdapter extends BaseAdapter {
  async analyzeArtwork(imageBase64: string, language: string): Promise<AnalysisResult> {
    const prompt = `你是一位专业的艺术评论家。请从以下维度分析这幅画作，并以JSON格式返回结果，语言使用${this.getLanguagePrompt(language)}：

{
  "composition": {
    "layoutType": "布局类型（如三分法、黄金分割等）",
    "focalPoint": "视觉重心",
    "spatialHierarchy": "空间层次",
    "negativeSpace": "正负空间运用",
    "details": "详细分析"
  },
  "color": {
    "primaryColors": ["主色调1", "主色调2"],
    "schemeType": "配色方案类型",
    "temperature": "色彩冷暖",
    "saturation": "饱和度分析",
    "emotion": "色彩情感",
    "details": "详细分析"
  },
  "technique": {
    "medium": "绘画媒介（油画/水彩/素描等）",
    "brushStroke": "笔触特征",
    "texture": "肌理效果",
    "specialTechniques": ["特殊技法1", "特殊技法2"],
    "details": "详细分析"
  },
  "style": {
    "genre": "艺术流派",
    "artistReference": "参考艺术家",
    "characteristics": ["风格特征1", "风格特征2"],
    "details": "详细分析"
  },
  "lightShadow": {
    "lightDirection": "光源方向",
    "contrast": "明暗对比",
    "volume": "体积感塑造",
    "details": "详细分析"
  },
  "overallSummary": "总体评价"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
            ]
          }
        ],
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  }

  async generateTutorial(analysis: AnalysisResult, language: string): Promise<Tutorial> {
    const prompt = `基于以下画作分析，生成一份分步骤绘画教程，语言使用${this.getLanguagePrompt(language)}，返回JSON格式：

分析结果：${JSON.stringify(analysis)}

{
  "materials": ["材料1", "材料2"],
  "tips": ["提示1", "提示2"],
  "steps": [
    {
      "order": 1,
      "title": "准备阶段",
      "description": "准备工作描述",
      "keyPoints": ["要点1", "要点2"],
      "regionHint": "画面区域提示"
    },
    {
      "order": 2,
      "title": "起稿",
      "description": "起稿步骤描述",
      "keyPoints": ["要点1", "要点2"]
    },
    {
      "order": 3,
      "title": "铺大色块",
      "description": "铺色步骤描述",
      "keyPoints": ["要点1", "要点2"]
    },
    {
      "order": 4,
      "title": "深入刻画",
      "description": "深入步骤描述",
      "keyPoints": ["要点1", "要点2"]
    },
    {
      "order": 5,
      "title": "调整统一",
      "description": "调整步骤描述",
      "keyPoints": ["要点1", "要点2"]
    }
  ]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  }

  async comparePractice(originalImageBase64: string, practiceImageBase64: string, language: string): Promise<Feedback> {
    const prompt = `请对比原画和练习作品，给出详细的反馈，语言使用${this.getLanguagePrompt(language)}，返回JSON格式：

{
  "strengths": ["优点1", "优点2"],
  "weaknesses": ["不足1", "不足2"],
  "overallRating": 4,
  "suggestions": [
    {
      "area": "方面",
      "description": "建议描述",
      "priority": "high",
      "isResolved": false
    }
  ]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${originalImageBase64}` } },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${practiceImageBase64}` } }
            ]
          }
        ],
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  }
}

export class ClaudeAdapter extends BaseAdapter {
  async analyzeArtwork(imageBase64: string, language: string): Promise<AnalysisResult> {
    throw new Error('Claude adapter not implemented yet');
  }

  async generateTutorial(analysis: AnalysisResult, language: string): Promise<Tutorial> {
    throw new Error('Claude adapter not implemented yet');
  }

  async comparePractice(originalImageBase64: string, practiceImageBase64: string, language: string): Promise<Feedback> {
    throw new Error('Claude adapter not implemented yet');
  }
}

export class GeminiAdapter extends BaseAdapter {
  async analyzeArtwork(imageBase64: string, language: string): Promise<AnalysisResult> {
    throw new Error('Gemini adapter not implemented yet');
  }

  async generateTutorial(analysis: AnalysisResult, language: string): Promise<Tutorial> {
    throw new Error('Gemini adapter not implemented yet');
  }

  async comparePractice(originalImageBase64: string, practiceImageBase64: string, language: string): Promise<Feedback> {
    throw new Error('Gemini adapter not implemented yet');
  }
}

export class AIServiceFactory {
  static create(model: 'openai' | 'claude' | 'gemini', apiKey: string): AIService {
    switch (model) {
      case 'openai':
        return new OpenAIAdapter(apiKey);
      case 'claude':
        return new ClaudeAdapter(apiKey);
      case 'gemini':
        return new GeminiAdapter(apiKey);
      default:
        throw new Error(`Unknown model: ${model}`);
    }
  }
}
