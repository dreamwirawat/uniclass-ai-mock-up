"use client";

import { ReactNode } from "react";
import { UniClassLogo } from "@/components/brand/uniclass-logo";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-azuki-cream/30 to-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <UniClassLogo size="xl" variant="minimal" showText={false} />
          </div>
          <h1 className="text-3xl font-display font-bold">{title}</h1>
          <p className="text-muted-foreground mt-2">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
