"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Calendar,
  Home,
  MessageCircle,
  ShoppingBag,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { UniClassLogo } from "@/components/brand/uniclass-logo";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Study Plans", href: "/study-plans", icon: FolderOpen },
  { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Progress", href: "/progress", icon: TrendingUp },
  { name: "AI Tutor", href: "/chat", icon: MessageCircle },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        "flex flex-col bg-card border-r h-full transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <UniClassLogo size="md" variant="default" showText={true} />
        )}
        {isCollapsed && (
          <UniClassLogo size="md" variant="minimal" showText={false} />
        )}
        <button
          onClick={toggleSidebar}
          className={cn(
            "p-1.5 rounded-md hover:bg-accent transition-colors",
            isCollapsed && "mx-auto"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group relative",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{item.name}</span>}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t flex-shrink-0">
        {!isCollapsed ? (
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <h3 className="font-display font-bold text-sm mb-1">
              Upgrade to Pro
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Unlock unlimited AI tutoring and advanced features.
            </p>
            <Link
              href="/upgrade"
              className="block w-full py-2 px-4 text-center text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Learn More
            </Link>
          </div>
        ) : (
          <div className="flex justify-center">
            <Link
              href="/upgrade"
              className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:bg-primary/20 transition-colors"
              title="Upgrade to Pro"
            >
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-xs">P</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
