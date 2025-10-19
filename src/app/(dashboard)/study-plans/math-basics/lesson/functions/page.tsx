"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MathGraph } from "@/components/math/math-visualization";
import {
  Calculator,
  BookOpen,
  Clock,
  CheckCircle2,
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function MathLessonPage() {
  const [activeTab, setActiveTab] = useState("content");

  const mathEquations = [
    {
      id: "1",
      equation: "f(x) = x^2",
      type: "function" as const,
      title: "ฟังก์ชันกำลังสอง",
      description: "กราฟพาราโบลาที่เปิดขึ้น",
    },
    {
      id: "2",
      equation: "f(x) = sin(x)",
      type: "function" as const,
      title: "ฟังก์ชันไซน์",
      description: "กราฟคลื่นไซน์ที่มีคาบ 2π",
    },
    {
      id: "3",
      equation: "f(x) = e^x",
      type: "function" as const,
      title: "ฟังก์ชันเอกซ์โพเนนเชียล",
      description: "กราฟที่เพิ่มขึ้นแบบเอกซ์โพเนนเชียล",
    },
    {
      id: "4",
      equation: "f(x) = log(x)",
      type: "function" as const,
      title: "ฟังก์ชันลอการิทึม",
      description: "กราฟที่เพิ่มขึ้นแบบลอการิทึม",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/study-plans/math-basics">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline">Lesson 3 of 10</Badge>
              <Badge className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </Badge>
            </div>
            <h1 className="text-2xl font-display font-bold">
              ฟังก์ชันและกราฟพื้นฐาน
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              คณิตศาสตร์พื้นฐาน - ฟังก์ชันและกราฟ
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            45 min
          </Badge>
          <Button className="gap-2">
            บทถัดไป
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">Study Plan Progress</span>
            <span className="text-muted-foreground">3 / 10</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: "30%" }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content with Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Lesson Materials
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Calculator className="h-3 w-3" />
              Math Content
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="graphs">Interactive Graphs</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6 mt-6">
              <div className="prose prose-sm max-w-none">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      ฟังก์ชันคืออะไร?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      ฟังก์ชันคือความสัมพันธ์ระหว่างตัวแปรสองตัว
                      โดยที่แต่ละค่าของตัวแปรต้น (x) จะมีค่าของตัวแปรตาม (y)
                      เพียงค่าเดียว
                    </p>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Play className="h-4 w-4 text-primary" />
                        ตัวอย่างฟังก์ชันพื้นฐาน
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          • <strong>ฟังก์ชันเชิงเส้น:</strong> f(x) = mx + b
                        </li>
                        <li>
                          • <strong>ฟังก์ชันกำลังสอง:</strong> f(x) = ax² + bx +
                          c
                        </li>
                        <li>
                          • <strong>ฟังก์ชันตรีโกณมิติ:</strong> f(x) = sin(x),
                          cos(x), tan(x)
                        </li>
                        <li>
                          • <strong>ฟังก์ชันเอกซ์โพเนนเชียล:</strong> f(x) = aˣ
                        </li>
                        <li>
                          • <strong>ฟังก์ชันลอการิทึม:</strong> f(x) = logₐ(x)
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">การอ่านกราฟ</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      กราฟช่วยให้เราเห็นภาพของฟังก์ชันได้ชัดเจนขึ้น
                      เราสามารถดูได้ว่า:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>ฟังก์ชันเพิ่มขึ้นหรือลดลง</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>จุดสูงสุดและจุดต่ำสุด</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>จุดตัดกับแกน x และ y</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>พฤติกรรมของฟังก์ชันเมื่อ x เข้าใกล้ค่าต่างๆ</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      สรุปประเด็นสำคัญ
                    </h3>
                    <div className="p-4 rounded-lg bg-accent/50 border">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>
                            ฟังก์ชันคือความสัมพันธ์ที่แต่ละ x มี y เพียงค่าเดียว
                          </span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>กราฟช่วยให้เห็นภาพของฟังก์ชันได้ชัดเจน</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>
                            ฟังก์ชันแต่ละประเภทมีลักษณะกราฟที่แตกต่างกัน
                          </span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>การอ่านกราฟช่วยในการแก้ปัญหาทางคณิตศาสตร์</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Interactive Graphs Tab */}
            <TabsContent value="graphs" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  กราฟฟังก์ชันแบบ Interactive
                </h3>
                <p className="text-muted-foreground mb-6">
                  คลิกที่ปุ่ม "แสดงกราฟ" เพื่อดูกราฟแบบ interactive
                  คุณสามารถซูม, ปั่น, และสำรวจกราฟได้
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  {mathEquations.map((eq) => (
                    <MathGraph
                      key={eq.id}
                      equation={eq.equation}
                      type={eq.type}
                      title={eq.title}
                      description={eq.description}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Quiz Tab */}
            <TabsContent value="quiz" className="space-y-6 mt-6">
              <div className="text-center py-8">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  แบบทดสอบฟังก์ชันและกราฟ
                </h3>
                <p className="text-muted-foreground mb-6">
                  ทดสอบความเข้าใจของคุณเกี่ยวกับฟังก์ชันและกราฟ
                </p>

                <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto mb-6">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">8</div>
                    <div className="text-sm text-muted-foreground">คำถาม</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">15</div>
                    <div className="text-sm text-muted-foreground">นาที</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">70%</div>
                    <div className="text-sm text-muted-foreground">
                      คะแนนผ่าน
                    </div>
                  </div>
                </div>

                <Button size="lg" className="gap-2">
                  <Play className="h-5 w-5" />
                  เริ่มทำแบบทดสอบ
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
