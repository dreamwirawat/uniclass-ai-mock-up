"use client";

import { use, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Video,
  Link as LinkIcon,
  MessageCircle,
  Clock,
  Play,
  BookOpen,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChatSidebar } from "@/components/chat/chat-sidebar";

interface PageProps {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
}

export default function LessonDetailPage({ params }: PageProps) {
  const { id, lessonId } = use(params);
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // Mock data - in production, fetch based on params
  const lesson = mockLessons.find((l) => l.id === lessonId) || mockLessons[0];
  const studyPlan = {
    id: id,
    title: "เตรียมสอบ IELTS ฉบับสมบูรณ์",
    totalLessons: 20,
  };

  const lessonIndex = mockLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = lessonIndex > 0 ? mockLessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < mockLessons.length - 1 ? mockLessons[lessonIndex + 1] : null;

  const handleComplete = () => {
    setCompleted(true);
    // In production, save progress to database
    setTimeout(() => {
      if (nextLesson) {
        router.push(`/study-plans/${id}/lesson/${nextLesson.id}`);
      } else {
        router.push(`/study-plans/${id}`);
      }
    }, 1500);
  };

  const handleStartQuiz = () => {
    router.push(`/study-plans/${id}/lesson/${lessonId}/quiz`);
  };

  return (
    <>
      <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/study-plans/${id}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline">
                  Lesson {lessonIndex + 1} of {studyPlan.totalLessons}
                </Badge>
                {lesson.completed && (
                  <Badge className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-display font-bold">
                {lesson.title}
              </h1>
              <p className="text-muted-foreground mt-1">{studyPlan.title}</p>
            </div>
          </div>
          <Button
            variant={completed ? "outline" : "default"}
            className="gap-2"
            onClick={() => setShowQuiz(!showQuiz)}
          >
            <MessageCircle className="h-4 w-4" />
            Ask AI Tutor
          </Button>
        </div>

        {/* Progress Bar */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">Study Plan Progress</span>
              <span className="text-muted-foreground">
                {lessonIndex + 1} / {studyPlan.totalLessons}
              </span>
            </div>
            <Progress
              value={((lessonIndex + 1) / studyPlan.totalLessons) * 100}
              className="h-2"
            />
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Content */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Lesson Content
                  </CardTitle>
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {lesson.duration} min
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <div className="space-y-4">
                  {lesson.content.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold mb-2">
                        {section.heading}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Example Box */}
                {lesson.example && (
                  <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Play className="h-4 w-4 text-primary" />
                      ตัวอย่าง
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {lesson.example}
                    </p>
                  </div>
                )}

                {/* Key Points */}
                {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                  <div className="mt-6 p-4 rounded-lg bg-accent/50 border">
                    <h4 className="font-semibold mb-3">สรุปประเด็นสำคัญ</h4>
                    <ul className="space-y-2">
                      {lesson.keyPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quiz Section */}
            {lesson.hasQuiz && (
              <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                  <CardTitle>แบบทดสอบ</CardTitle>
                  <CardDescription>
                    ทดสอบความเข้าใจของคุณในบทเรียนนี้
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {lesson.quizQuestions} คำถาม • {lesson.quizDuration}{" "}
                        นาที
                      </p>
                      <p className="text-xs text-muted-foreground">
                        คะแนนผ่าน: 70%
                      </p>
                    </div>
                    <Button onClick={handleStartQuiz} className="gap-2">
                      <Play className="h-4 w-4" />
                      เริ่มทำแบบทดสอบ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              {prevLesson ? (
                <Link href={`/study-plans/${id}/lesson/${prevLesson.id}`}>
                  <Button variant="outline" className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    บทก่อนหน้า
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              {!completed && (
                <Button onClick={handleComplete} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  ทำเครื่องหมายว่าเสร็จสิ้น
                </Button>
              )}

              {completed && nextLesson && (
                <Link href={`/study-plans/${id}/lesson/${nextLesson.id}`}>
                  <Button className="gap-2">
                    บทถัดไป
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lesson.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 hover:bg-accent/50 transition-all group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      {resource.type === "video" && (
                        <Video className="h-5 w-5 text-primary" />
                      )}
                      {resource.type === "document" && (
                        <FileText className="h-5 w-5 text-primary" />
                      )}
                      {resource.type === "link" && (
                        <LinkIcon className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {resource.title}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {resource.type}
                      </p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/chat?context=lesson-${lessonId}`}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Ask AI about this lesson
                  </Button>
                </Link>
                <Link href={`/schedule?create=true&lesson=${lessonId}`}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Schedule Review
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Lesson List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All Lessons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {mockLessons.map((l, idx) => (
                  <Link
                    key={l.id}
                    href={`/study-plans/${id}/lesson/${l.id}`}
                    className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                      l.id === lessonId
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                  >
                    {l.completed ? (
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 flex-shrink-0" />
                    )}
                    <span className="flex-1 truncate">
                      {idx + 1}. {l.title}
                    </span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Completion Modal */}
        {completed && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <Card className="w-full max-w-md m-4">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">
                    เยี่ยมมาก! 🎉
                  </h3>
                  <p className="text-muted-foreground">
                    คุณทำบทเรียนนี้เสร็จสิ้นแล้ว
                  </p>
                </div>
                {nextLesson && (
                  <p className="text-sm text-muted-foreground">
                    กำลังไปยังบทเรียนถัดไป...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* AI Chat Sidebar */}
      <ChatSidebar contextType="lesson" contextId={lessonId} />
    </>
  );
}

// Mock data
const mockLessons = [
  {
    id: "1",
    title: "แนะนำรูปแบบข้อสอบ IELTS",
    duration: 30,
    completed: true,
    hasQuiz: true,
    quizQuestions: 10,
    quizDuration: 15,
    content: [
      {
        heading: "รูปแบบข้อสอบ IELTS คืออะไร?",
        text: "IELTS (International English Language Testing System) เป็นการทดสอบความสามารถทางภาษาอังกฤษที่ได้รับการยอมรับทั่วโลก ประกอบด้วย 4 ส่วนหลัก คือ Listening, Reading, Writing และ Speaking โดยแต่ละส่วนจะทดสอบทักษะที่แตกต่างกัน",
      },
      {
        heading: "โครงสร้างของข้อสอบ",
        text: "ข้อสอบ IELTS แบ่งออกเป็น 2 ประเภท คือ Academic สำหรับผู้ที่ต้องการเรียนต่อระดับอุดมศึกษา และ General Training สำหรับผู้ที่ต้องการอพยพหรือทำงานในต่างประเทศ",
      },
      {
        heading: "ระยะเวลาในการสอบ",
        text: "การสอบ IELTS ใช้เวลาทั้งหมดประมาณ 2 ชั่วโมง 45 นาที โดยแบ่งเป็น Listening 30 นาที, Reading 60 นาที, Writing 60 นาที และ Speaking 11-14 นาที",
      },
    ],
    example:
      "ตัวอย่าง: หากคุณได้คะแนน Band 7.0 หมายความว่าคุณมีความสามารถในการใช้ภาษาอังกฤษในระดับ Good User สามารถใช้ภาษาได้อย่างมีประสิทธิภาพ แม้จะมีข้อผิดพลาดบางครั้ง",
    keyPoints: [
      "IELTS ประกอบด้วย 4 ส่วน: Listening, Reading, Writing, Speaking",
      "มี 2 ประเภท: Academic และ General Training",
      "คะแนนเต็ม 9.0 แบ่งเป็น 0.5 bands",
      "ผลสอบมีอายุ 2 ปี",
      "สามารถสอบได้หลายครั้งโดยไม่จำกัด",
    ],
    resources: [
      {
        type: "video",
        title: "IELTS Overview Video",
        url: "#",
      },
      {
        type: "document",
        title: "IELTS Format Guide (PDF)",
        url: "#",
      },
      {
        type: "link",
        title: "Official IELTS Website",
        url: "https://www.ielts.org",
      },
    ],
  },
  {
    id: "2",
    title: "ทักษะการอ่าน: การอ่านแบบคร่าวๆ และอ่านเพื่อหาข้อมูล",
    duration: 45,
    completed: true,
    hasQuiz: true,
    quizQuestions: 12,
    quizDuration: 20,
    content: [
      {
        heading: "Skimming - การอ่านแบบคร่าวๆ",
        text: "Skimming คือเทคนิคการอ่านอย่างรวดเร็วเพื่อจับใจความสำคัญของข้อความ โดยไม่ต้องอ่านทุกคำ เหมาะสำหรับการทำความเข้าใจภาพรวมของบทความ",
      },
      {
        heading: "Scanning - การอ่านเพื่อหาข้อมูล",
        text: "Scanning คือการอ่านเพื่อค้นหาข้อมูลเฉพาะเจาะจง เช่น ตัวเลข วันที่ ชื่อ หรือคำศัพท์เฉพาะ โดยไม่ต้องอ่านทั้งบทความ",
      },
      {
        heading: "เมื่อไหร่ควรใช้เทคนิคไหน?",
        text: "ใช้ Skimming เมื่อต้องการเข้าใจภาพรวมหรือหัวข้อหลัก ใช้ Scanning เมื่อต้องการค้นหาข้อมูลเฉพาะเจาะจง ในข้อสอบ IELTS คุณจะต้องใช้ทั้งสองเทคนิคร่วมกัน",
      },
    ],
    example:
      "ตัวอย่าง: หากคำถามถามว่า 'ในปีใดที่มีการก่อตั้งบริษัท?' คุณควรใช้เทคนิค Scanning เพื่อค้นหาตัวเลขปีในบทความ ไม่ต้องอ่านทั้งหมด",
    keyPoints: [
      "Skimming = อ่านเพื่อจับใจความรวม ไม่อ่านทุกคำ",
      "Scanning = อ่านเพื่อหาข้อมูลเฉพาะ",
      "มองหาคำสำคัญ (keywords) ก่อนอ่าน",
      "อ่านพาดหัวและประโยคแรกของแต่ละย่อหน้า",
      "ฝึกฝนเทคนิคเหล่านี้จะช่วยประหยัดเวลาในการสอบ",
    ],
    resources: [
      {
        type: "video",
        title: "Skimming and Scanning Techniques",
        url: "#",
      },
      {
        type: "document",
        title: "Practice Reading Passages",
        url: "#",
      },
      {
        type: "document",
        title: "Reading Strategy Worksheet",
        url: "#",
      },
    ],
  },
  {
    id: "3",
    title: "Writing Task 1: การบรรยายกราฟ",
    duration: 60,
    completed: false,
    hasQuiz: false,
    quizQuestions: 0,
    quizDuration: 0,
    content: [
      {
        heading: "Writing Task 1 คืออะไร?",
        text: "Writing Task 1 ใน IELTS Academic คือการเขียนบรรยายข้อมูลจากกราฟ แผนภูมิ ตาราง หรือแผนผัง โดยต้องเขียนอย่างน้อย 150 คำภายใน 20 นาที",
      },
      {
        heading: "โครงสร้างการเขียน",
        text: "การเขียน Task 1 ควรมี 4 ส่วน: 1) Introduction - แนะนำกราฟ 2) Overview - ภาพรวมของข้อมูล 3) Body Paragraph 1 - รายละเอียดส่วนที่ 1 4) Body Paragraph 2 - รายละเอียดส่วนที่ 2",
      },
      {
        heading: "คำศัพท์และไวยากรณ์ที่สำคัญ",
        text: "ใช้คำกริยาและคำคุณศัพท์ที่หลากหลายในการบรรยายแนวโน้ม เช่น increase, decrease, fluctuate, remain stable, surge, plummet เป็นต้น",
      },
    ],
    example:
      "ตัวอย่างประโยคเปิด: 'The line graph illustrates the changes in the number of international students studying in Australia between 2010 and 2020.'",
    keyPoints: [
      "เขียนอย่างน้อย 150 คำภายใน 20 นาที",
      "เริ่มต้นด้วยการ paraphrase คำถาม",
      "เขียน Overview แสดงแนวโน้มหลัก",
      "ใช้ข้อมูลที่สำคัญ ไม่ต้องเขียนทุกตัวเลข",
      "ใช้คำเชื่อมและไวยากรณ์ที่หลากหลาย",
    ],
    resources: [
      {
        type: "video",
        title: "Writing Task 1 Guide",
        url: "#",
      },
      {
        type: "document",
        title: "Sample Task 1 Essays",
        url: "#",
      },
      {
        type: "document",
        title: "Useful Vocabulary List",
        url: "#",
      },
      {
        type: "link",
        title: "Practice Graphs",
        url: "#",
      },
    ],
  },
];
