# 社交反假新闻平台 (Anti-News Platform)

一个基于社区协作的反假新闻平台，通过用户上报、投票、评论及证据分享，实现新闻真实性的众包验证。

## 技术栈

- **前端框架**: Vue 3 + Vite
- **状态管理**: Pinia
- **路由管理**: Vue Router
- **样式方案**: Tailwind CSS
- **图标库**: Font Awesome
- **部署平台**: Vercel (待配置)

## 项目结构

```
├── src/
│   ├── components/        # 可复用组件
│   │   ├── NewsCard.vue   # 新闻卡片组件
│   │   └── CommentItem.vue # 评论项组件
│   ├── views/            # 页面组件
│   │   ├── HomeView.vue  # 首页 - 新闻列表
│   │   ├── NewsDetailView.vue # 新闻详情页
│   │   └── SubmitNewsView.vue # 提交新闻页
│   ├── stores/           # Pinia 状态管理
│   │   └── newsStore.js  # 新闻数据管理
│   ├── router/           # Vue Router 配置
│   │   └── index.js      # 路由定义
│   ├── App.vue           # 应用根组件
│   └── main.js           # 应用入口文件
├── public/               # 静态资源
├── package.json          # 项目依赖配置
├── vite.config.js        # Vite 配置
└── index.html            # HTML 入口文件
```

## 功能模块 (成员 A 已实现)

### 1. 新闻管理模块
- ✅ 支持用户提交新闻（标题、简短描述、完整内容、图片 URL、上报人姓名）
- ✅ 实现新闻详情页，展示新闻全量信息
- ✅ 与 Pinia 状态管理结合，确保数据高效共享
- ✅ 通过 localStorage 实现本地数据存储

### 2. 社区投票与评论模块
- ✅ 投票功能：支持对新闻投"假新闻"或"非假新闻"票
- ✅ 评论功能：支持提交文字评论及佐证图片 URL
- ✅ 实时更新投票比例与新闻状态
- ✅ 提供即时视觉反馈

## 安装与运行

### 前置要求
- Node.js (v14 或更高版本)
- npm (v6 或更高版本)

### 步骤

1. 安装依赖
   ```bash
   npm install
   ```

2. 启动开发服务器
   ```bash
   npm run dev
   ```

3. 构建生产版本
   ```bash
   npm run build
   ```

4. 预览生产版本
   ```bash
   npm run preview
   ```

## 数据存储说明

- 项目使用浏览器的 `localStorage` 来存储新闻、投票和评论数据
- 刷新页面后数据会保留，但清除浏览器缓存或在不同浏览器中打开会看不到之前的数据
- 项目包含模拟数据，首次加载时会自动初始化

## 团队分工说明

- **成员 A**: 新闻管理模块、社区投票与评论模块（已实现）
- **成员 B**: 筛选与分页模块、界面与交互模块（待实现）
- **成员 C**: 数据与部署模块（待实现）

## 待办事项

1. 完善筛选与分页功能（成员 B）
2. 优化响应式设计与 UI 交互（成员 B）
3. 生成更多模拟数据（成员 C）
4. 配置 Vercel 部署（成员 C）
5. 实现用户认证功能
6. 添加单元测试和 E2E 测试