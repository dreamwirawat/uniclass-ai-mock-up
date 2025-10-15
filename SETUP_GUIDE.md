# 🚀 UniClass AI - Complete Setup Guide

Welcome to UniClass AI! This guide will walk you through setting up the entire project from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm** package manager
- **Git** for version control
- A **Supabase** account ([Sign up free](https://supabase.com/))
- An **OpenAI API key** ([Get key](https://platform.openai.com/api-keys))

## 🎯 Step 1: Install Dependencies

Run the following command in the project root:

```bash
npm install
```

Or if you prefer yarn or pnpm:

```bash
yarn install
# or
pnpm install
```

This will install all required packages including:

- Next.js 15
- React 19 RC
- shadcn/ui components
- Tailwind CSS
- Supabase client
- OpenAI SDK
- And many more...

## 🗄️ Step 2: Set Up Supabase Database

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com/)
2. Click "Start your project"
3. Create a new project
4. Note down your project URL and anon key

### Run Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Open the file `database/schema.sql` from this project
3. Copy all the SQL code
4. Paste it into the Supabase SQL Editor
5. Click "Run" to create all tables, indexes, and policies

This will create:

- ✅ Users table
- ✅ Study plans table
- ✅ Lessons table
- ✅ Progress tracking
- ✅ Study sessions (calendar)
- ✅ Quizzes and attempts
- ✅ Chat messages
- ✅ AI settings
- ✅ Row Level Security policies

## 🔑 Step 3: Get Your OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to **API Keys**
4. Click "Create new secret key"
5. Copy the key immediately (you won't see it again!)

## ⚙️ Step 4: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here

# Optional - Uploadthing (for file uploads)
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id
```

### Where to find these values:

**Supabase:**

- `NEXT_PUBLIC_SUPABASE_URL`: Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Project Settings → API → anon public
- `SUPABASE_SERVICE_ROLE_KEY`: Project Settings → API → service_role (keep this secret!)

**NextAuth Secret:**
Generate a random secret:

```bash
openssl rand -base64 32
```

## 🏃 Step 5: Run the Development Server

Start the development server:

```bash
npm run dev
```

Or:

```bash
yarn dev
# or
pnpm dev
```

The app will be available at:

```
http://localhost:3000
```

## ✅ Step 6: Verify Everything Works

1. **Homepage**: Visit `http://localhost:3000` - you should see the landing page
2. **Login**: Click "Get Started" or go to `/login`
3. **Dashboard**: After login (demo mode - any credentials work), you should see the dashboard
4. **Test features**:
   - Create a study plan
   - Try the AI chat
   - View the marketplace
   - Check the schedule
   - View progress tracking

## 🎨 Project Structure Overview

```
uniclass-ai/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Main application
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Layout components
│   │   ├── chat/              # Chat features
│   │   └── quiz/              # Quiz components
│   ├── lib/                   # Utilities and configs
│   ├── hooks/                 # Custom React hooks
│   └── types/                 # TypeScript definitions
├── database/
│   └── schema.sql             # Database schema
├── public/                    # Static assets
└── Configuration files
```

## 🔧 Common Issues & Solutions

### Issue: "Cannot find module" errors

**Solution**: Make sure you've run `npm install` to install all dependencies.

### Issue: Supabase connection error

**Solution**:

1. Check your `.env.local` file has the correct Supabase URL and keys
2. Verify your Supabase project is active
3. Ensure the database schema has been run

### Issue: OpenAI API errors

**Solution**:

1. Verify your API key is correct in `.env.local`
2. Check you have credits in your OpenAI account
3. Ensure the key hasn't been revoked

### Issue: Port 3000 already in use

**Solution**: Either:

- Stop the other process using port 3000
- Or run Next.js on a different port:

```bash
npm run dev -- -p 3001
```

### Issue: TypeScript errors

**Solution**:

1. Restart your IDE/editor
2. Run `npm run build` to check for any compilation errors
3. Make sure all dependencies are installed

## 🚀 Building for Production

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## 📦 Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/)
3. Click "Import Project"
4. Select your repository
5. Add all environment variables from `.env.local`
6. Click "Deploy"

Vercel will automatically:

- Install dependencies
- Build your Next.js app
- Deploy it to a global CDN
- Provide you with a production URL

## 🎓 Next Steps

Now that your setup is complete:

1. **Explore the codebase**: Start with `src/app/page.tsx` for the homepage
2. **Customize the design**: Modify `tailwind.config.ts` for theme changes
3. **Add features**: Build on top of the existing structure
4. **Read the docs**: Check out `README.md` for more details

## 📚 Learning Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 💡 Tips

1. **Hot Reload**: Changes to your code will automatically refresh the browser
2. **Database Changes**: If you modify the schema, re-run the SQL in Supabase
3. **Component Library**: Use `npx shadcn-ui@latest add [component]` to add new UI components
4. **Debugging**: Check the browser console and terminal for error messages

## 🆘 Getting Help

If you encounter issues:

1. Check the error message carefully
2. Search for the error in GitHub Issues
3. Review the documentation links above
4. Check Supabase and OpenAI status pages

## 🎉 You're All Set!

Your UniClass AI learning platform is now ready for development. Start building amazing personalized learning experiences!

---

**Happy coding! 🚀**

Built with ❤️ using Next.js 15, shadcn/ui, and OpenAI
