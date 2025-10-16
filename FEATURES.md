# ✨ UniClass AI - Features Overview

A comprehensive guide to all features implemented in the UniClass AI learning platform.

## 🎯 Core Features

### 1. 📚 Study Plan Management

**Location**: `/study-plans`

Create, manage, and organize personalized learning paths.

#### Features:

- ✅ Create custom study plans from scratch
- ✅ Add/remove/reorder lessons with drag & drop
- ✅ Set estimated duration for each lesson
- ✅ Categorize plans (Programming, Language, IELTS, etc.)
- ✅ Track progress with visual indicators
- ✅ Mark lessons as complete
- ✅ View detailed lesson content

#### Implementation:

- **Drag & Drop**: Uses `@dnd-kit` for smooth lesson reordering
- **Progress Tracking**: Real-time calculation based on completed lessons
- **Responsive Design**: Works on mobile, tablet, and desktop

**Files**:

- `src/app/(dashboard)/study-plans/page.tsx` - List view
- `src/app/(dashboard)/study-plans/create/page.tsx` - Builder
- `src/app/(dashboard)/study-plans/[id]/page.tsx` - Detail view

---

### 2. 🛒 Template Marketplace

**Location**: `/marketplace`

Browse and use pre-made study plan templates.

#### Features:

- ✅ Browse featured and popular templates
- ✅ Search templates by category
- ✅ View ratings and download counts
- ✅ Preview template details
- ✅ One-click template usage
- ✅ Filter by category (Programming, Language, etc.)

#### Template Categories:

- 📱 Programming (Web Dev, Data Science, etc.)
- 🗣️ Languages (IELTS, Business English)
- 🧮 Mathematics
- 🔬 Science
- 💼 Business
- 🎨 Design

**Files**:

- `src/app/(dashboard)/marketplace/page.tsx`

---

### 3. 🤖 AI Tutor Chat

**Location**: `/chat` + **Chat Sidebar** in Study Plans & Lessons

Intelligent AI tutoring powered by OpenAI's GPT-4.

#### Features:

- ✅ Real-time chat with AI tutor
- ✅ **NEW: Chat Sidebar** - Slide-in chat panel from the right
- ✅ **Context-Aware Chat** - AI knows what you're studying
- ✅ Multiple teaching styles:
  - 🌟 Encouraging (supportive and positive)
  - 🤔 Socratic (question-based learning)
  - 📚 Strict (direct and rigorous)
  - 😊 Friendly (casual and approachable)
- ✅ Customizable AI model selection (GPT-4, GPT-3.5)
- ✅ Context-aware responses
- ✅ Chat history
- ✅ Image upload support (planned)
- ✅ Quick topic suggestions

#### Unique Features:

**1. Text Highlight Chat**

- Highlight any text anywhere in the app
- Instant popup to ask AI about the selected text
- Context is automatically included in the chat

**2. Chat Sidebar (NEW! 🎉)**

- 💬 Floating chat button on Study Plans and Lesson pages
- 📱 Slide-in sidebar from the right side
- 🎯 Context-aware: AI knows if you're viewing a lesson or plan
- ✨ Smooth animations with backdrop blur
- 🔄 Open/Close with button or backdrop click
- 💡 Quick suggestions based on context
- 🤖 Typing indicator for AI responses
- ⚡ Auto-scroll to latest messages

**Where Chat Sidebar Appears**:

- Study Plans List (`/study-plans`)
- Study Plan Detail (`/study-plans/[id]`)
- Lesson Detail (`/study-plans/[id]/lesson/[lessonId]`)

**Implementation**:

- `src/app/(dashboard)/chat/page.tsx` - Full chat interface
- `src/components/chat/chat-sidebar.tsx` - **NEW: Chat sidebar component**
- `src/components/chat/highlight-popup.tsx` - Highlight feature
- `src/app/api/chat/route.ts` - OpenAI integration
- `src/lib/openai.ts` - AI configuration

---

### 4. 📅 Study Schedule

**Location**: `/schedule`

Interactive calendar for planning study sessions.

#### Features:

- ✅ Weekly calendar view
- ✅ Time-blocking (8 AM - 9 PM)
- ✅ Create/edit/delete study sessions
- ✅ Session details (lesson, duration, notes)
- ✅ Upcoming sessions list
- ✅ Weekly statistics
- ✅ Visual session indicators
- ✅ Navigate between weeks

#### Calendar Features:

- **Time Slots**: Hourly blocks from 8 AM to 9 PM
- **Color Coding**: Different colors for different subjects
- **Quick Add**: Click any time slot to add a session
- **Responsive**: Horizontal scroll on mobile

**Files**:

- `src/app/(dashboard)/schedule/page.tsx`

---

### 5. 📊 Progress Tracking

**Location**: `/progress`

Comprehensive progress analytics and insights.

#### Features:

- ✅ **Dual Progress System**:
  - Mark Complete: Checkbox-based completion
  - Coverage: Topic mastery visualization
- ✅ Study streak tracking (current & longest)
- ✅ Total study time
- ✅ Lessons completed vs. total
- ✅ Quiz average scores
- ✅ Weekly activity breakdown
- ✅ Achievement badges
- ✅ Progress by study plan
- ✅ Learning coverage by topic

#### Tabs:

