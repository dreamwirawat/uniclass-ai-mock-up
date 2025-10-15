import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function StudyPlansPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">
            My Study Plans
          </h1>
          <p className="text-muted-foreground">
            Manage your personalized learning paths
          </p>
        </div>
        <Link href="/study-plans/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Plan
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          All Plans
        </Button>
        <Button variant="ghost" size="sm">
          In Progress
        </Button>
        <Button variant="ghost" size="sm">
          Completed
        </Button>
        <Button variant="ghost" size="sm">
          Templates
        </Button>
      </div>

      {/* Study Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPlans.map((plan) => (
          <Card
            key={plan.id}
            className="flex flex-col hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant={plan.is_template ? "secondary" : "default"}>
                  {plan.is_template ? "Template" : plan.category}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {plan.lessonsCount} lessons
                </span>
              </div>
              <CardTitle className="line-clamp-1">{plan.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {plan.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{plan.progress}%</span>
                  </div>
                  <Progress value={plan.progress} />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {plan.lessonsCount} lessons
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {plan.estimatedHours}h
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((plan.progress / 100) * plan.lessonsCount)}{" "}
                      done
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="gap-2">
              <Link href={`/study-plans/${plan.id}`} className="flex-1">
                <Button variant="default" className="w-full">
                  Continue Learning
                </Button>
              </Link>
              <Button variant="outline" size="icon">
                <BookOpen className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Create New Card */}
        <Link href="/study-plans/create">
          <Card className="flex flex-col items-center justify-center h-full min-h-[300px] border-dashed hover:border-primary hover:bg-accent/50 transition-all cursor-pointer group">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold mb-1">Create New Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Start a custom learning path
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}

// Mock data
const mockPlans = [
  {
    id: "1",
    title: "เตรียมสอบ IELTS ฉบับสมบูรณ์",
    description:
      "การเตรียมสอบ IELTS แบบครอบคลุมทั้ง 4 ทักษะ: อ่าน เขียน ฟัง และพูด พร้อมเทคนิคและแนวข้อสอบจริง",
    category: "ภาษา",
    lessonsCount: 20,
    estimatedHours: 40,
    progress: 60,
    is_template: false,
  },
  {
    id: "2",
    title: "พัฒนาเว็บไซต์แบบ Full-Stack",
    description:
      "เรียนรู้ HTML, CSS, JavaScript, React, Node.js และฐานข้อมูล เพื่อเป็นนักพัฒนาเว็บ Full-Stack",
    category: "โปรแกรมมิ่ง",
    lessonsCount: 35,
    estimatedHours: 80,
    progress: 45,
    is_template: false,
  },
  {
    id: "3",
    title: "โครงสร้างข้อมูลและอัลกอริทึม",
    description:
      "เชี่ยวชาญโครงสร้างข้อมูลและอัลกอริทึมพื้นฐานสำหรับสัมภาษณ์งานและการแข่งขันเขียนโปรแกรม",
    category: "วิทยาการคอมพิวเตอร์",
    lessonsCount: 25,
    estimatedHours: 50,
    progress: 20,
    is_template: false,
  },
  {
    id: "4",
    title: "ภาษาอังกฤษธุรกิจเชิงลึก",
    description:
      "ภาษาอังกฤษระดับมืออาชีพสำหรับการสื่อสารทางธุรกิจ การนำเสนอ และการประชุม",
    category: "ภาษา",
    lessonsCount: 15,
    estimatedHours: 25,
    progress: 0,
    is_template: true,
  },
  {
    id: "5",
    title: "Python สำหรับ Data Science",
    description:
      "เรียนรู้การเขียนโปรแกรม Python เน้นการวิเคราะห์ข้อมูล pandas, numpy และการแสดงผลข้อมูล",
    category: "โปรแกรมมิ่ง",
    lessonsCount: 30,
    estimatedHours: 60,
    progress: 80,
    is_template: false,
  },
];
