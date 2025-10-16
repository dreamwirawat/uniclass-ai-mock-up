"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Flame,
  Clock,
  Target,
  Award,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import {
  getStudyPlans,
  getUserStatistics,
  initializeDefaultData,
} from "@/lib/storage";
import Link from "next/link";

export default function ProgressPage() {
  const [stats, setStats] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    initializeDefaultData();
    const statistics = getUserStatistics();
    const studyPlans = getStudyPlans();
    setStats(statistics);
    setPlans(studyPlans);
  }, []);
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold mb-1">Your Progress</h1>
        <p className="text-sm text-muted-foreground">
          Track your learning journey and achievements
        </p>
      </div>

      {/* Overview Stats */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-accent/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Streak
              </CardTitle>
              <Flame className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold text-primary">
                {stats.currentStreak} days
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Longest: {stats.longestStreak} days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Study Time
              </CardTitle>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold">
                {stats.totalHours.toFixed(1)}h
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all plans
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Lessons Completed
              </CardTitle>
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold">
                {stats.completedLessons}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Out of {stats.totalLessons} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Score
              </CardTitle>
              <Award className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold">
                {stats.averageScore}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">On quizzes</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">By Study Plan</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Completion</CardTitle>
                <CardDescription>
                  Your progress across all study plans
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Progress</span>
                    <span className="font-bold">56%</span>
                  </div>
                  <Progress value={56} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-display font-bold text-primary">
                      45
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-display font-bold">15</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Not Started</p>
                    <p className="text-2xl font-display font-bold">20</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-display font-bold">80</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Study time distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyActivity.map((day) => (
                    <div key={day.day} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{day.day}</span>
                        <span className="text-muted-foreground">
                          {day.hours}h
                        </span>
                      </div>
                      <Progress value={(day.hours / 5) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-gradient-to-br from-primary/5 to-transparent"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{achievement.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          {plans.map((plan) => (
            <Link key={plan.id} href={`/study-plans/${plan.id}`}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{plan.title}</CardTitle>
                      <CardDescription>{plan.category}</CardDescription>
                    </div>
                    <Badge>{plan.progress}%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={plan.progress} />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Completed</p>
                      <p className="font-bold">
                        {plan.completedLessons}/{plan.lessonsCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Duration</p>
                      <p className="font-bold">{plan.estimatedHours}h</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-bold">
                        {plan.progress === 100
                          ? "Done"
                          : plan.progress > 0
                          ? "Active"
                          : "Not Started"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="coverage">
          <Card>
            <CardHeader>
              <CardTitle>Learning Coverage</CardTitle>
              <CardDescription>
                Track what you&apos;ve learned across different topics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {coverageData.map((topic) => (
                  <div key={topic.topic} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{topic.topic}</span>
                      <span className="text-sm text-muted-foreground">
                        {topic.coverage}%
                      </span>
                    </div>
                    <Progress value={topic.coverage} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Study Calendar
              </CardTitle>
              <CardDescription>
                Your learning activity over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Activity heatmap would go here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const weeklyActivity = [
  { day: "วันจันทร์", hours: 2.5 },
  { day: "วันอังคาร", hours: 3.0 },
  { day: "วันพุธ", hours: 1.5 },
  { day: "วันพฤหัสบดี", hours: 2.0 },
  { day: "วันศุกร์", hours: 2.5 },
  { day: "วันเสาร์", hours: 0.5 },
  { day: "วันอาทิตย์", hours: 0.5 },
];

const achievements = [
  { id: "1", icon: "🔥", title: "เรียนต่อเนื่อง 7 วัน", date: "วันนี้" },
  { id: "2", icon: "📚", title: "จบบทเรียนครบ 10 บท", date: "เมื่อวาน" },
  {
    id: "3",
    icon: "⭐",
    title: "ทำแบบทดสอบได้คะแนนเต็ม",
    date: "2 วันที่แล้ว",
  },
];

const studyPlanProgress = [
  {
    id: "1",
    title: "เตรียมสอบ IELTS",
    category: "ภาษา",
    progress: 60,
    completed: 12,
    total: 20,
    timeSpent: 24,
    avgScore: 85,
  },
  {
    id: "2",
    title: "พัฒนาเว็บไซต์",
    category: "โปรแกรมมิ่ง",
    progress: 53,
    completed: 8,
    total: 15,
    timeSpent: 32,
    avgScore: 92,
  },
  {
    id: "3",
    title: "โครงสร้างข้อมูล",
    category: "วิทยาการคอมพิวเตอร์",
    progress: 20,
    completed: 5,
    total: 25,
    timeSpent: 15,
    avgScore: 78,
  },
];

const coverageData = [
  { topic: "ไวยากรณ์และคำศัพท์", coverage: 85 },
  { topic: "ทักษะการพูด", coverage: 70 },
  { topic: "เทคนิคการเขียน", coverage: 65 },
  { topic: "การฟังเพื่อความเข้าใจ", coverage: 75 },
  { topic: "กลยุทธ์การอ่าน", coverage: 80 },
];
