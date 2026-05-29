# PaintLearning - AI绘画教学助手

一款基于人工智能技术的移动应用，帮助绘画爱好者通过分析经典名作来学习绘画技巧。

## 📱 功能特点

### 🎨 智能画作分析
- 上传或拍摄画作，系统将自动分析：
  - **构图分析**：布局类型、视觉重心、空间层次
  - **配色分析**：主色调、配色方案、色彩情感
  - **技法分析**：绘画媒介、笔触特征、肌理效果
  - **风格分析**：艺术流派、参考艺术家、风格特征
  - **光影分析**：光源方向、明暗对比、体积感塑造

### 📝 个性化教程生成
- 基于分析结果，AI自动生成分步骤绘画教程
- 包含详细的材料准备、绘画步骤和关键要点
- 提供实用的小贴士，帮助掌握技法精髓

### ✏️ 练习反馈系统
- 上传自己的练习作品
- 与原作进行AI对比分析
- 获取详细的优缺点评估和改进建议
- 支持评分系统和改进进度追踪

### 📚 学习管理
- 作品收藏和标签管理
- 学习数据统计分析
- 历史记录快速回顾

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **Expo** | 跨平台应用开发框架 |
| **React Native** | 原生移动应用开发 |
| **TypeScript** | 类型安全的开发体验 |
| **React Native Paper** | Material Design UI组件库 |
| **React Navigation** | 灵活的导航系统 |
| **Zustand** | 轻量级状态管理 |
| **AsyncStorage** | 本地数据持久化 |

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- Expo CLI

### 安装依赖

```bash
# 克隆项目后，进入项目目录
cd paintlearning

# 安装依赖
npm install

# 安装web支持（可选）
npx expo install react-dom react-native-web
```

### 运行项目

```bash
# 启动开发服务器
npm start

# 运行Web版本
npm run web

# 运行Android版本
npm run android

# 运行iOS版本（需要Mac）
npm run ios
```

### 配置API Key

首次使用前，需要在应用的「设置」页面中配置AI模型的API Key：

1. 打开应用，进入「设置」
2. 选择AI模型（当前支持OpenAI GPT-4o）
3. 输入您的API Key
4. 点击「保存API Key」

> ⚠️ **注意**：AI功能需要消耗API配额，请合理使用。

## 📁 项目结构

```
PaintLearning/
├── App.tsx                    # 应用入口和导航配置
├── index.ts                   # Expo启动文件
├── src/
│   ├── screens/              # 页面组件
│   │   ├── HomeScreen.tsx    # 首页
│   │   ├── AnalysisScreen.tsx# 分析页面
│   │   ├── TutorialScreen.tsx# 教程页面
│   │   ├── PracticeScreen.tsx# 练习页面
│   │   ├── HistoryScreen.tsx # 历史页面
│   │   └── SettingsScreen.tsx# 设置页面
│   ├── services/              # 服务层
│   │   └── AIService.ts       # AI服务适配器
│   ├── store/                 # 状态管理
│   │   └── index.ts           # Zustand Store
│   ├── types/                 # 类型定义
│   │   └── index.ts           # TypeScript类型
│   └── utils/                 # 工具函数
│       ├── image.ts           # 图片处理
│       └── theme.ts           # 主题配置
├── assets/                    # 静态资源
├── app.json                   # Expo配置
└── package.json               # 依赖配置
```

## 🎯 核心模块

### 状态管理 (Zustand)
应用使用Zustand进行状态管理，支持：
- 画作数据的增删改查
- 收藏状态管理
- AI设置持久化
- 数据自动保存到本地

### AI服务架构
采用适配器模式设计，支持多种AI模型：
- **OpenAI** (GPT-4o) - ✅ 已实现
- **Claude** - 🔜 待实现
- **Gemini** - 🔜 待实现

### 图片处理
- 自动压缩图片（最大1024px）
- Base64编码用于API传输
- 保留原始图片URI用于本地显示

## 🌐 多语言支持

应用支持多种界面语言：
- 🇨🇳 简体中文
- 🇺🇸 English
- 🇯🇵 日本語

AI分析结果的语言将跟随界面语言设置。

## 🔮 未来计划

- [ ] 实现Claude和Gemini适配器
- [ ] 添加更多分析维度
- [ ] 支持社交分享功能
- [ ] 添加绘画社区
- [ ] 离线模式支持

## 📄 许可证

本项目仅供学习交流使用。

## 🙏 致谢

- [Expo](https://expo.dev/) - 优秀的跨平台开发框架
- [React Native Paper](https://reactnativepaper.com/) - 精美的Material Design组件
- [Zustand](https://github.com/pmndrs/zustand) - 简洁的状态管理方案
- OpenAI - 提供强大的AI能力

---

**开始您的AI绘画学习之旅吧！** 🎨
