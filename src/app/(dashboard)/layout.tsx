"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { HighlightPopup } from "@/components/chat/highlight-popup";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Fixed with its own scroll */}
        <div className="hidden lg:block flex-shrink-0 overflow-y-auto">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed left-0 top-16 bottom-0 z-50 lg:hidden overflow-y-auto">
              <Sidebar />
            </div>
          </>
        )}

        {/* Main Content - Scrollable independently */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto">{children}</div>
        </main>
      </div>

      {/* Text Highlight Popup */}
      <HighlightPopup />
    </div>
  );
}
