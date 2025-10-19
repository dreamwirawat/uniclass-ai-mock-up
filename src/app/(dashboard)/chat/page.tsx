"use client";

import { useState, useRef, useEffect, Suspense } from "react";
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
import { MultiTabChat } from "@/components/chat/multi-tab-chat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  context?: string;
  timestamp: Date;
  artifact?: ArtifactData;
}

function ChatPageContent() {
  const searchParams = useSearchParams();
  const context = searchParams.get("context");

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 animate-fade-in">
      {/* Multi-Tab Chat Interface */}
      <div className="flex-1">
        <MultiTabChat
          className="h-full rounded-lg border"
          maxTabs={5}
          storageKey="main-chat-tabs"
        />
      </div>

      {/* Sidebar */}
      <div className="w-80 space-y-4 hidden lg:block">
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
                ลองพิมพ์ &quot;ขอกราฟ&quot;, &quot;ขอแผนผัง&quot;,
                &quot;ขอดูร่างกาย&quot; หรือ &quot;ขอแผนที่&quot; เพื่อดู
                visualization แบบ interactive!
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

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading chat...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}
