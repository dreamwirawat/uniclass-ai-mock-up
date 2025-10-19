"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatProps {
  className?: string;
  variant?: "compact" | "full" | "sidebar";
  showHeader?: boolean;
  placeholder?: string;
  welcomeMessage?: string;
  maxHeight?: string;
  initialContext?: string;
}

export function Chat({
  className,
  variant = "full",
  showHeader = true,
  placeholder = "ถามอะไรฉันก็ได้...",
  welcomeMessage = "สวัสดีค่ะ! ฉันคือติวเตอร์ AI ของคุณ ฉันพร้อมช่วยเหลือคุณในการเรียนรู้ค่ะ",
  maxHeight = "h-[600px]",
  initialContext,
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const initialMessages: Message[] = [
      {
        id: "1",
        role: "assistant",
        content: welcomeMessage,
        timestamp: new Date(),
      },
    ];

    // If there's initial context, add it as a user message
    if (initialContext) {
      initialMessages.push({
        id: "2",
        role: "user",
        content: initialContext,
        timestamp: new Date(),
      });
    }

    return initialMessages;
  });
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

  const containerClasses = cn(
    "flex flex-col bg-background border rounded-lg overflow-hidden",
    variant === "compact" && "h-[400px]",
    variant === "full" && maxHeight,
    variant === "sidebar" && "h-full",
    className
  );

  return (
    <div className={containerClasses}>
      {/* Header */}
      {showHeader && (
        <div className="border-b p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-display font-bold">AI Tutor</span>
            </div>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              GPT-4
            </Badge>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
              <div
                className={cn(
                  "p-3 rounded-2xl",
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

      {/* Input Area */}
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
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
    </div>
  );
}
