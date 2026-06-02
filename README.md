# TaskMaster - Personal Task Manager

A full-stack personal task management web application built with **Next.js 16**, **NextAuth v5**, **Prisma 7**, and **Tailwind CSS 4**.

**Live Demo**: [https://advanced-project-phi.vercel.app](https://advanced-project-phi.vercel.app)

## Features

- **User Authentication** - Secure registration and login with bcrypt password hashing and JWT sessions
- **Task CRUD** - Create, read, update, and delete tasks
- **Status Tracking** - Tasks flow through pending → in progress → completed
- **Priority Levels** - Assign low, medium, or high priority to tasks
- **Due Dates** - Set optional due dates for tasks
- **Filtering** - Filter tasks by status and priority
- **Statistics Dashboard** - View task counts by status
- **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 16.2.7 (App Router, React Server Components)
- **Language**: TypeScript
- **Authentication**: NextAuth v5 (Auth.js) with Credentials Provider
- **Database**: PostgreSQL via Prisma 7 ORM
- **Styling**: Tailwind CSS 4
- **Password Hashing**: bcryptjs
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
git clone https://github.com/lecyapp/task-manager-nextjs.git
cd task-manager-nextjs
npm install
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskmaster"
AUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── api/auth/          # Auth routes
│   ├── api/tasks/         # Task API routes
│   ├── actions/task.ts    # Server Actions
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   ├── register/          # Register page
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
├── lib/                   # Auth & Prisma config
└── types/                 # TypeScript type extensions
```

## Author

Li Baishun (Student ID: 6486464)

## License

This project is for educational purposes as part of the 631-1 Advanced Assignment.
