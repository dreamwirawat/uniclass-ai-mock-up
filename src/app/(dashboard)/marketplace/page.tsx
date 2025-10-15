import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, Download, Eye, TrendingUp } from "lucide-react";

export default function MarketplacePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-display font-bold mb-2">
          Template Marketplace
        </h1>
        <p className="text-muted-foreground">
          Discover and use study plan templates created by experts
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search templates..." className="pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            All
          </Button>
          <Button variant="ghost" size="sm">
            Programming
          </Button>
          <Button variant="ghost" size="sm">
            Language
          </Button>
          <Button variant="ghost" size="sm">
            IELTS
          </Button>
          <Button variant="ghost" size="sm">
            Mathematics
          </Button>
        </div>
      </div>

      {/* Featured Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-display font-bold">
            Featured Templates
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTemplates.map((template) => (
            <Card
              key={template.id}
              className="group hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-primary">Featured</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">
                      {template.rating}
                    </span>
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {template.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {template.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Lessons</span>
                    <span className="font-medium">{template.lessonsCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">
                      {template.estimatedHours}h
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {template.downloads}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {template.views}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="gap-2">
                <Button className="flex-1">Use Template</Button>
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* All Templates */}
      <div>
        <h2 className="text-2xl font-display font-bold mb-4">All Templates</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allTemplates.map((template) => (
            <Card
              key={template.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline">{template.category}</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {template.rating}
                  </div>
                </div>
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {template.description}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const featuredTemplates = [
  {
    id: "1",
    title: "เตรียมสอบ IELTS Academic แบบสมบูรณ์",
    description:
      "การเตรียมสอบ IELTS ครบทุกส่วน พร้อมข้อสอบฝึกหัด กลยุทธ์ และเคล็ดลับจากผู้เชี่ยวชาญ",
    category: "ภาษา",
    lessonsCount: 40,
    estimatedHours: 60,
    rating: 4.9,
    downloads: "12.5k",
    views: "45k",
  },
  {
    id: "2",
    title: "เส้นทางสู่ Full-Stack JavaScript Developer",
    description:
      "เริ่มจากศูนย์สู่ Full-Stack: HTML, CSS, JavaScript, React, Node.js, MongoDB และการ Deploy",
    category: "โปรแกรมมิ่ง",
    lessonsCount: 50,
    estimatedHours: 120,
    rating: 4.8,
    downloads: "18.2k",
    views: "62k",
  },
  {
    id: "3",
    title: "Data Science ด้วย Python",
    description:
      "เชี่ยวชาญ Data Science: Python, pandas, NumPy, Machine Learning และโปรเจกต์จริง",
    category: "วิทยาศาสตร์ข้อมูล",
    lessonsCount: 45,
    estimatedHours: 90,
    rating: 4.9,
    downloads: "15.8k",
    views: "51k",
  },
];

const allTemplates = [
  {
    id: "4",
    title: "ภาษาอังกฤษธุรกิจสำหรับมืออาชีพ",
    description: "ทักษะการสื่อสารอย่างมืออาชีพสำหรับที่ทำงาน",
    category: "ภาษา",
    rating: 4.7,
  },
  {
    id: "5",
    title: "เชี่ยวชาญ React และ TypeScript",
    description: "สร้างเว็บแอปพลิเคชันสมัยใหม่ด้วย React และ TypeScript",
    category: "โปรแกรมมิ่ง",
    rating: 4.8,
  },
  {
    id: "6",
    title: "พื้นฐานแคลคูลัส",
    description: "คอร์สแคลคูลัสครบถ้วนตั้งแต่พื้นฐานถึงระดับสูง",
    category: "คณิตศาสตร์",
    rating: 4.6,
  },
];
