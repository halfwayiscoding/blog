# 个人博客项目

## 如何下载和运行本项目

### 手动下载步骤

1. 创建项目文件夹：
```bash
mkdir my-blog
cd my-blog
```

2. 创建以下文件结构：
```
my-blog/
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
├── tailwind.config.js
├── index.html
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    └── (其他src目录下的文件)
```

3. 复制文件内容：
- 将本项目的`package.json`内容复制到您的`package.json`
- 复制其他配置文件(tsconfig.json等)
- 复制整个src目录结构

### 安装依赖
```bash
pnpm install
```

### 运行开发服务器
```bash
pnpm dev
```

### 构建生产版本
```bash
pnpm build
```

## 部署到Vercel

1. 在Vercel控制台创建新项目
2. 上传您的项目文件夹
3. 配置构建命令为`pnpm build`
4. 部署项目

项目将自动部署并分配一个vercel.app域名
