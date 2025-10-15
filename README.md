# UniClass AI - Personalized Learning Platform

A modern, AI-powered learning platform built with Next.js 15, featuring personalized study plans, progress tracking, and interactive AI tutoring with a beautiful Azuki-inspired design aesthetic.

## 🎨 Features

- **📚 Custom Study Plans**: Create personalized learning paths or choose from hundreds of templates
- **🤖 AI Tutor Chat**: Get instant help from GPT-4 powered tutors with context-aware responses
- **📅 Smart Scheduling**: Interactive calendar with time-blocking and automatic reminders
- **📊 Progress Tracking**: Visual analytics with dual progress systems (completion & coverage)
- **✨ Text Highlight Chat**: Highlight any text to ask questions instantly
- **🎯 Quiz System**: Adaptive quizzes with detailed explanations
- **🎨 Marketplace**: Browse and use study plan templates created by experts
- **⚙️ AI Customization**: Choose teaching styles, AI models, and tutor personalities

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: shadcn/ui + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js v5
- **AI Integration**: OpenAI API (GPT-4)
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod

## 🎨 Design System

### Color Palette (Azuki-Inspired Orange Theme)

```css
/* Primary - Vibrant Orange */
--primary: #FF6B1A
--primary-dark: #E85500
--primary-light: #FF8847

/* Secondary - Beige/Cream */
--secondary: #F5F1E8
--accent: #F5A623

/* Neutrals */
--background: #FAFAFA
--foreground: #1A1A1A
```

### Typography

- **Headings**: Space Grotesk (Bold, 700)
- **Body**: Inter (Regular, 400 / Medium, 500)
- **Japanese accent**: Noto Sans JP

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account
- OpenAI API key

### Setup Steps

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd uniclass-ai-mock-up
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Optional - Uploadthing
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

4. **Set up database**

Go to your Supabase project → SQL Editor and run the schema from `database/schema.sql`

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🗂️ Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Main app pages
│   │   ├── dashboard/       # Dashboard overview
│   │   ├── study-plans/     # Study plan management
│   │   ├── marketplace/     # Template marketplace
│   │   ├── schedule/        # Calendar view
│   │   ├── progress/        # Progress tracking
│   │   ├── chat/           # AI tutor chat
│   │   └── settings/        # User settings
│   ├── api/                 # API routes
│   └── layout.tsx
├── components/
│   ├── ui/                  # shadcn components
│   ├── layout/              # Layout components
│   ├── chat/                # Chat components
│   └── quiz/                # Quiz components
├── lib/
│   ├── supabase.ts          # Database client
│   ├── openai.ts            # OpenAI integration
│   └── utils.ts             # Utility functions
├── hooks/                   # Custom React hooks
└── types/                   # TypeScript types
```

## 🎯 Key Features Implementation

### 1. Text Highlight Chat

The highlight-to-chat feature is implemented in `src/components/chat/highlight-popup.tsx`. It detects text selection and shows a popup to instantly ask AI about the highlighted content.

### 2. AI Chat Integration

AI chat is powered by OpenAI's GPT-4 with customizable teaching styles:

- Encouraging
- Socratic
- Strict
- Friendly

### 3. Drag & Drop Study Plan Builder

Uses `@dnd-kit` for smooth drag-and-drop lesson organization in the study plan creator.

### 4. Progress Tracking

Dual progress system:

- **Mark Complete**: Checkbox-based lesson completion
- **Coverage**: Visual representation of topic mastery

## 🔧 Configuration

### Tailwind Theme

The Azuki-inspired theme is configured in `tailwind.config.ts` with custom colors, fonts, and animations.

### shadcn/ui

Components are configured in `components.json` and can be added using:

```bash
npx shadcn-ui@latest add [component-name]
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design Principles

1. **Minimalist & Clean**: Lots of white space, simple layouts
2. **Anime-inspired touches**: Subtle gradients, rounded corners, playful micro-interactions
3. **Bold CTAs**: Primary orange for important actions
4. **Card-based layout**: Elevated cards with subtle shadows
5. **Smooth animations**: 60fps transitions, spring physics
6. **Glassmorphism**: Subtle frosted glass effects for overlays

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy!

The app is optimized for Vercel with automatic API routes and serverless functions.

## 📚 Database Schema

The database schema includes tables for:

- Users
- Study Plans
- Lessons
- Lesson Progress
- Study Sessions (Schedule)
- Quizzes & Quiz Attempts
- Chat Messages
- AI Settings

See `database/schema.sql` for the complete schema with indexes and RLS policies.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by [Azuki NFT project](https://www.azuki.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

Built with ❤️ using Next.js 15 and shadcn/ui
