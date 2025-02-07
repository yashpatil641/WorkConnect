# WorkConnect - Modern Job Board Platform

## 🚀 Overview
WorkConnect is a full-stack job board application built with Vue.js and Node.js. It provides a seamless platform for employers to post jobs and job seekers to find opportunities.

## ✨ Features
- User authentication with Clerk
- Job posting and management
- Real-time job search and filtering
- Responsive modern UI
- Application tracking system
- Company profiles
- Role-based access control

## 🛠 Tech Stack
- **Frontend**: Vue 3, TailwindCSS, Vite
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Neon PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Clerk
- **State Management**: Vue Composition API

## 📦 Installation

### Prerequisites
- Node.js >= 16
- PostgreSQL (for local development)
- npm or yarn

### Database Setup

#### Development (Local PostgreSQL)
1. Install PostgreSQL locally
2. Create a new database

```bash

### Frontend Setup
cd client
npm install
cp .env.example .env
# Add your Clerk publishable key to .env
npm run dev
```

```bash

### Backend Setup
cd server
npm install
cp .env.example .env
# Configure your database URL and Clerk secret key
npx prisma migrate dev
npm run dev
```