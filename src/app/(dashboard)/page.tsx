"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Plus, BookOpen, Mic, Volume2 } from "lucide-react";

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/chat?context=${encodeURIComponent(inputValue)}`);
    }
  };

  const handleQuickAccess = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-azuki-cream/30 to-background">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-3xl mx-auto text-center">
            <div className="mb-12 animate-fade-in">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
                Hey, คุณ! Ready to dive in?
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="mb-8 animate-scale-in">
              <div className="relative max-w-2xl mx-auto">
                <div className="flex items-center bg-background border border-border rounded-2xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                  <Plus className="h-5 w-5 text-muted-foreground mr-3" />
                  <Input
                    type="text"
                    placeholder="Ask anything"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border-0 p-0 text-lg focus:ring-0 focus:outline-none flex-1 bg-transparent"
                  />
                  <div className="flex items-center gap-2 ml-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                      type="button"
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                      type="button"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button type="submit" size="sm" className="w-8 h-8 p-0">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto animate-fade-in-delay">
              <Button
                variant="outline"
                onClick={() => handleQuickAccess("/study-plans")}
                className="h-12 gap-2 hover:bg-primary/5 border-border hover:border-primary/50 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                เริ่มหลักสูตรใหม่
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickAccess("/chat")}
                className="h-12 gap-2 hover:bg-primary/5 border-border hover:border-primary/50 transition-colors"
              >
                <Send className="h-4 w-4" />
                เริ่มแชท
              </Button>
            </div>

            <div className="mt-12 p-4 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg animate-fade-in-delay-2">
              <p className="text-sm text-muted-foreground">
                <strong>Demo Mode:</strong> พิมพ์อะไรก็ได้เพื่อเริ่มต้นการใช้งาน
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