1. **Overview**: Overall stats and recent achievements
2. **By Study Plan**: Progress for each plan
3. **Coverage**: Topic mastery breakdown
4. **Activity**: Study calendar heatmap

**Files**:

- `src/app/(dashboard)/progress/page.tsx`

---

### 6. 🎯 Quiz System

**Location**: Integrated in lessons

Interactive quizzes with multiple question types.

#### Features:

- ✅ Multiple question formats:
  - Multiple choice
  - True/False
  - Short answer
  - Interactive (whiteboard)
- ✅ Timer and scoring
- ✅ Detailed explanations for wrong answers
- ✅ Progress indicator
- ✅ Results breakdown
- ✅ Review mode to see all answers
- ✅ Retake option

#### Quiz Flow:

1. Question presentation with progress bar
2. Answer selection
3. Navigation (Next/Previous)
4. Results summary with score
5. Detailed answer review

**Files**:

- `src/components/quiz/quiz-card.tsx`

---

### 7. ⚙️ Settings & Customization

**Location**: `/settings`

Personalize your learning experience.

#### Settings Tabs:

**Profile**:

- Update name, email, bio
- Change profile picture
- Password management

**AI Tutor**:

- Select AI model (GPT-4 Turbo, GPT-3.5)
- Choose teaching style
- Pick AI avatar
- Customize tutor personality

**Notifications**:

- Study reminders
- Progress updates
- Quiz results
- New templates alerts

**Appearance**:

- Light/Dark/Auto theme
- Customization options

**Files**:

- `src/app/(dashboard)/settings/page.tsx`

---

## 🎨 Design System

### Azuki-Inspired Theme

**Colors**:

```css
Primary Orange: #FF6B1A
Orange Dark: #E85500
Orange Light: #FF8847
Cream: #F5F1E8
Gold Accent: #F5A623
```

**Typography**:

- Headings: Space Grotesk (Bold)
- Body: Inter
- Japanese Accent: Noto Sans JP

**Design Principles**:

- ✨ Minimalist & Clean layouts
- 🎯 Card-based UI
- 🌊 Smooth 60fps animations
- 🔄 Spring physics interactions
- 🪟 Glassmorphism effects
- 📱 Mobile-first responsive design

---

## 🔐 Authentication

**Location**: `/login`, `/register`

Simple authentication system.

#### Features:

- ✅ Email/password login
- ✅ User registration
- ✅ Demo mode (any credentials work)
- ✅ Password reset (planned)
- ✅ Session management

**Files**:

- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`

---

## 🏗️ Technical Features

### Performance Optimizations

- ✅ Next.js 15 App Router
- ✅ Server-side rendering (SSR)
- ✅ Code splitting
- ✅ Lazy loading components
- ✅ Optimized images

### Database

- ✅ Supabase (PostgreSQL)
- ✅ Row Level Security (RLS)
- ✅ Real-time subscriptions
- ✅ Automatic timestamps
- ✅ Comprehensive indexes

### API Routes

- ✅ RESTful API design
- ✅ Type-safe endpoints
- ✅ Error handling
- ✅ Streaming support (for AI chat)

### Type Safety

- ✅ Full TypeScript coverage
- ✅ Strict mode enabled
- ✅ Type definitions for all APIs
- ✅ No `any` types

---

## 📱 Responsive Design

All features work seamlessly across:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

### Mobile Features:

- Hamburger menu navigation
- Touch-friendly interactions
- Swipe gestures (planned)
- Responsive tables and cards
- Bottom navigation (planned)

---

## ♿ Accessibility

- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ Semantic HTML
- ✅ Color contrast compliance

---

## 🚀 Future Features (Roadmap)

### Planned Features:

- [ ] Real-time collaborative study sessions
- [ ] Video lessons integration
- [ ] Spaced repetition system
- [ ] Gamification (points, levels, badges)
- [ ] Social features (study groups)
- [ ] Mobile app (React Native)
- [ ] Voice-based AI tutor
- [ ] Advanced analytics
- [ ] Export study materials
- [ ] Third-party integrations

### AI Enhancements:

- [ ] AI-generated quizzes
- [ ] Personalized study recommendations
- [ ] Learning style detection
- [ ] Adaptive difficulty
- [ ] Multi-modal AI (voice, vision)

---

## 📊 Usage Examples

### Creating a Study Plan

1. Go to `/study-plans`
2. Click "Create Plan"
3. Enter plan details
4. Add lessons with drag & drop
5. Save and start learning

### Using AI Chat

1. Go to `/chat`
2. Select teaching style
3. Ask questions or upload images
4. Get instant, context-aware help

### Tracking Progress

1. Go to `/progress`
2. View overall statistics
3. Check progress by plan
4. See topic coverage
5. Review achievements

---

## 🎯 Key Metrics

- **Total Pages**: 12+
- **Components**: 50+
- **API Routes**: 5+
- **Database Tables**: 9
- **Lines of Code**: 5000+

---

## 💡 Tips for Users

1. **Use Text Highlight**: Select any text to get instant AI explanations
2. **Customize AI Tutor**: Choose a teaching style that matches your learning preference
3. **Track Streaks**: Study daily to build and maintain your streak
4. **Explore Marketplace**: Find pre-made templates to save time
5. **Schedule Sessions**: Plan your study time for better consistency

---

**Built with modern web technologies for the best learning experience! 🚀**
