"use client";

import { toast as sonnerToast } from "sonner";

// Wrapper for sonner toast to maintain compatibility with existing API
export function toast({
  title,
  description,
  variant = "default",
  ...props
}: {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}) {
  if (variant === "destructive") {
    return sonnerToast.error(title || "Error", {
      description,
      duration: props.duration,
    });
  }

  return sonnerToast(title || "Notification", {
    description,
    duration: props.duration,
  });
}

// Hook for using toast
export function useToast() {
  return {
    toast,
    // Expose sonner methods directly
    success: (message: string, description?: string) =>
      sonnerToast.success(message, { description }),
    error: (message: string, description?: string) =>
      sonnerToast.error(message, { description }),
    info: (message: string, description?: string) =>
      sonnerToast.info(message, { description }),
    warning: (message: string, description?: string) =>
      sonnerToast.warning(message, { description }),
    loading: (message: string) => sonnerToast.loading(message),
    promise: sonnerToast.promise,
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
  };
}
