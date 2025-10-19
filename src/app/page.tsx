"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UniClassLogo } from "@/components/brand/uniclass-logo";
import {
  Send,
  Menu,
  BookOpen,
  BarChart3,
  Calendar,
  Settings,
  Plus,
  Search,
  MessageSquare,
  User,
  Star,
  Mic,
  Volume2,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Redirect to dashboard with the input as initial context
      router.push(`/chat?context=${encodeURIComponent(inputValue)}`);
    }
  };

  const handleQuickAccess = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-azuki-cream/30 to-background flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-primary flex flex-col items-center py-4">
        {/* Logo */}
        <div className="mb-6">
          <UniClassLogo size="sm" variant="minimal" />
        </div>

        {/* Sidebar Icons */}
        <div className="flex flex-col items-center space-y-4 flex-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-dark"
          >
            <Plus className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-dark"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-dark"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-dark"
          >
            <User className="h-5 w-5" />
          </Button>
          <div className="absolute -top-1 -right-1">
            <Star className="h-3 w-3 text-accent" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full p-4 border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                UniClass AI
              </span>
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="flex items-center gap-4">
              <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2 hover:shadow-lg transition-shadow">
                <Star className="h-4 w-4" />
                Upgrade to Pro
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-accent-foreground" />
                </div>
                <div className="w-4 h-4 border-2 border-muted-foreground border-t-primary rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-3xl mx-auto text-center">
            {/* Greeting */}
            <div className="mb-12 animate-fade-in">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
                Hey, คุณ! Ready to dive in?
              </h1>
            </div>

            {/* Input Form */}
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
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            {/* Quick Actions */}
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

            {/* Demo Notice */}
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
