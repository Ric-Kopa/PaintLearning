# PaintLearning - AI绘画教学助手 Code Wiki

## 目录
1. [项目概述](#项目概述)
2. [技术栈](#技术栈)
3. [项目结构](#项目结构)
4. [核心模块详解](#核心模块详解)
5. [数据结构](#数据结构)
6. [状态管理](#状态管理)
7. [依赖关系](#依赖关系)
8. [开发指南](#开发指南)

---

## 项目概述

### 项目简介
PaintLearning是一款基于Expo + React Native的移动应用，通过AI技术帮助用户学习绘画。应用提供三大核心功能：
- **画作分析**：使用AI分析上传画作的构图、配色、技法、风格、光影等
- **教程生成**：基于分析结果生成分步骤的绘画教程
- **练习反馈**：上传练习作品并与原作对比，获取AI反馈建议

### 版本信息
- 应用名称：PaintLearning
- 版本：1.0.0
- Expo版本：~56.0.6
- React Native版本：0.85.3

---

## 技术栈

| 类别 | 技术/库 | 用途 |
|------|---------|------|
| 核心框架 | Expo 56 | 跨平台应用开发框架 |
| | React 19.2.3 | UI库 |
| | React Native 0.85.3 | 原生移动应用开发 |
| UI组件 | React Native Paper 5.15.3 | Material Design组件库 |
| 导航 | React Navigation 7.x | 屏幕导航 |
| 状态管理 | Zustand 5.0.14 | 轻量级状态管理 |
| 存储 | AsyncStorage | 本地数据持久化 |
| 图像处理 | expo-image-picker | 选择/拍摄图片 |
| | expo-image-manipulator | 图片压缩/处理 |
| 文件系统 | expo-file-system | 文件读写 |
| 类型系统 | TypeScript | 静态类型检查 |

---

## 项目结构

```
PaintLearning/
├── assets/                      # 静态资源
│   ├── android-icon-background.png
│   ├── android-icon-foreground.png
│   ├── android-icon-monochrome.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── src/
│   ├── screens/                # 屏幕组件
│   │   ├── HomeScreen.tsx      # 首页
│   │   ├── AnalysisScreen.tsx  # 分析页面
│   │   ├── TutorialScreen.tsx  # 教程页面
│   │   ├── PracticeScreen.tsx  # 练习页面
│   │   └── HistoryScreen.tsx   # 历史记录页面
│   ├── services/               # 服务层
│   │   └── AIService.ts        # AI服务适配器
│   ├── store/                  # 状态管理
│   │   └── index.ts            # Zustand store
│   ├── types/                  # 类型定义
│   │   └── index.ts            # 核心类型
│   └── utils/                  # 工具函数
│       ├── image.ts            # 图片处理工具
│       └── theme.ts            # 主题配置
├── App.tsx                     # 应用入口
├── app.json                    # Expo配置
├── package.json                # 依赖配置
├── tsconfig.json               # TypeScript配置
└── index.ts                    # 启动文件
```

---

## 核心模块详解

### 1. 屏幕模块 (screens/)

#### HomeScreen.tsx
**功能**：应用首页，展示最近分析记录和快速操作

**主要组件**：
- 应用标题和副标题
- "上传画作"按钮
- 最近分析作品网格（显示4个最新）

**关键代码逻辑**：
```typescript
// 获取最近的画作
const recentArtworks = artworks.slice(0, 4);

// 处理上传
const handleUpload = () => navigation.navigate('Analysis');

// 点击作品
const handleArtworkPress = (artwork: any) => {
  setCurrentArtwork(artwork);
  navigation.navigate('Analysis', { artworkId: artwork.id });
};
```

#### AnalysisScreen.tsx
**功能**：上传、分析画作，展示详细分析结果

**主要功能**：
- 从相册选择或拍摄图片
- 调用AI进行分析
- 使用分段按钮展示不同维度的分析（构图/配色/技法/风格/光影）
- 生成教程按钮

**关键流程**：
1. 选择图片 → 压缩处理 → 转Base64 → 调用AI分析 → 保存结果

#### TutorialScreen.tsx
**功能**：展示分步骤的绘画教程

**主要功能**：
- 显示参考材料
- 分步骤展示教程（支持上一步/下一步）
- 显示小贴士
- 上传练习作品入口

**关键代码**：
```typescript
// 步骤导航
const nextStep = () => currentStep < tutorial.steps.length - 1 && setCurrentStep(currentStep + 1);
const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);
```

#### PracticeScreen.tsx
**功能**：练习作品对比与反馈

**主要功能**：
- 并排展示原作和练习作品
- 支持滑动对比模式（UI已设计但未完全实现）
- 获取AI反馈
- 显示评分、优缺点和改进建议
- 改进建议可勾选为已完成

#### HistoryScreen.tsx
**功能**：历史分析记录和统计

**主要功能**：
- 学习统计卡片（总分析数、教程数、练习数、收藏数）
- 筛选（全部/收藏）
- 历史记录列表（支持删除、收藏操作）

### 2. 服务模块 (services/)

#### AIService.ts
**功能**：AI服务抽象层，支持多种AI模型

**架构设计**：
采用适配器模式，统一接口，支持扩展多种AI服务

**核心接口**：
```typescript
interface AIService {
  analyzeArtwork(imageBase64: string, language: string): Promise<AnalysisResult>;
  generateTutorial(analysis: AnalysisResult, language: string): Promise<Tutorial>;
  comparePractice(original: string, practice: string, language: string): Promise<Feedback>;
}
```

**适配器实现**：
- `OpenAIAdapter`：已实现，使用GPT-4o模型
- `ClaudeAdapter`：占位实现
- `GeminiAdapter`：占位实现

**工厂类**：
```typescript
class AIServiceFactory {
  static create(model: 'openai' | 'claude' | 'gemini', apiKey: string): AIService;
}
```

### 3. 状态管理 (store/)

#### index.ts
**功能**：使用Zustand管理应用全局状态，支持持久化

**状态结构**：
```typescript
interface AppState {
  artworks: Artwork[];          // 所有画作记录
  aiSettings: AISettings;       // AI设置
  currentArtwork: Artwork | null;  // 当前选中的画作
  
  // 操作方法
  addArtwork: (artwork: Artwork) => void;
  updateArtwork: (id: string, updates: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;
  setCurrentArtwork: (artwork: Artwork | null) => void;
  toggleFavorite: (id: string) => void;
  updateAISettings: (settings: Partial<AISettings>) => void;
  clearAllData: () => void;
}
```

**持久化配置**：
- 使用 `persist` 中间件
- 存储键：`paint-learning-storage`
- 存储引擎：AsyncStorage

### 4. 类型定义 (types/)

#### index.ts
**功能**：定义应用核心数据结构

**主要类型**：

1. **Artwork** - 画作记录
```typescript
{
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
```

2. **AnalysisResult** - 分析结果
```typescript
{
  composition: CompositionAnalysis;  // 构图分析
  color: ColorAnalysis;              // 配色分析
  technique: TechniqueAnalysis;      // 技法分析
  style: StyleAnalysis;              // 风格分析
  lightShadow: LightShadowAnalysis;  // 光影分析
  overallSummary: string;            // 总体评价
}
```

3. **Tutorial** - 教程
```typescript
{
  steps: TutorialStep[];  // 步骤列表
  materials: string[];    // 材料列表
  tips: string[];         // 小贴士
}
```

4. **Practice** - 练习记录
```typescript
{
  id: string;
  imageUri: string;
  feedback: Feedback | null;
  completedImprovements: string[];
  createdAt: number;
}
```

5. **Feedback** - 反馈信息
```typescript
{
  strengths: string[];
  weaknesses: string[];
  suggestions: Suggestion[];
  overallRating: number;  // 1-5分
}
```

6. **Suggestion** - 改进建议
```typescript
{
  area: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  isResolved: boolean;
}
```

7. **AISettings** - AI设置
```typescript
{
  model: 'openai' | 'claude' | 'gemini';
  apiKeys: {
    openai: string;
    claude: string;
    gemini: string;
  };
  language: string;
}
```

### 5. 工具模块 (utils/)

#### image.ts
**功能**：图片处理工具函数

**函数列表**：
```typescript
// 压缩图片
compressImage(uri: string, maxWidth = 1024, maxHeight = 1024): Promise<ImageResult>

// 图片转Base64
imageToBase64(uri: string): Promise<string>

// 生成唯一ID
generateId(): string
```

#### theme.ts
**功能**：React Native Paper主题配置

**主题**：
- `lightTheme`：浅色主题，主色调橙色 (#F59E0B)
- `darkTheme`：深色主题，主色调亮橙色 (#FBBF24)

---

## 数据结构

### 数据流向
```
用户上传图片 → 压缩处理 → Base64编码 → AI分析 → 保存到Store → AsyncStorage持久化
```

### 核心流程
1. **分析流程**：
   - 图片选择 → 压缩 → AI分析 → 存储Artwork对象
   
2. **教程生成流程**：
   - AnalysisResult → AI生成 → Tutorial对象 → 更新Artwork
   
3. **练习反馈流程**：
   - 上传练习 → 对比分析 → Feedback对象 → 更新Practice

---

## 状态管理

### Zustand Store使用示例

```typescript
// 组件中使用
import { useAppStore } from '../store';

// 获取状态
const artworks = useAppStore((state) => state.artworks);
const currentArtwork = useAppStore((state) => state.currentArtwork);

// 调用方法
const { addArtwork, updateArtwork, toggleFavorite } = useAppStore.getState();

// 添加新画作
addArtwork(newArtwork);

// 更新画作
updateArtwork(artworkId, { isFavorite: true });

// 切换收藏
toggleFavorite(artworkId);
```

---

## 依赖关系

### 核心依赖关系图

```
App.tsx
├── screens/
│   ├── HomeScreen
│   │   └── useAppStore
│   ├── AnalysisScreen
│   │   ├── useAppStore
│   │   ├── AIServiceFactory
│   │   └── image utils
│   ├── TutorialScreen
│   │   ├── useAppStore
│   │   └── image utils
│   ├── PracticeScreen
│   │   ├── useAppStore
│   │   ├── AIServiceFactory
│   │   └── image utils
│   └── HistoryScreen
│       └── useAppStore
├── services/
│   └── AIService (OpenAIAdapter)
├── store/
│   └── useAppStore (Zustand + AsyncStorage)
└── utils/
    ├── image
    └── theme
```

---

## 开发指南

### 环境要求
- Node.js 18+
- Expo CLI
- 模拟器或真机设备

### 安装依赖
```bash
npm install
```

### 运行项目

```bash
# 启动开发服务器
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### 配置说明

#### app.json
主要配置项：
- `name`: 应用显示名称
- `slug`: Expo项目ID
- `orientation`: 屏幕方向（竖屏）
- `icon`: 应用图标
- `android.adaptiveIcon`: Android自适应图标

### 扩展指南

#### 添加新的AI适配器
1. 继承 `BaseAdapter` 抽象类
2. 实现三个核心方法：`analyzeArtwork`, `generateTutorial`, `comparePractice`
3. 在 `AIServiceFactory` 中注册新适配器

#### 添加新屏幕
1. 在 `src/screens/` 创建新组件
2. 在导航中配置（注：当前App.tsx还未实现导航）
3. 使用 `useAppStore` 访问状态

#### 添加新分析维度
1. 在 `AnalysisResult` 类型中添加新字段
2. 更新AI适配器的提示词
3. 在 `AnalysisScreen` 添加新标签页

### 注意事项

1. **API密钥配置**：用户需要在设置中配置OpenAI API Key才能使用AI功能
2. **图片压缩**：为减少API调用成本，图片会压缩到1024px以下
3. **数据持久化**：所有数据自动保存到AsyncStorage
4. **错误处理**：API调用失败时会显示Alert提示用户

### 待实现功能
1. SettingsScreen - 设置页面（配置API Key、语言等）
2. App.tsx导航结构 - 当前App.tsx只是占位
3. Claude和Gemini适配器完整实现
4. PracticeScreen滑动对比模式
5. HistoryScreen完整实现（当前文件被截断）

---

## 总结

PaintLearning是一个架构清晰的AI教学应用，采用适配器模式支持多种AI服务，使用Zustand进行轻量级状态管理，通过TypeScript提供类型安全保障。项目结构模块化程度高，易于扩展和维护。
