import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-azuki-cream/30 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AI-Powered Learning Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground animate-slide-up">
            Learn Smarter with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              UniClass AI
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Personalized study plans, AI tutoring, and progress tracking
            designed to help you achieve your learning goals faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="gap-2 text-lg px-8 py-6 bg-primary hover:bg-primary-dark"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-lg px-8 py-6"
              >
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: BookOpen,
    title: "แผนการเรียนแบบกำหนดเอง",
    description:
      "สร้างเส้นทางการเรียนรู้ที่เหมาะกับคุณ หรือเลือกจากเทมเพลตหลายร้อยแบบในตลาดของเรา",
  },
  {
    icon: Calendar,
    title: "ตารางเรียนอัจฉริยะ",
    description:
      "ปฏิทินแบบโต้ตอบพร้อมระบบจัดการเวลาและการแจ้งเตือนอัตโนมัติสำหรับเซสชั่นการเรียนของคุณ",
  },
  {
    icon: MessageCircle,
    title: "แชทกับติวเตอร์ AI",
    description:
      "รับความช่วยเหลือทันทีจากติวเตอร์ AI เพียงแค่ไฮไลต์ข้อความใดๆ ก็ถามคำถามได้ทันที",
  },
  {
    icon: TrendingUp,
    title: "ติดตามความก้าวหน้า",
    description:
      "วิเคราะห์และข้อมูลเชิงลึกแบบกราฟิกเพื่อติดตามเส้นทางการเรียนรู้และสร้างแรงบันดาลใจ",
  },
];
