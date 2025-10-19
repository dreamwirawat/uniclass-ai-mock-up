"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-primary/5 ${className || ""}`}>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}

interface CardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function CardLayout({ children, className }: CardLayoutProps) {
  return (
    <Card className={`animate-slide-up ${className || ""}`}>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}
