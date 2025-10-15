import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  Clock,
  Flame,
  MessageCircle,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-display font-bold mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's your learning progress and upcoming sessions.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Flame className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">Keep it up! 🔥</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-bold">12.5h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-bold">68%</div>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Study Plans */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Study Plans</CardTitle>
                <CardDescription>Your active learning paths</CardDescription>
              </div>
              <Link href="/study-plans/create">
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Plan
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockStudyPlans.map((plan) => (
              <Link
                key={plan.id}
                href={`/study-plans/${plan.id}`}
                className="block p-4 rounded-lg border hover:border-primary/50 hover:bg-accent/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{plan.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {plan.lessonsCompleted}/{plan.totalLessons}
                  </span>
                </div>
                <Progress
                  value={(plan.lessonsCompleted / plan.totalLessons) * 100}
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground">{plan.category}</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Scheduled study time</CardDescription>
              </div>
              <Link href="/schedule">
                <Button size="sm" variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  View Calendar
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {session.day}
                    </span>
                    <span className="text-lg font-bold">{session.date}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{session.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {session.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into your learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/chat">
              <Button variant="outline" className="w-full gap-2 justify-start">
                <MessageCircle className="h-4 w-4" />
                Ask AI Tutor
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="outline" className="w-full gap-2 justify-start">
                <BookOpen className="h-4 w-4" />
                Browse Templates
              </Button>
            </Link>
            <Link href="/progress">
              <Button variant="outline" className="w-full gap-2 justify-start">
                <Clock className="h-4 w-4" />
                View Progress
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Mock data
const mockStudyPlans = [
  {
    id: "1",
    title: "เตรียมสอบ IELTS",
    category: "ภาษา",
    lessonsCompleted: 12,
    totalLessons: 20,
  },
  {
    id: "2",
    title: "พื้นฐานการพัฒนาเว็บไซต์",
    category: "โปรแกรมมิ่ง",
    lessonsCompleted: 8,
    totalLessons: 15,
  },
  {
    id: "3",
    title: "โครงสร้างข้อมูลและอัลกอริทึม",
    category: "วิทยาการคอมพิวเตอร์",
    lessonsCompleted: 5,
    totalLessons: 25,
  },
];

const mockSessions = [
  {
    id: "1",
    day: "จ",
    date: "15",
    title: "ฝึกพูด IELTS",
    time: "14:00 - 15:30 น.",
  },
  {
    id: "2",
    day: "อ",
    date: "16",
    title: "เรียนรู้ React Hooks เชิงลึก",
    time: "10:00 - 11:30 น.",
  },
  {
    id: "3",
    day: "พ",
    date: "17",
    title: "ฝึกแก้อัลกอริทึม",
    time: "15:00 - 17:00 น.",
  },
];
