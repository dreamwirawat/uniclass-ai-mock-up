"use client";

import { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function StudyPlanDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    // Try to load from localStorage first
    const savedPlans = JSON.parse(localStorage.getItem("studyPlans") || "[]");
    const savedPlan = savedPlans.find((p: any) => p.id === id);

    if (savedPlan) {
      setPlan(savedPlan);
    } else {
      // Use mock data if not found
      setPlan({
        id: id,
        title: "เตรียมสอบ IELTS ฉบับสมบูรณ์",
        description: "การเตรียมสอบ IELTS แบบครอบคลุมทั้ง 4 ทักษะ",
        category: "ภาษา",
        progress: 60,
        totalLessons: 20,
        completedLessons: 12,
        estimatedHours: 40,
      });
    }
  }, [id]);

  const handleStartLesson = (lessonId: string) => {
    router.push(`/study-plans/${id}/lesson/${lessonId}`);
  };

  const handleContinueLearning = () => {
    // Find first incomplete lesson
    const inProgressLesson = mockLessons.find((l) => l.inProgress);
    const firstIncompleteLesson =
      inProgressLesson || mockLessons.find((l) => !l.completed);

    if (firstIncompleteLesson) {
      router.push(`/study-plans/${id}/lesson/${firstIncompleteLesson.id}`);
    }
  };

  if (!plan) {
    return <div className="animate-fade-in">Loading...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Link href="/study-plans">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Study Plans
        </Button>
      </Link>

      {/* Plan Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Badge>{plan.category}</Badge>
              <CardTitle className="text-3xl">{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </div>
            <Button className="gap-2" onClick={handleContinueLearning}>
              <Play className="h-4 w-4" />
              Continue Learning
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-bold">{plan.progress}%</span>
              </div>
              <Progress value={plan.progress} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-display font-bold text-primary">
                  {plan.completedLessons}
                </div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-display font-bold">
                  {plan.totalLessons}
                </div>
                <p className="text-xs text-muted-foreground">Total Lessons</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-display font-bold">
                  {plan.estimatedHours}h
                </div>
                <p className="text-xs text-muted-foreground">Est. Duration</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons List */}
      <Card>
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
          <CardDescription>
            Complete lessons in order to track your progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockLessons.map((lesson, index) => (
              <div
                key={lesson.id}
                onClick={() => handleStartLesson(lesson.id)}
                className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer group"
              >
                <div className="flex-shrink-0">
                  {lesson.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  ) : lesson.inProgress ? (
                    <div className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                    </div>
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">
                      Lesson {index + 1}
                    </span>
                    {lesson.hasQuiz && (
                      <Badge variant="outline" className="text-xs">
                        Quiz
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {lesson.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {lesson.resources} resources
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={lesson.completed ? "outline" : "default"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartLesson(lesson.id);
                    }}
                  >
                    {lesson.completed
                      ? "Review"
                      : lesson.inProgress
                      ? "Continue"
                      : "Start"}
                  </Button>
                  <Link
                    href={`/chat?context=lesson-${lesson.id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button size="sm" variant="ghost">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const mockLessons = [
  {
    id: "1",
    title: "แนะนำรูปแบบข้อสอบ IELTS",
    duration: 30,
    resources: 3,
    completed: true,
    inProgress: false,
    hasQuiz: true,
  },
  {
    id: "2",
    title: "ทักษะการอ่าน: การอ่านแบบคร่าวๆ และอ่านเพื่อหาข้อมูล",
    duration: 45,
    resources: 5,
    completed: true,
    inProgress: false,
    hasQuiz: true,
  },
  {
    id: "3",
    title: "Writing Task 1: การบรรยายกราฟ",
    duration: 60,
    resources: 4,
    completed: false,
    inProgress: true,
    hasQuiz: false,
  },
  {
    id: "4",
    title: "Writing Task 2: โครงสร้างเรียงความ",
    duration: 60,
    resources: 6,
    completed: false,
    inProgress: false,
    hasQuiz: true,
  },
  {
    id: "5",
    title: "การฟัง: การจดบันทึก",
    duration: 45,
    resources: 4,
    completed: false,
    inProgress: false,
    hasQuiz: true,
  },
];
