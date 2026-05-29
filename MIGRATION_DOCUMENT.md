# AI绘画教学助手 - 技术栈迁移文档

## 1. 项目概述

### 1.1 原项目概况
- **项目名称**: AI绘画教学助手 (PaintLearning)
- **原技术栈**: React Native + TypeScript + Expo + Zustand
- **核心功能**: 画作分析、教程生成、练习反馈、学习历史管理

### 1.2 迁移目标
将现有 React Native 项目迁移至以下技术栈：
- **后端**: Java + Spring Boot
- **服务层**: C# + .NET Core
- **前端**: Vue3 + Pinia + Vue Router

---

## 2. 技术选型理由

### 2.1 后端技术选型

| 技术 | 选型理由 |
|------|----------|
| Java 21 | LTS 版本，性能稳定，生态成熟，适合企业级后端服务 |
| Spring Boot 3.2 | 社区成熟，生态完善，便于快速构建 RESTful 服务 |
| Spring Data JPA | 简化数据访问层开发，支持多种数据库 |
| MySQL / H2 | MySQL 用于生产环境，H2 用于开发测试 |

### 2.2 服务层技术选型

| 技术 | 选型理由 |
|------|----------|
| C# .NET 8 | 高性能，与 AI 服务集成良好，跨平台支持 |
| ASP.NET Core | 现代化 Web 框架，性能优异 |
| HttpClient | 内置 HTTP 客户端，便于调用外部 API |

### 2.3 前端技术选型

| 技术 | 选型理由 |
|------|----------|
| Vue 3 | 响应式设计，Composition API 便于代码组织 |
| Pinia | 官方状态管理库，轻量且类型安全 |
| Vue Router | 官方路由库，支持动态路由 |
| Element Plus | 成熟的 UI 组件库，开箱即用 |
| Vite | 快速构建工具，热更新体验好 |

---

## 3. 架构调整说明

### 3.1 原架构

```
┌─────────────────────────────────────────────┐
│            React Native 前端                  │
│  (Zustand 状态管理 + React Navigation)       │
└────────────────────────────┬────────────────┘
                             │ REST API
┌────────────────────────────▼────────────────┐
│            外部 AI 服务 (OpenAI)            │
└─────────────────────────────────────────────┘
```

### 3.2 新架构

