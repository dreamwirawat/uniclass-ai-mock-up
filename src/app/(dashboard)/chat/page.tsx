"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
import { Send, Bot, User, Sparkles, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  detectArtifactKeywords,
  generateArtifact,
  ArtifactData,
} from "@/lib/artifact-generator";
import { ChartArtifact } from "@/components/chat/artifacts/chart-artifact";
import { DiagramArtifact } from "@/components/chat/artifacts/diagram-artifact";
import { AnatomyArtifact } from "@/components/chat/artifacts/anatomy-artifact";
import { MapArtifact } from "@/components/chat/artifacts/map-artifact";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  context?: string;
  timestamp: Date;
  artifact?: ArtifactData;
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const context = searchParams.get("context");

  // Determine context message based on URL params
  const getInitialMessage = () => {
    if (context?.startsWith("lesson-")) {
      const lessonId = context.replace("lesson-", "");
      return `สวัสดีค่ะ! ฉันเห็นว่าคุณกำลังเรียนบทเรียนนี้อยู่ ฉันพร้อมช่วยเหลือคุณในการทำความเข้าใจเนื้อหา! มีอะไรที่คุณต้องการถามเกี่ยวกับบทเรียนนี้ไหมคะ?`;
    }
    if (context?.startsWith("plan-")) {
      return `สวัสดีค่ะ! ฉันเห็นว่าคุณกำลังดู Study Plan นี้ ต้องการคำแนะนำหรือความช่วยเหลืออะไรไหมคะ?`;
    }
    return "สวัสดีค่ะ! ฉันคือติวเตอร์ AI ของคุณ ฉันพร้อมช่วยเหลือคุณในการเรียนรู้ คุณสามารถถามอะไรฉันก็ได้ หรือไฮไลต์ข้อความใดๆ เพื่อรับคำอธิบายทันทีค่ะ!";
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: getInitialMessage(),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentContext, setCurrentContext] = useState(context);

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

    // Detect if user wants an artifact
    const artifactType = detectArtifactKeywords(userInput);

    // Simulate AI response with context awareness
    setTimeout(() => {
      let contextualResponse = "";
      let artifact: ArtifactData | undefined;

      // Generate artifact if keyword detected
      if (artifactType) {
        artifact = generateArtifact(artifactType, userInput) || undefined;

        if (artifactType === "chart") {
          contextualResponse = `แน่นอนค่ะ! ฉันสร้างกราฟให้คุณดูแล้วนะคะ 📊\n\nกราฟนี้แสดง${artifact?.props.title} ซึ่งจะช่วยให้คุณเห็นภาพรวมได้ชัดเจนขึ้น คุณสามารถดูรายละเอียดแต่ละส่วนได้เลยค่ะ`;
        } else if (artifactType === "diagram") {
          contextualResponse = `ให้ฉันสร้างแผนผังให้คุณดูนะคะ 🗺️\n\nแผนผังนี้แสดงขั้นตอนและความสัมพันธ์ต่างๆ ที่เกี่ยวข้อง จะช่วยให้คุณเข้าใจกระบวนการได้ง่ายขึ้นค่ะ`;
        } else if (artifactType === "anatomy") {
          contextualResponse = `แสดงโครงสร้างร่างกายมนุษย์ให้คุณดูค่ะ 🫀\n\นี่คือแผนภาพร่างกายมนุษย์แบบ interactive คุณสามารถคลิกที่อวัยวะต่างๆ เพื่อดูรายละเอียดได้เลยนะคะ`;
        } else if (artifactType === "map") {
          contextualResponse = `สร้างแผนที่ให้คุณดูแล้วค่ะ 🗺️\n\nนี่คือแผนที่แบบ interactive คุณสามารถคลิกที่จุดต่างๆ เพื่อดูข้อมูลเพิ่มเติมได้ค่ะ`;
        }
      } else {
        // Normal response without artifact
        contextualResponse = `ฉันเข้าใจว่าคุณกำลังถามเกี่ยวกับ "${userInput}" `;

        if (currentContext?.startsWith("lesson-")) {
          contextualResponse += `ในบทเรียนนี้ ให้ฉันช่วยอธิบายให้ชัดเจนนะคะ...\n\n`;
        } else if (currentContext?.startsWith("plan-")) {
          contextualResponse += `สำหรับ Study Plan ของคุณ ให้ฉันช่วยวางแผนการเรียนนะคะ...\n\n`;
        } else {
          contextualResponse += `ให้ฉันช่วยคุณนะคะ...\n\n`;
        }

        contextualResponse += `นี่คือการตอบกลับแบบจำลอง ในระบบจริงจะเชื่อมต่อกับ OpenAI API เพื่อให้คำตอบที่ชาญฉลาดและตรงตามบริบทของคำถามและการเรียนรู้ของคุณค่ะ`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: contextualResponse,
        timestamp: new Date(),
        artifact,
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

  const renderArtifact = (artifact: ArtifactData) => {
    switch (artifact.type) {
      case "chart":
        return <ChartArtifact {...artifact.props} />;
      case "diagram":
        return <DiagramArtifact {...artifact.props} />;
      case "anatomy":
        return <AnatomyArtifact {...artifact.props} />;
      case "map":
        return <MapArtifact {...artifact.props} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 animate-fade-in">
      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Tutor Chat
                  {currentContext && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {currentContext.startsWith("lesson-")
                        ? "In Lesson"
                        : "In Study Plan"}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Ask questions or highlight text for instant help
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
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
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
                    {message.context && (
                      <div className="text-xs p-2 rounded-lg bg-muted/50 border italic">
                        Context: "{message.context}"
                      </div>
                    )}
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

                    {/* Render artifact if present */}
                    {message.artifact && message.role === "assistant" && (
                      <div className="w-full max-w-4xl">
                        {renderArtifact(message.artifact)}
                      </div>
                    )}

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
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Ask anything or highlight text to get help..."
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
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="w-80 space-y-4 hidden lg:block">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tutor Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Teaching Style</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Encouraging", "Socratic", "Strict", "Friendly"].map(
                  (style) => (
                    <Button
                      key={style}
                      variant={style === "Encouraging" ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                    >
                      {style}
                    </Button>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Topics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickTopics.map((topic) => (
              <Button
                key={topic}
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => setInput(topic)}
              >
                {topic}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6 space-y-3">
            <div>
              <h3 className="font-display font-bold text-sm mb-2">
                💡 Pro Tips
              </h3>
              <p className="text-xs text-muted-foreground">
                Highlight any text while studying to ask questions about it
                instantly!
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-sm mb-2">
                🎨 Interactive Artifacts
              </h3>
              <p className="text-xs text-muted-foreground">
                ลองพิมพ์ "ขอกราฟ", "ขอแผนผัง", "ขอดูร่างกาย" หรือ "ขอแผนที่"
                เพื่อดู visualization แบบ interactive!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const quickTopics = [
  "อธิบายแนวคิดนี้แบบง่ายๆ",
  "ขอกราฟความก้าวหน้า",
  "ขอแผนผังกระบวนการเรียนรู้",
  "ขอดูโครงสร้างร่างกาย",
  "ขอแผนที่ภูมิภาคไทย",
  "ยกตัวอย่างให้หน่อยได้ไหม?",
];
