# TaskMaster - 个人任务管理系统

基于 **Next.js 16**、**NextAuth v5**、**Prisma 7** 和 **Tailwind CSS 4** 构建的全栈个人任务管理 Web 应用。

**在线演示**: [https://advanced-project-phi.vercel.app](https://advanced-project-phi.vercel.app)

## 功能特性

- **用户认证** - 支持注册和登录，使用 bcrypt 密码哈希和 JWT 会话管理
- **密码重置** - 通过邮箱验证码重置密码
- **任务管理** - 创建、查看、编辑和删除任务
- **状态流转** - 任务状态依次为：待处理 → 进行中 → 已完成
- **优先级设置** - 可设置低、中、高三个优先级
- **截止日期** - 可为任务设置截止日期
- **筛选功能** - 按状态和优先级筛选任务
- **统计面板** - 查看各状态任务数量统计
- **用户资料** - 编辑个人信息和修改密码
- **响应式设计** - 适配桌面端、平板和移动端

## 技术栈

- **框架**: Next.js 16.2.7（App Router，React Server Components）
- **语言**: TypeScript
- **认证**: NextAuth v5 (Auth.js)，Credentials Provider
- **数据库**: PostgreSQL，通过 Prisma 7 ORM 访问
- **样式**: Tailwind CSS 4
- **密码加密**: bcryptjs
- **部署**: Vercel + Neon PostgreSQL

## 快速开始

### 环境要求

- Node.js 18+
- PostgreSQL 数据库

### 安装

```bash
git clone https://github.com/lecyapp/task-manager-nextjs.git
cd task-manager-nextjs
npm install
```

### 环境变量

创建 `.env` 文件：

```env
DATABASE_URL="postgresql://用户名:密码@localhost:5432/taskmaster"
AUTH_SECRET="你的密钥"
NEXTAUTH_URL="http://localhost:3000"
```

### 数据库初始化

```bash
npx prisma generate
npx prisma db push
```

### 开发模式

```bash
npm run dev
```

在浏览器打开 [http://localhost:3000](http://localhost:3000)。

### 生产构建

```bash
npm run build
npm run start
```

## 项目结构

```
src/
├── app/
│   ├── api/auth/          # 认证相关API
│   ├── api/tasks/         # 任务API
│   ├── actions/task.ts    # Server Actions
│   ├── dashboard/         # 仪表板页面
│   ├── forgot-password/   # 密码重置页面
│   ├── login/             # 登录页面
│   ├── profile/           # 用户资料页面
│   ├── register/          # 注册页面
│   └── page.tsx           # 首页
├── components/            # 可复用UI组件
├── lib/                   # 认证和数据库配置
└── types/                 # TypeScript类型定义
```

## 作者

李百顺（学号：6486464）

## 说明

本项目为 CIT631-1 高阶作业。