```
┌─────────────────────────────────────────────────────────────────┐
│                     Vue3 前端层                               │
│  ┌─────────┬─────────┬─────────┬─────────┬─────────┐         │
│  │ 首页    │ 分析页  │ 教程页  │ 练习页  │ 设置页  │         │
│  └────┬────┴────┬────┴────┬────┴────┬────┴────┬────┘         │
│       │          │          │          │          │           │
│       └──────────┴──────────┴────┬─────┴──────────┘           │
│                                  │                          │
│                     REST API (Axios)                        │
│                                  │                          │
└──────────────────────────────────┼───────────────────────────┘
                                  │
┌──────────────────────────────────▼───────────────────────────┐
│                    .NET Core 服务层                          │
│  ┌─────────────────────────────────────────────┐            │
│  │  AI Service          │  Business Orchestration       │    │
│  │  - OpenAI Adapter    │  - Workflow Management       │    │
│  │  - Claude Adapter    │  - Data Processing           │    │
│  │  - Gemini Adapter    │  - API Gateway               │    │
│  └──────────────────────┴───────────────────────────────┘    │
└──────────────────────────────────┬───────────────────────────┘
                                  │ REST API
┌──────────────────────────────────▼───────────────────────────┐
│                  Spring Boot 后端                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Artwork     │  │ Analysis    │  │ Tutorial    │         │
│  │ Controller  │  │ Controller  │  │ Controller  │         │
│  │ Service     │  │ Service     │  │ Service     │         │
│  │ Repository  │  │ Repository  │  │ Repository  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│           │               │               │                  │
│           └───────────────┼───────────────┘                  │
│                           ▼                                  │
│                    MySQL Database                            │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 架构优势

1. **分层清晰**: 前端、服务层、后端职责明确
2. **扩展性强**: 各层独立演进，便于技术迭代
3. **性能优化**: 后端处理数据持久化，服务层处理业务编排
4. **安全性**: 敏感配置集中管理，API 网关统一认证

---

## 4. 代码迁移策略

### 4.1 数据模型迁移

| 原 TypeScript 类型 | 新 Java 实体 | 新 C# DTO | 新 Vue3 Type |
|-------------------|-------------|-----------|-------------|
| Artwork | Artwork.java | ArtworkDTO.cs | Artwork.ts |
| AnalysisResult | AnalysisResult.java | AnalysisResultDTO.cs | AnalysisResult.ts |
| Tutorial | Tutorial.java | TutorialDTO.cs | Tutorial.ts |
| Practice | Practice.java | PracticeDTO.cs | Practice.ts |
| Feedback | Feedback.java | FeedbackDTO.cs | Feedback.ts |
| AISettings | AISettings.java | AISettingsDTO.cs | AISettings.ts |

### 4.2 状态管理迁移

**原 Zustand Store → 新 Pinia Store**

| Zustand Action | Pinia Action |
|----------------|--------------|
| addArtwork | createArtwork |
| updateArtwork | updateArtwork |
| deleteArtwork | deleteArtwork |
| toggleFavorite | toggleFavorite |
| analyzeArtwork | analyzeArtwork |
| generateTutorial | generateTutorial |

### 4.3 组件迁移

| React Native 组件 | Vue3 组件 |
|-------------------|-----------|
| HomeScreen.tsx | Home.vue |
| AnalysisScreen.tsx | Analysis.vue |
| TutorialScreen.tsx | Tutorial.vue |
| PracticeScreen.tsx | Practice.vue |
| HistoryScreen.tsx | History.vue |
| SettingsScreen.tsx | Settings.vue |

---

## 5. 项目结构

### 5.1 后端结构 (Spring Boot)

```
backend/
├── src/
│   └── main/
│       ├── java/com/paintlearning/app/
│       │   ├── PaintLearningApplication.java  # 启动类
│       │   ├── controller/                    # REST API 控制层
│       │   │   ├── ArtworkController.java
│       │   │   └── AISettingsController.java
│       │   ├── service/                      # 业务逻辑层
│       │   │   ├── ArtworkService.java
│       │   │   ├── AISettingsService.java
│       │   │   └── impl/
│       │   ├── repository/                   # 数据访问层
│       │   │   ├── ArtworkRepository.java
│       │   │   └── AISettingsRepository.java
│       │   ├── entity/                       # JPA 实体
│       │   │   ├── Artwork.java
│       │   │   ├── AnalysisResult.java
│       │   │   ├── Tutorial.java
│       │   │   ├── Practice.java
│       │   │   ├── Feedback.java
│       │   │   └── ...
│       │   ├── dto/                          # 数据传输对象
│       │   │   ├── request/
│       │   │   └── response/
│       │   ├── config/                       # 配置类
│       │   │   └── WebConfig.java
│       │   └── exception/                    # 异常处理
│       │       └── GlobalExceptionHandler.java
│       └── resources/
│           └── application.yml               # 应用配置
└── pom.xml                                   # Maven 依赖
```

### 5.2 服务层结构 (.NET Core)

```
service/
├── Controllers/                              # API 控制器
│   ├── ArtworkController.cs
│   └── AISettingsController.cs
├── Services/                                # 服务类
│   ├── IAIService.cs
│   ├── AIService.cs
│   ├── IArtworkServiceClient.cs
│   └── ArtworkServiceClient.cs
├── DTO/                                     # 数据传输对象
│   ├── ApiResponse.cs
│   ├── AnalysisResultDTO.cs
│   ├── TutorialDTO.cs
│   └── ...
├── Program.cs                               # 启动类
├── appsettings.json                         # 应用配置
└── PaintLearning.Service.csproj             # 项目文件
```

### 5.3 前端结构 (Vue3)

```
frontend/
├── src/
│   ├── views/                               # 页面组件
│   │   ├── Home.vue
│   │   ├── Analysis.vue
│   │   ├── Tutorial.vue
│   │   ├── Practice.vue
│   │   ├── History.vue
│   │   └── Settings.vue
│   ├── components/                          # 公共组件
│   │   └── BottomNav.vue
│   ├── stores/                              # Pinia 状态管理
│   │   └── app.ts
│   ├── api/                                 # API 服务
│   │   └── index.ts
│   ├── router/                              # 路由配置
│   │   └── index.ts
│   ├── types/                               # TypeScript 类型
│   │   └── index.ts
│   ├── App.vue                              # 根组件
│   └── main.ts                              # 入口文件
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 6. API 接口文档

