"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Plus,
  X,
  MessageCircle,
  MoreHorizontal,
  Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatTab {
  id: string;
  title: string;
  messages: Message[];
  isActive: boolean;
  context?: string;
}

interface MultiTabChatProps {
  className?: string;
  maxTabs?: number;
  storageKey?: string;
}

export function MultiTabChat({
  className,
  maxTabs = 5,
  storageKey = "multi-tab-chat",
}: MultiTabChatProps) {
  const [tabs, setTabs] = useState<ChatTab[]>([
    {
      id: "1",
      title: "New Chat",
      messages: [
        {
          id: "1",
          role: "assistant",
          content:
            "สวัสดีค่ะ! ฉันคือติวเตอร์ AI ของคุณ ฉันพร้อมช่วยเหลือคุณในการเรียนรู้ คุณสามารถถามอะไรฉันก็ได้ค่ะ!",
          timestamp: new Date(),
        },
      ],
      isActive: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [tabs]);

  const activeTab = tabs.find((tab) => tab.isActive) || tabs[0];

  const createNewTab = () => {
    if (tabs.length >= maxTabs) return;

    const newTab: ChatTab = {
      id: Date.now().toString(),
      title: `Chat ${tabs.length + 1}`,
      messages: [
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "สวัสดีค่ะ! ฉันคือติวเตอร์ AI ของคุณ ฉันพร้อมช่วยเหลือคุณในการเรียนรู้ คุณสามารถถามอะไรฉันก็ได้ค่ะ!",
          timestamp: new Date(),
        },
      ],
      isActive: true,
    };

    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({ ...tab, isActive: false })).concat(newTab)
    );
  };

  const switchTab = (tabId: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        isActive: tab.id === tabId,
      }))
    );
  };

  const closeTab = (tabId: string) => {
    if (tabs.length <= 1) return;

    const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
    const isActiveTab = tabs[tabIndex].isActive;

    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((tab) => tab.id !== tabId);

      // If we closed the active tab, activate the next available tab
      if (isActiveTab && newTabs.length > 0) {
        const nextIndex = Math.min(tabIndex, newTabs.length - 1);
        newTabs[nextIndex].isActive = true;
      }

      return newTabs;
    });
  };

  const startEditingTab = (tabId: string, currentTitle: string) => {
    setEditingTabId(tabId);
    setEditingTitle(currentTitle);
  };

  const saveTabTitle = () => {
    if (!editingTabId || !editingTitle.trim()) return;

    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === editingTabId ? { ...tab, title: editingTitle.trim() } : tab
      )
    );

    setEditingTabId(null);
    setEditingTitle("");
  };

  const cancelEditingTab = () => {
    setEditingTabId(null);
    setEditingTitle("");
  };

  const handleSend = async () => {
    if (!input.trim() || !activeTab) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    // Update the active tab with the new message
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === activeTab.id
          ? {
              ...tab,
              messages: [...tab.messages, userMessage],
              title:
                tab.title === "New Chat" || tab.title.startsWith("Chat ")
                  ? input.slice(0, 30) + (input.length > 30 ? "..." : "")
                  : tab.title,
            }
          : tab
      )
    );

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

      setTabs((prevTabs) =>
        prevTabs.map((tab) =>
          tab.id === activeTab.id
            ? { ...tab, messages: [...tab.messages, aiMessage] }
            : tab
        )
      );
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
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Tab Bar */}
      <div className="flex items-center border-b bg-muted/30">
        <div className="flex-1 flex items-center overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "flex items-center gap-2 px-3 py-2 min-w-0 cursor-pointer border-r border-border hover:bg-accent/50 transition-colors group",
                tab.isActive && "bg-background border-b-2 border-b-primary"
              )}
              onClick={() => switchTab(tab.id)}
            >
              <MessageCircle className="h-4 w-4 flex-shrink-0 text-muted-foreground" />

              {editingTabId === tab.id ? (
                <Input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={saveTabTitle}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveTabTitle();
                    if (e.key === "Escape") cancelEditingTab();
                  }}
                  className="h-6 text-sm px-1 py-0"
                  autoFocus
                />
              ) : (
                <span className="text-sm font-medium truncate flex-1">
                  {tab.title}
                </span>
              )}

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditingTab(tab.id, tab.title);
                  }}
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                {tabs.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={createNewTab}
          disabled={tabs.length >= maxTabs}
          className="mx-2 flex-shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab?.messages.map((message) => (
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
              placeholder="ถามอะไรฉันก็ได้..."
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
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              กด Enter เพื่อส่งข้อความ, Shift + Enter สำหรับบรรทัดใหม่
            </p>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              GPT-4
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
