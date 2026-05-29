# PaintLearning - AI绘画教学助手

一款基于人工智能技术的绘画学习平台，帮助绘画爱好者通过分析经典名作来学习绘画技巧。

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

## 🏗️ 技术架构

### 三层微服务架构

```
┌─────────────────────────────────────────────────────────────────┐
│                     Vue3 前端层                               │
│  (Pinia 状态管理 + Vue Router + Element Plus)                 │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API
┌────────────────────────────▼────────────────────────────────────┐
│                    .NET Core 服务层                          │
│  (AI服务集成 + 业务编排 + API网关)                           │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API
┌────────────────────────────▼────────────────────────────────────┐
│                  Spring Boot 后端                            │
│  (数据持久化 + 业务逻辑 + REST API)                          │
└─────────────────────────────────────────────────────────────────┘
```

### 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| **前端** | Vue 3 | 渐进式JavaScript框架 |
| | Pinia | 官方状态管理库 |
| | Vue Router | 官方路由管理 |
| | Element Plus | UI组件库 |
| | Vite | 快速构建工具 |
| **服务层** | C# / .NET 8 | 高性能跨平台框架 |
| | ASP.NET Core | Web API框架 |
| | HttpClient | HTTP请求处理 |
| **后端** | Java 17 | 企业级开发语言 |
| | Spring Boot 3.2 | 快速应用框架 |
| | Spring Data JPA | 数据访问层 |
| | MySQL / H2 | 数据库 |

### AI服务支持

| AI模型 | 状态 | 说明 |
|--------|------|------|
| OpenAI (GPT-4o) | ✅ 已实现 | 支持图像分析 |
| Claude (Claude 3) | ✅ 已实现 | 支持图像分析 |
| Gemini (Gemini Pro) | ✅ 已实现 | 支持图像分析 |

## 🚀 快速开始

### 环境要求

- **前端**: Node.js 20+, npm/yarn
- **服务层**: .NET 8 SDK
- **后端**: JDK 17+, Maven 3.8+
- **数据库**: MySQL 8.0+ (可选，开发环境使用H2)

### 安装与运行

#### 1. 后端服务 (Java Spring Boot)

```bash
cd backend

# 使用 Maven 构建
mvn clean package

# 运行应用 (开发环境 - H2内存数据库)
mvn spring-boot:run

# 或运行打包后的JAR
java -jar target/paintlearning-backend-1.0.0.jar

# 生产环境 (MySQL)
java -jar target/paintlearning-backend-1.0.0.jar --spring.profiles.active=mysql
```

后端服务默认运行在: http://localhost:8080

#### 2. 服务层 (.NET Core)

```bash
cd service

# 还原依赖
dotnet restore

# 运行应用
dotnet run

# 或发布并运行
dotnet publish -c Release
dotnet run --project bin/Release/net8.0/PaintLearning.Service.dll
```

服务层默认运行在: http://localhost:5000

#### 3. 前端 (Vue 3)

```bash
cd frontend

# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

前端默认运行在: http://localhost:5173

### Docker部署 (可选)

```bash
# 构建所有服务镜像
docker-compose build

# 启动所有服务
docker-compose up -d
```

## 📁 项目结构

```
PaintLearning/
├── backend/                    # Java Spring Boot 后端
│   ├── src/main/java/com/paintlearning/app/
│   │   ├── controller/        # REST API控制器
│   │   │   ├── ArtworkController.java
│   │   │   └── AISettingsController.java
│   │   ├── service/          # 业务逻辑层
│   │   │   ├── ArtworkService.java
│   │   │   └── AISettingsService.java
│   │   ├── repository/        # 数据访问层
│   │   ├── entity/           # JPA实体类
│   │   │   ├── Artwork.java
│   │   │   ├── AnalysisResult.java
│   │   │   ├── Tutorial.java
│   │   │   └── Practice.java
│   │   ├── dto/              # 数据传输对象
│   │   ├── config/           # 配置类
│   │   └── exception/        # 异常处理
│   ├── src/main/resources/
│   │   └── application.yml   # 应用配置
│   └── pom.xml               # Maven依赖
│
├── service/                    # C# .NET Core 服务层
│   ├── Controllers/          # API控制器
│   │   ├── ArtworkController.cs
│   │   └── AISettingsController.cs
│   ├── Services/             # 服务类
│   │   ├── AIService.cs      # AI服务实现
│   │   └── ArtworkServiceClient.cs
│   ├── DTO/                  # 数据传输对象
│   ├── Program.cs            # 启动类
│   └── PaintLearning.Service.csproj
│
├── frontend/                   # Vue3 前端
│   ├── src/
│   │   ├── views/            # 页面组件
│   │   │   ├── Home.vue      # 首页
│   │   │   ├── Analysis.vue  # 分析页面
│   │   │   ├── Tutorial.vue  # 教程页面
│   │   │   ├── Practice.vue  # 练习页面
│   │   │   ├── History.vue   # 历史页面
│   │   │   └── Settings.vue  # 设置页面
│   │   ├── components/       # 公共组件
│   │   │   └── BottomNav.vue
│   │   ├── stores/           # Pinia状态管理
│   │   │   └── app.ts
│   │   ├── api/              # API服务
│   │   │   └── index.ts
│   │   ├── router/           # 路由配置
│   │   │   └── index.ts
│   │   ├── types/            # TypeScript类型
│   │   │   └── index.ts
│   │   ├── App.vue           # 根组件
│   │   └── main.ts           # 入口文件
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── src/                       # 原React Native项目(保留)
├── assets/                     # 静态资源
├── MIGRATION_DOCUMENT.md      # 迁移文档
└── README.md                   # 项目文档
```

## ⚙️ 配置说明

### 后端配置 (backend/src/main/resources/application.yml)

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:h2:mem:paintlearning
    driver-class-name: org.h2.Driver
    username: sa
    password:
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
  h2:
    console:
      enabled: true

# 生产环境MySQL配置
# spring:
#   datasource:
#     url: jdbc:mysql://localhost:3306/paintlearning
#     username: root
#     password: your_password
```

