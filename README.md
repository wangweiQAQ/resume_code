# 王望阳 - 前端工程师个人简历网站

基于 Vue3 + Vite + Pinia + TypeScript 构建的现代化个人简历单页网站。

## 技术栈

- **框架**: Vue 3.4+
- **构建工具**: Vite 5.0+
- **状态管理**: Pinia 2.1+
- **类型系统**: TypeScript 5.3+
- **样式方案**: Sass/Scss
- **部署**: GitHub Pages

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
resume-vue3/
├── src/
│   ├── components/          # 组件目录
│   │   ├── NavBar.vue       # 顶部导航栏
│   │   ├── HeroSection.vue  # Hero 首屏
│   │   ├── SkillsSection.vue     # 技能板块
│   │   ├── ExperienceSection.vue # 工作经历
│   │   ├── ProjectsSection.vue   # 项目经历
│   │   ├── ContactSection.vue    # 联系板块
│   │   └── FooterSection.vue     # 页脚
│   ├── stores/              # Pinia 状态管理
│   │   └── resume.ts        # 简历数据
│   ├── styles/              # 全局样式
│   │   └── global.scss      # 全局样式变量与基础样式
│   ├── App.vue              # 根组件
│   ├── main.ts              # 入口文件
│   └── vite-env.d.ts        # 类型声明
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── vite.config.ts           # Vite 配置
├── tsconfig.json            # TypeScript 配置
└── README.md                # 项目说明
```

## 页面模块

1. **导航栏** - 固定顶部，滚动高亮，移动端适配
2. **Hero 首屏** - 姓名、岗位、简介、下载按钮
3. **技能板块** - 分类展示，标签形式，区分熟练程度
4. **工作经历** - 时间线样式展示
5. **项目经历** - 卡片式布局，hover 动效
6. **联系板块** - 电话、邮箱、期望城市
7. **页脚** - 版权信息

## 设计特色

- 🌙 现代简约深色科技主题
- 💎 主色调 #165DFF
- 🌫️ 磨砂玻璃效果
- ✨ 平滑滚动与渐入动画
- 📱 完全响应式设计
- ⚡ 基于 Vite 极速构建

## 部署到 GitHub Pages

### 方法一：手动部署

1. 修改 `vite.config.ts` 中的 `base` 配置为你的仓库名：
```ts
base: '/你的仓库名/',
```

2. 构建项目：
```bash
npm run build
```

3. 将 `dist` 目录的内容推送到 `gh-pages` 分支。

### 方法二：GitHub Actions 自动部署

参考 `.github/workflows/deploy.yml` 配置文件，推送到 main 分支后自动部署。

## 自定义内容

所有简历数据都存储在 `src/stores/resume.ts` 中，可以直接修改对应的数据字段：

- `personalInfo` - 个人基本信息
- `skillCategories` - 技能分类
- `workExperiences` - 工作经历
- `projects` - 项目经历

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## License

MIT

1