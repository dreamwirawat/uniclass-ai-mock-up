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
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Study Plans", href: "/study-plans", icon: BookOpen },
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

  return (
    <aside
      className={cn(
        "flex flex-col w-64 bg-card border-r min-h-[calc(100vh-4rem)]",
        className
      )}
    >
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section - optional */}
      <div className="p-4 border-t">
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
      </div>
    </aside>
  );
}
