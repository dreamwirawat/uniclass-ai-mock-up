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
  X,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  detectArtifactKeywords,
  generateArtifact,
  ArtifactData,
} from "@/lib/artifact-generator";
import { ChartArtifact } from "./artifacts/chart-artifact";
import { DiagramArtifact } from "./artifacts/diagram-artifact";
import { AnatomyArtifact } from "./artifacts/anatomy-artifact";
import { MapArtifact } from "./artifacts/map-artifact";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  context?: string;
  timestamp: Date;
  artifact?: ArtifactData;
}

interface ChatSidebarProps {
  context?: string;
  contextType?: "lesson" | "plan" | "general";
  contextId?: string;
  defaultOpen?: boolean;
  mode?: "drawer" | "inline"; // drawer = floating overlay, inline = part of page
  isOpen?: boolean; // for controlled component
  onOpenChange?: (open: boolean) => void; // for controlled component
}

export function ChatSidebar({
  context,
  contextType = "general",
  contextId,
  defaultOpen = false,
  mode = "drawer",
  isOpen: controlledIsOpen,
  onOpenChange,
}: ChatSidebarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (open: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(open);
    }
    onOpenChange?.(open);
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const getWelcomeMessage = () => {
      switch (contextType) {
        case "lesson":
          return "สวัสดีค่ะ! ฉันพร้อมช่วยเหลือคุณในการทำความเข้าใจบทเรียนนี้ มีคำถามอะไรเกี่ยวกับเนื้อหาไหมคะ?";
        case "plan":
          return "สวัสดีค่ะ! ฉันพร้อมช่วยวางแผนการเรียนและตอบคำถามเกี่ยวกับ Study Plan ของคุณ ต้องการความช่วยเหลืออะไรไหมคะ?";
        default:
          return "สวัสดีค่ะ! ฉันคือติวเตอร์ AI ของคุณ พร้อมช่วยเหลือคุณในการเรียนรู้ค่ะ";
      }
    };

    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: getWelcomeMessage(),
          timestamp: new Date(),
        },
      ]);
    }
  }, [contextType, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

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

    // Simulate AI response
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
          contextualResponse = `แสดงโครงสร้างร่างกายมนุษย์ให้คุณดูค่ะ 🫀\n\nนี่คือแผนภาพร่างกายมนุษย์แบบ interactive คุณสามารถคลิกที่อวัยวะต่างๆ เพื่อดูรายละเอียดได้เลยนะคะ`;
        } else if (artifactType === "map") {
          contextualResponse = `สร้างแผนที่ให้คุณดูแล้วค่ะ 🗺️\n\nนี่คือแผนที่แบบ interactive คุณสามารถคลิกที่จุดต่างๆ เพื่อดูข้อมูลเพิ่มเติมได้ค่ะ`;
        }
      } else {
        // Normal response without artifact
        contextualResponse = `เกี่ยวกับ "${userInput}" `;

        if (contextType === "lesson") {
          contextualResponse += `ในบทเรียนนี้ ให้ฉันอธิบายให้ฟังนะคะ...\n\n`;
        } else if (contextType === "plan") {
          contextualResponse += `สำหรับ Study Plan ของคุณ ให้ฉันช่วยวิเคราะห์นะคะ...\n\n`;
        } else {
          contextualResponse += `ให้ฉันช่วยคุณนะคะ...\n\n`;
        }

        contextualResponse += `นี่คือการตอบกลับแบบจำลอง ในระบบจริงจะเชื่อมต่อกับ OpenAI API เพื่อให้คำตอบที่ชาญฉลาดและตรงตามบริบทของคำถามและการเรียนรู้ของคุณค่ะ 🤖`;
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

  // Inline mode - render as part of page
  if (mode === "inline") {
    if (!isOpen) return null;

    return (
      <div className="w-96 bg-background border-l shadow-lg flex flex-col h-full animate-slide-in-right">
        {renderChatContent()}
      </div>
    );
  }

  // Drawer mode - fixed overlay
  return (
    <>
      {/* Toggle Button - Fixed Position */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed right-6 bottom-6 h-14 w-14 rounded-full shadow-lg z-40 hover:scale-110 transition-transform"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 h-screen w-96 bg-background border-l shadow-2xl z-50 transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {renderChatContent()}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );

  function renderChatContent() {
    return (
      <>
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold flex items-center gap-2">
                AI Tutor
                {contextType !== "general" && (
                  <Badge variant="secondary" className="text-xs">
                    {contextType === "lesson" ? "บทเรียน" : "แผนการเรียน"}
                  </Badge>
                )}
              </h3>
              <p className="text-xs text-muted-foreground">
                พร้อมช่วยเหลือตลอด 24/7
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-accent/5">
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
                  message.role === "user" && "flex flex-col items-end"
                )}
              >
                {message.context && (
                  <div className="text-xs p-2 rounded-lg bg-muted/50 border italic text-muted-foreground">
                    Context: "{message.context}"
                  </div>
                )}
                <div
                  className={cn(
                    "p-3 rounded-2xl",
                    message.role === "assistant"
                      ? "bg-muted max-w-[85%]"
                      : "bg-primary text-primary-foreground max-w-[85%]"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>

                {/* Render artifact if present */}
                {message.artifact && message.role === "assistant" && (
                  <div className="w-full">
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
              <div className="p-3 rounded-2xl bg-muted">
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

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="p-3 border-t bg-background">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              💡 คำถามยอดนิยม:
            </p>
            <div className="flex flex-wrap gap-2">
              {getQuickSuggestions(contextType).map((suggestion, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setInput(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              placeholder="พิมพ์คำถามของคุณ..."
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
            กด Enter เพื่อส่งข้อความ
          </p>
        </div>
      </>
    );
  }
}

function getQuickSuggestions(contextType: string): string[] {
  switch (contextType) {
    case "lesson":
      return [
        "อธิบายให้ง่ายขึ้นได้ไหม?",
        "ขอกราฟความก้าวหน้า",
        "ขอแผนผังกระบวนการเรียนรู้",
      ];
    case "plan":
      return ["แนะนำการวางแผนเรียน", "ขอกราฟแบบแท่ง", "ขอแผนที่ภูมิภาคไทย"];
    default:
      return ["อธิบายเรื่องนี้", "ขอดูโครงสร้างร่างกาย", "ขอกราฟวงกลม"];
  }
}
