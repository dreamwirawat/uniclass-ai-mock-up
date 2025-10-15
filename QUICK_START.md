# 🚀 Quick Start - Get Running in 5 Minutes

The fastest way to get UniClass AI up and running on your local machine.

## ⚡ TL;DR

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your keys

# 3. Run database schema in Supabase
# Copy database/schema.sql to Supabase SQL Editor and run

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000
```

## 📝 Detailed Steps

### 1️⃣ Install Dependencies (2 minutes)

```bash
npm install
```

This installs all required packages. Grab a coffee ☕

### 2️⃣ Set Up Environment (1 minute)

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
OPENAI_API_KEY=sk-your-key-here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-random-secret
```

**Get your keys**:

- Supabase: [supabase.com](https://supabase.com/) → New Project → Settings → API
- OpenAI: [platform.openai.com](https://platform.openai.com/) → API Keys

### 3️⃣ Set Up Database (1 minute)

1. Go to your Supabase project
2. Click "SQL Editor"
3. Copy content from `database/schema.sql`
4. Paste and click "Run"

Done! ✅ All tables created.

### 4️⃣ Start Development Server (10 seconds)

```bash
npm run dev
```

### 5️⃣ Open Your Browser

Visit: **http://localhost:3000**

You should see the beautiful landing page! 🎉

## 🎯 What You Can Do Now

### Try the Demo (No Setup Required)

- Click "Get Started"
- Use any email/password to login (demo mode)
- Explore all features!

### Available Pages:

- 🏠 `/` - Landing page
- 🔐 `/login` - Login (demo: any credentials work)
- 📊 `/dashboard` - Main dashboard
- 📚 `/study-plans` - Your study plans
- 🛒 `/marketplace` - Browse templates
- 🤖 `/chat` - AI tutor
- 📅 `/schedule` - Calendar
- 📈 `/progress` - Progress tracking
- ⚙️ `/settings` - Settings

## 🎨 Features to Explore

### 1. Text Highlight Chat

Highlight **any text** on any page → popup appears → ask AI about it!

### 2. Study Plan Builder

Create a plan with drag-and-drop lesson organization

### 3. AI Chat

Chat with GPT-4 tutor in different teaching styles

### 4. Progress Tracking

See beautiful visualizations of your learning journey

## 🐛 Troubleshooting

### Port 3000 already in use?

```bash
npm run dev -- -p 3001
```

### Dependencies not installing?

```bash
rm -rf node_modules package-lock.json
npm install
```

### Supabase errors?

Double-check your `.env.local` has correct URL and keys

### OpenAI errors?

1. Verify API key is valid
2. Check you have credits
3. Test with a simple query

## 📚 Next Steps

1. ✅ Read `SETUP_GUIDE.md` for detailed setup
2. ✅ Check `FEATURES.md` to see all features
3. ✅ Read `README.md` for project overview
4. ✅ Start coding!

## 💡 Pro Tips

- **Hot Reload**: Edit any file and see changes instantly
- **Component Library**: Run `npx shadcn-ui@latest add [component]` to add UI components
- **Database**: Use Supabase's table editor for quick data management
- **API Testing**: All API routes are in `src/app/api/`

## 🎉 You're Ready!

Start building your personalized learning platform!

---

**Need help?** Check the detailed guides:

- `SETUP_GUIDE.md` - Complete setup walkthrough
- `FEATURES.md` - All features explained
- `README.md` - Project documentation

**Happy coding! 🚀**