### 服务层配置 (service/appsettings.json)

```json
{
  "BackendApi": {
    "BaseUrl": "http://localhost:8080"
  },
  "AI": {
    "DefaultModel": "openai"
  }
}
```

### 前端配置 (frontend/src/api/index.ts)

```typescript
const API_BASE_URL = 'http://localhost:5000'
```

## 🔌 API接口

### 画作管理

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取所有画作 | GET | `/api/artworks` | 获取用户的所有画作 |
| 获取画作详情 | GET | `/api/artworks/{id}` | 根据ID获取画作详情 |
| 创建画作 | POST | `/api/artworks` | 创建新画作 |
| 更新画作 | PUT | `/api/artworks/{id}` | 更新画作信息 |
| 删除画作 | DELETE | `/api/artworks/{id}` | 删除画作 |
| 收藏/取消收藏 | POST | `/api/artworks/{id}/favorite` | 切换收藏状态 |

### AI分析

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 分析画作 | POST | `/api/artworks/{id}/analyze` | AI分析画作 |
| 生成教程 | POST | `/api/artworks/{id}/tutorial` | 生成绘画教程 |
| 练习反馈 | POST | `/api/artworks/practice` | 提交练习并获取反馈 |

### AI设置

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取设置 | GET | `/api/ai-settings` | 获取AI配置 |
| 更新设置 | PUT | `/api/ai-settings` | 更新AI配置 |

## 🌍 多语言支持

应用支持多种界面语言：
- 🇨🇳 简体中文
- 🇺🇸 English
- 🇯🇵 日本語
- 🇰🇷 한국어

AI分析结果的语言将跟随界面语言设置。

## 📊 数据库设计

### 核心数据表

**artworks** - 画作表
- id (VARCHAR) - 主键
- image_uri (VARCHAR) - 图片URI
- thumbnail_uri (VARCHAR) - 缩略图URI
- analysis_id (VARCHAR) - 分析结果ID
- tutorial_id (VARCHAR) - 教程ID
- created_at (DATETIME) - 创建时间
- is_favorite (BOOLEAN) - 是否收藏

**analysis_results** - 分析结果表
- id (VARCHAR) - 主键
- composition_id (VARCHAR) - 构图分析ID
- color_id (VARCHAR) - 配色分析ID
- technique_id (VARCHAR) - 技法分析ID
- style_id (VARCHAR) - 风格分析ID
- light_shadow_id (VARCHAR) - 光影分析ID
- overall_summary (TEXT) - 总体评价

## 🔮 未来计划

- [ ] 添加用户认证系统
- [ ] 实现社交分享功能
- [ ] 添加绘画社区
- [ ] 离线模式支持
- [ ] 性能优化与缓存
- [ ] 单元测试与集成测试

## 📄 许可证

本项目采用 MIT 许可证。

## 🙏 致谢

- [Spring Boot](https://spring.io/projects/spring-boot) - 快速应用开发框架
- [.NET](https://dotnet.microsoft.com/) - 高性能开发平台
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Element Plus](https://element-plus.org/) - Vue 3 UI组件库
- [OpenAI](https://openai.com/) - 提供强大的AI能力
- [Anthropic](https://anthropic.com/) - Claude AI服务
- [Google](https://deepmind.google/gemini) - Gemini AI服务

---

**开始您的AI绘画学习之旅吧！** 🎨
