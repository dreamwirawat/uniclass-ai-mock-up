"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Clock,
  BookOpen,
  Star,
  ArrowRight,
  Play,
  Users,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "สวัสดีค่ะ! ยินดีต้อนรับสู่ UniClass AI 🎓\n\nฉันคือติวเตอร์ AI ของคุณ ฉันพร้อมช่วยเหลือคุณในการเรียนรู้ คุณสามารถถามอะไรฉันก็ได้ หรือเลือกจากแผนการเรียนที่แนะนำด้านล่างค่ะ!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "น่าสนใจมากเลยค่ะ! ให้ฉันช่วยอธิบายเรื่องนี้ให้คุณฟังนะคะ...",
        "คำถามที่ดีมากค่ะ! ฉันจะช่วยคุณทำความเข้าใจเรื่องนี้ให้ชัดเจนขึ้น...",
        "เยี่ยมเลยค่ะ! ให้ฉันแนะนำวิธีการเรียนรู้เรื่องนี้ให้คุณนะคะ...",
        "ฉันเข้าใจคำถามของคุณแล้วค่ะ ให้ฉันช่วยตอบและแนะนำเพิ่มเติมนะคะ...",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `${randomResponse}\n\nนี่คือการตอบกลับแบบจำลอง ในระบบจริงจะเชื่อมต่อกับ OpenAI API เพื่อให้คำตอบที่ชาญฉลาดและตรงตามบริบทของคำถามและการเรียนรู้ของคุณค่ะ`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col animate-slide-up">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      AI Tutor Chat
                    </CardTitle>
                    <CardDescription>
                      สนทนากับติวเตอร์ AI ของคุณได้ทันที
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    GPT-4
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3 animate-slide-up",
                        message.role === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      )}
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        {message.role === "assistant" ? (
                          <>
                            <AvatarImage src="/ai-avatar.png" />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage src="/user-avatar.png" />
                            <AvatarFallback className="bg-accent">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        )}
                      </Avatar>

                      <div
                        className={cn(
                          "flex-1 space-y-2",
                          message.role === "user"
                            ? "flex flex-col items-end max-w-[80%]"
                            : "max-w-full"
                        )}
                      >
                        <div
                          className={cn(
                            "p-4 rounded-2xl",
                            message.role === "assistant"
                              ? "bg-muted max-w-[80%]"
                              : "bg-primary text-primary-foreground"
                          )}
                        >
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {message.content}
                          </p>
                        </div>

                        <span className="text-xs text-muted-foreground px-2">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="p-4 rounded-2xl bg-muted">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t bg-background">
                  <div className="flex gap-2">
                    <Input
                      placeholder="ถามอะไรฉันก็ได้ หรือเลือกแผนการเรียนด้านล่าง..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="flex-shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    กด Enter เพื่อส่งข้อความ, Shift + Enter สำหรับบรรทัดใหม่
                  </p>
                </div>
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