### 6.1 画作管理接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取所有画作 | GET | `/api/artworks` | 获取用户的所有画作 |
| 获取画作详情 | GET | `/api/artworks/{id}` | 根据ID获取画作详情 |
| 创建画作 | POST | `/api/artworks` | 创建新画作 |
| 更新画作 | PUT | `/api/artworks/{id}` | 更新画作信息 |
| 删除画作 | DELETE | `/api/artworks/{id}` | 删除画作 |
| 收藏/取消收藏 | POST | `/api/artworks/{id}/favorite` | 切换收藏状态 |

### 6.2 AI 分析接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 分析画作 | POST | `/api/artworks/{id}/analyze` | AI分析画作 |
| 生成教程 | POST | `/api/artworks/{id}/tutorial` | 生成绘画教程 |
| 练习反馈 | POST | `/api/artworks/practice` | 提交练习并获取反馈 |

### 6.3 AI 设置接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取设置 | GET | `/api/ai-settings` | 获取AI配置 |
| 更新设置 | PUT | `/api/ai-settings` | 更新AI配置 |

### 6.4 请求/响应格式

**成功响应**:
```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

**失败响应**:
```json
{
  "code": -1,
  "message": "error message",
  "data": null
}
```

---

## 7. 部署指南

### 7.1 后端部署

**环境要求**:
- JDK 21+
- Maven 3.8+
- MySQL 8.0+ (可选)

**运行命令**:
```bash
# 开发环境 (使用 H2 内存数据库)
cd backend
mvn spring-boot:run

# 生产环境 (使用 MySQL)
mvn spring-boot:run -Dspring.profiles.active=mysql
```

### 7.2 服务层部署

**环境要求**:
- .NET 8 SDK
- 配置后端 API 地址

**运行命令**:
```bash
cd service
dotnet run
```

### 7.3 前端部署

**环境要求**:
- Node.js 20+
- npm 或 yarn

**开发模式**:
```bash
cd frontend
npm install
npm run dev
```

**生产构建**:
```bash
cd frontend
npm install
npm run build
```

---

## 8. 功能测试清单

### 8.1 核心功能测试

| 功能 | 测试项 | 状态 |
|------|--------|------|
| 首页展示 | 显示最近分析列表 | ☐ |
| 上传画作 | 选择图片并上传 | ☐ |
| AI分析 | 分析画作并显示结果 | ☐ |
| 教程生成 | 生成绘画教程 | ☐ |
| 练习反馈 | 上传练习并获取反馈 | ☐ |
| 学习历史 | 查看所有历史记录 | ☐ |
| 收藏管理 | 收藏/取消收藏 | ☐ |
| 设置管理 | 修改AI配置 | ☐ |

### 8.2 性能测试

| 测试项 | 预期指标 |
|--------|----------|
| 接口响应时间 | < 200ms (不含AI调用) |
| AI分析时间 | < 10s |
| 页面加载时间 | < 1s |
| 并发用户数 | > 100 |

---

## 9. 数据库设计

### 9.1 核心数据表

**artworks 表**:
| 字段 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) | 主键 |
| image_uri | VARCHAR(500) | 图片URI |
| thumbnail_uri | VARCHAR(500) | 缩略图URI |
| analysis_id | VARCHAR(36) | 分析结果ID |
| tutorial_id | VARCHAR(36) | 教程ID |
| created_at | DATETIME | 创建时间 |
| is_favorite | BOOLEAN | 是否收藏 |

**analysis_results 表**:
| 字段 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) | 主键 |
| composition_id | VARCHAR(36) | 构图分析ID |
| color_id | VARCHAR(36) | 配色分析ID |
| technique_id | VARCHAR(36) | 技法分析ID |
| style_id | VARCHAR(36) | 风格分析ID |
| light_shadow_id | VARCHAR(36) | 光影分析ID |
| overall_summary | TEXT | 总体评价 |

---

## 10. 注意事项

### 10.1 数据迁移
- 原项目数据需通过 API 接口迁移至新数据库
- 建议在迁移前备份原有数据

### 10.2 API Key 管理
- AI API Key 应通过环境变量配置
- 生产环境禁止硬编码密钥

### 10.3 跨域配置
- 开发环境已配置 CORS 允许所有来源
- 生产环境应限制允许的域名

### 10.4 安全考虑
- 建议添加用户认证机制
- API 接口应添加请求频率限制
- 敏感数据应加密存储

---

## 11. 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0.0 | 2026-05-29 | 初始迁移版本 |