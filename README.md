# Luxury Cinematic Wedding Invitation - Implementation Guide

This project is a premium, cinematic wedding invitation platform built with Next.js 15, Supabase, and Framer Motion.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS 4
- **Animations**: Framer Motion, GSAP
- **Backend**: Supabase (PostgreSQL, Realtime)
- **Validation**: Zod
- **Icons**: Lucide React

## 📁 Project Structure

- `src/app`: Routes and Layouts
- `src/sections`: Main content sections (Hero, Bride & Groom, etc.)
- `src/components`: Reusable UI and Animation components
- `src/lib`: Utilities and Supabase client
- `supabase/`: SQL schema for database setup

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup

1. Go to your [Supabase Dashboard](https://app.supabase.com).
2. Create a new project.
3. Open the **SQL Editor**.
4. Copy and paste the contents of `supabase/schema.sql` and run it.
5. Ensure **Realtime** is enabled for the `wishes` table (included in script).

### 3. Installation

```bash
npm install
```

### 4. Running Locally

```bash
npm run dev
```

## ✨ Key Features

- **Cinematic Opening**: Fullscreen entry with scroll locking until interaction.
- **GSAP Parallax**: Smooth background scrolling effects in the Hero section.
- **Realtime Wishes**: Guest messages appear instantly without refreshing.
- **Mobile First**: Optimized for WhatsApp and Instagram sharing.
- **Admin Dashboard**: Private access to manage RSVPs and view stats.

## 🎨 Design System

- **Typography**:
  - Headings: `Cormorant Garamond` (Elegant Serif)
  - Body: `Inter` (Modern Sans)
- **Colors**:
  - Primary: `#F8F5F2` (Off-white Luxury)
  - Gold: `#D4AF37` (Classic Gold)
  - Dark: `#1C1C1C` (Modern Contrast)

## 🌐 Deployment

The project is ready for deployment on **Vercel**.

1. Connect your GitHub repository.
2. Add the environment variables.
3. Deploy!
