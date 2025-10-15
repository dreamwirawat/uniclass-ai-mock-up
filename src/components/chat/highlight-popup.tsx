"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export function HighlightPopup() {
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setSelectedText(text);
          setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 60,
          });
          setIsVisible(true);
        }
      } else {
        setIsVisible(false);
      }
    };

    const handleClickOutside = () => {
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection?.toString()) {
          setIsVisible(false);
        }
      }, 100);
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAskAI = () => {
    // Store selected text in sessionStorage to pass to chat
    sessionStorage.setItem("chatContext", selectedText);
    router.push("/chat");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translateX(-50%)",
      }}
    >
      <div className="glass rounded-lg shadow-xl border border-primary/20 p-1 flex gap-1">
        <Button
          size="sm"
          className="gap-2 shadow-lg bg-primary hover:bg-primary/90"
          onClick={handleAskAI}
        >
          <MessageCircle className="h-4 w-4" />
          Ask AI about this
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="gap-2"
          onClick={handleAskAI}
        >
          <Sparkles className="h-4 w-4" />
          Explain
        </Button>
      </div>
    </div>
  );
}
