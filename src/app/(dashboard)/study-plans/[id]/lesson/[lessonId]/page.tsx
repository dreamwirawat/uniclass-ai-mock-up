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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Download,
  File,
  Image as ImageIcon,
  FileVideo,
  FileAudio,
  Folder,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ResizablePanel } from "@/components/ui/resizable-panel";
import { ContentEnhancer } from "@/components/ai/content-generator";

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
  const [showAIChat, setShowAIChat] = useState(true);
  const [activeTab, setActiveTab] = useState("content");

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

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video":
        return <FileVideo className="h-5 w-5" />;
      case "audio":
        return <FileAudio className="h-5 w-5" />;
      case "image":
        return <ImageIcon className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-6rem)] overflow-hidden">
      <div className="flex-1 space-y-6 animate-fade-in overflow-y-auto pr-2">
        {/* Header */}
        <div className="flex items-center justify-between sticky top-0 bg-background z-10 pb-4 border-b mb-4">
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
              <h1 className="text-2xl font-display font-bold">
                {lesson.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {studyPlan.title}
              </p>
            </div>
          </div>
          <Button
            variant={showAIChat ? "default" : "outline"}
            className="gap-2"
            onClick={() => setShowAIChat(!showAIChat)}
          >
            <MessageCircle className="h-4 w-4" />
            {showAIChat ? "ซ่อน AI Tutor" : "แสดง AI Tutor"}
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

        {/* Main Content with Tabs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Lesson Materials
              </CardTitle>
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {lesson.duration} min
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
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6 mt-6">
                <ContentEnhancer
                  content={lesson.content
                    .map((section) => `${section.heading}\n${section.text}`)
                    .join("\n\n")}
                />

                {/* Example Box */}
                {lesson.example && (
                  <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Play className="h-4 w-4 text-primary" />
                      ตัวอย่าง
                    </h4>
                    <ContentEnhancer content={lesson.example} />
                  </div>
                )}

                {/* Key Points */}
                {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                  <div className="mt-6 p-4 rounded-lg bg-accent/50 border">
                    <h4 className="font-semibold mb-3">สรุปประเด็นสำคัญ</h4>
                    <ContentEnhancer
                      content={lesson.keyPoints
                        .map((point, idx) => `${idx + 1}. ${point}`)
                        .join("\n")}
                    />
                  </div>
                )}
              </TabsContent>

              {/* Files Tab */}
              <TabsContent value="files" className="space-y-4 mt-6">
                <div className="space-y-3">
                  {lesson.resources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary/50 hover:bg-accent/50 transition-all group"
                    >
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        {getFileIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">
                          {resource.title}
                        </h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {resource.type} • {Math.floor(Math.random() * 10) + 1}
                          MB
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Files Section */}
                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Additional Resources</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {additionalFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 hover:bg-accent/50 transition-all group"
                      >
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {file.size}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Quiz Tab */}
              <TabsContent value="quiz" className="space-y-4 mt-6">
                {lesson.hasQuiz ? (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Play className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        แบบทดสอบบทเรียน
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        ทดสอบความเข้าใจของคุณในบทเรียนนี้
                      </p>

                      <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto mb-6">
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                          <div className="text-2xl font-bold text-primary">
                            {lesson.quizQuestions}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            คำถาม
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                          <div className="text-2xl font-bold text-primary">
                            {lesson.quizDuration}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            นาที
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                          <div className="text-2xl font-bold text-primary">
                            70%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            คะแนนผ่าน
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleStartQuiz}
                        size="lg"
                        className="gap-2"
                      >
                        <Play className="h-5 w-5" />
                        เริ่มทำแบบทดสอบ
                      </Button>
                    </div>

                    {/* Quiz Instructions */}
                    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          คำแนะนำการทำแบบทดสอบ
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">อ่านคำถามให้ละเอียด</p>
                            <p className="text-sm text-muted-foreground">
                              ทำความเข้าใจคำถามก่อนตอบ
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">
                              ใช้เวลาอย่างมีประสิทธิภาพ
                            </p>
                            <p className="text-sm text-muted-foreground">
                              มีเวลา {lesson.quizDuration} นาทีสำหรับ{" "}
                              {lesson.quizQuestions} คำถาม
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">ตรวจสอบคำตอบก่อนส่ง</p>
                            <p className="text-sm text-muted-foreground">
                              ใช้เวลาสุดท้ายในการตรวจสอบ
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Play className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      ไม่มีแบบทดสอบ
                    </h3>
                    <p className="text-muted-foreground">
                      บทเรียนนี้ไม่มีแบบทดสอบ คุณสามารถไปยังบทเรียนถัดไปได้เลย
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

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

          <div className="flex gap-2">
            {!lesson.completed && !completed && (
              <Button onClick={handleComplete} className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                ทำเครื่องหมายว่าเสร็จสิ้น
              </Button>
            )}

            {(lesson.completed || completed) && nextLesson && (
              <Link href={`/study-plans/${id}/lesson/${nextLesson.id}`}>
                <Button className="gap-2">
                  บทถัดไป
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
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

      {/* AI Chat Sidebar - Resizable */}
      {showAIChat && (
        <ResizablePanel
          defaultWidth={400}
          minWidth={300}
          maxWidth={600}
          storageKey={`chat-panel-width-${lessonId}`}
          className="animate-in slide-in-from-right duration-300"
        >
          <ChatSidebar
            mode="inline"
            contextType="lesson"
            contextId={lessonId}
            isOpen={showAIChat}
            onOpenChange={setShowAIChat}
          />
        </ResizablePanel>
      )}
    </div>
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

// Additional files for the Files tab
const additionalFiles = [
  {
    name: "IELTS Reading Practice Test 1.pdf",
    type: "document",
    size: "2.3 MB",
  },
  {
    name: "Vocabulary List - Academic Words.docx",
    type: "document",
    size: "1.8 MB",
  },
  { name: "Sample Essays Collection.pdf", type: "document", size: "4.1 MB" },
  { name: "Pronunciation Guide.mp3", type: "audio", size: "15.2 MB" },
  { name: "Speaking Practice Video.mp4", type: "video", size: "45.7 MB" },
  { name: "Grammar Reference Sheet.pdf", type: "document", size: "3.2 MB" },
];
