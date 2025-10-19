"use client";

import { cn } from "@/lib/utils";

interface UniClassLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "minimal" | "text-only";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-6 text-sm",
  md: "h-8 w-8 text-lg",
  lg: "h-12 w-12 text-2xl",
  xl: "h-16 w-16 text-3xl",
};

const textSizeClasses = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-3xl",
};

export function UniClassLogo({
  size = "md",
  variant = "default",
  showText = true,
  className,
}: UniClassLogoProps) {
  const logoElement = (
    <div
      className={cn(
        "rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <span className="text-white font-bold">U</span>
    </div>
  );

  if (variant === "minimal") {
    return logoElement;
  }

  if (variant === "text-only") {
    return (
      <span
        className={cn(
          "font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
          textSizeClasses[size],
          className
        )}
      >
        UniClass AI
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {logoElement}
      {showText && (
        <span className={cn("font-display font-bold", textSizeClasses[size])}>
          UniClass AI
        </span>
      )}
    </div>
  );
}
