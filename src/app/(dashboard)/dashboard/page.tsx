"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  BookOpen,
  Star,
  ArrowRight,
  Play,
  Users,
  Award,
  MessageCircle,
  TrendingUp,
  Calendar,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Chat } from "@/components/chat/chat";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ยินดีต้อนรับสู่ UniClass AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            แพลตฟอร์มการเรียนรู้แบบ AI ที่ปรับแต่งให้เหมาะกับคุณ พร้อมติวเตอร์
            AI ที่พร้อมช่วยเหลือตลอด 24 ชั่วโมง
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="animate-slide-up">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">
                        Study Plans
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="animate-slide-up"
                style={{ animationDelay: "100ms" }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">85%</p>
                      <p className="text-sm text-muted-foreground">Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="animate-slide-up"
                style={{ animationDelay: "200ms" }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">24h</p>
                      <p className="text-sm text-muted-foreground">This Week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  เริ่มต้นการเรียนรู้ของคุณได้ทันที
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <Link href="/chat">
                    <Button className="w-full gap-2 h-12" variant="default">
                      <MessageCircle className="h-5 w-5" />
                      เริ่มสนทนากับ AI Tutor
                    </Button>
                  </Link>
                  <Link href="/study-plans/create">
                    <Button className="w-full gap-2 h-12" variant="outline">
                      <Plus className="h-5 w-5" />
                      สร้างแผนการเรียนใหม่
                    </Button>
                  </Link>
                  <Link href="/marketplace">
                    <Button className="w-full gap-2 h-12" variant="outline">
                      <BookOpen className="h-5 w-5" />
                      ดูเทมเพลตใน Marketplace
                    </Button>
                  </Link>
                  <Link href="/schedule">
                    <Button className="w-full gap-2 h-12" variant="outline">
                      <Calendar className="h-5 w-5" />
                      จัดตารางเรียน
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Compact Chat Preview */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    AI Tutor Preview
                  </span>
                  <Link href="/chat">
                    <Button variant="ghost" size="sm">
                      เปิดหน้าจอเต็ม
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription>ลองสนทนากับ AI Tutor ได้เลย</CardDescription>
              </CardHeader>
              <CardContent>
                <Chat
                  variant="compact"
                  showHeader={false}
                  placeholder="ลองถามอะไรฉันดู..."
                  welcomeMessage="สวัสดีค่ะ! ฉันพร้อมช่วยเหลือคุณในการเรียนรู้ คุณสามารถถามอะไรฉันก็ได้ค่ะ!"
                />
              </CardContent>
            </Card>
          </div>

          {/* Study Plan Suggestions */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-display font-bold mb-2">
                แผนการเรียนแนะนำ
              </h2>
              <p className="text-muted-foreground">
                เลือกแผนการเรียนที่เหมาะกับคุณ
              </p>
            </div>

            <div className="space-y-4">
              {recommendedStudyPlans.map((plan, index) => (
                <Card
                  key={plan.id}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {plan.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {plan.description}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {plan.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {plan.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {plan.lessons} บทเรียน
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {plan.students} คนเรียน
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">
                          {plan.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({plan.reviews} รีวิว)
                        </span>
                      </div>
                      <Link href={`/study-plans/${plan.id}`}>
                        <Button
                          size="sm"
                          className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          <Play className="h-4 w-4" />
                          เริ่มเรียน
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    <span className="font-display font-bold text-lg">
                      สถิติการเรียนรู้
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        1,250+
                      </div>
                      <div className="text-xs text-muted-foreground">
                        นักเรียนที่เรียนจบ
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">95%</div>
                      <div className="text-xs text-muted-foreground">
                        ความพึงพอใจ
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data for recommended study plans
const recommendedStudyPlans = [
  {
    id: "ielts-prep",
    title: "เตรียมสอบ IELTS ฉบับสมบูรณ์",
    description: "เตรียมความพร้อมสำหรับการสอบ IELTS ทุกทักษะ",
    duration: "8 สัปดาห์",
    lessons: 32,
    difficulty: "ปานกลาง",
    students: 1250,
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "web-dev-basics",
    title: "พื้นฐานการพัฒนาเว็บไซต์",
    description: "เรียนรู้ HTML, CSS, JavaScript และ React",
    duration: "6 สัปดาห์",
    lessons: 24,
    difficulty: "เริ่มต้น",
    students: 890,
    rating: 4.7,
    reviews: 98,
  },
  {
    id: "data-structures",
    title: "โครงสร้างข้อมูลและอัลกอริทึม",
    description: "พื้นฐานสำคัญสำหรับการเขียนโปรแกรม",
    duration: "10 สัปดาห์",
    lessons: 40,
    difficulty: "ยาก",
    students: 650,
    rating: 4.9,
    reviews: 87,
  },
  {
    id: "business-english",
    title: "ภาษาอังกฤษธุรกิจ",
    description: "พัฒนาทักษะภาษาอังกฤษสำหรับการทำงาน",
    duration: "4 สัปดาห์",
    lessons: 16,
    difficulty: "ปานกลาง",
    students: 420,
    rating: 4.6,
    reviews: 45,
  },
];
