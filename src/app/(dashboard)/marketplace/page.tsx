"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Star,
  Clock,
  BookOpen,
  Users,
  Filter,
  Grid,
  List,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function MarketplacePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { id: "all", name: "ทั้งหมด", count: templates.length },
    {
      id: "language",
      name: "ภาษา",
      count: templates.filter((t) => t.category === "ภาษา").length,
    },
    {
      id: "programming",
      name: "โปรแกรมมิ่ง",
      count: templates.filter((t) => t.category === "โปรแกรมมิ่ง").length,
    },
    {
      id: "math",
      name: "คณิตศาสตร์",
      count: templates.filter((t) => t.category === "คณิตศาสตร์").length,
    },
    {
      id: "science",
      name: "วิทยาศาสตร์",
      count: templates.filter((t) => t.category === "วิทยาศาสตร์").length,
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      template.category ===
        categories.find((c) => c.id === selectedCategory)?.name;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: any) => {
    setSelectedTemplate(template);
    setShowDialog(true);
  };

  const confirmUseTemplate = () => {
    if (!selectedTemplate) return;

    // Create a new study plan from template
    const newPlanId = Date.now().toString();
    const newPlan = {
      id: newPlanId,
      title: selectedTemplate.title,
      description: selectedTemplate.description,
      category: selectedTemplate.category,
      is_template: false,
      lessonsCount: selectedTemplate.lessonsCount,
      estimatedHours: selectedTemplate.estimatedHours,
      progress: 0,
      created_at: new Date().toISOString(),
    };

    // Save to localStorage
    const existingPlans = JSON.parse(
      localStorage.getItem("studyPlans") || "[]"
    );
    localStorage.setItem(
      "studyPlans",
      JSON.stringify([...existingPlans, newPlan])
    );

    setShowDialog(false);
    router.push(`/study-plans/${newPlanId}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold mb-2">
          Template Marketplace
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          ค้นพบและใช้เทมเพลตแผนการเรียนที่สร้างโดยผู้เชี่ยวชาญ
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหาเทมเพลต..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="gap-2"
            >
              {category.name}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            พบ {filteredTemplates.length} เทมเพลต
          </p>
        </div>

        {/* Templates Grid/List */}
        <div
          className={cn(
            "gap-6",
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
          )}
        >
          {filteredTemplates.map((template, index) => (
            <Card
              key={template.id}
              className={cn(
                "group hover:shadow-lg transition-all duration-300 cursor-pointer",
                viewMode === "grid"
                  ? "hover:-translate-y-1"
                  : "hover:border-primary/50"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {viewMode === "grid" ? (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline">{template.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">
                          {template.rating}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {template.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {template.lessonsCount} บทเรียน
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {template.estimatedHours}h
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {template.students} คนเรียน
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleUseTemplate(template)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ใช้เทมเพลต
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline">{template.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">
                            {template.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors mb-2">
                        {template.title}
                      </CardTitle>
                      <CardDescription className="mb-4">
                        {template.description}
                      </CardDescription>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {template.lessonsCount} บทเรียน
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {template.estimatedHours}h
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {template.students} คนเรียน
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleUseTemplate(template)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ใช้เทมเพลต
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">ไม่พบเทมเพลต</h3>
              <p>ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ดูนะคะ</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              ล้างตัวกรอง
            </Button>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ใช้เทมเพลตนี้</DialogTitle>
            <DialogDescription>
              คุณต้องการสร้าง Study Plan จากเทมเพลตนี้หรือไม่?
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">{selectedTemplate.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedTemplate.description}
                </p>
              </div>
              <div className="flex gap-4 text-sm">
                <Badge variant="outline">{selectedTemplate.category}</Badge>
                <span className="text-muted-foreground">
                  {selectedTemplate.lessonsCount} บทเรียน
                </span>
                <span className="text-muted-foreground">
                  ~{selectedTemplate.estimatedHours} ชั่วโมง
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={confirmUseTemplate}>ยืนยัน</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Simplified template data
const templates = [
  {
    id: "1",
    title: "เตรียมสอบ IELTS Academic",
    description: "การเตรียมสอบ IELTS ครบทุกส่วน พร้อมข้อสอบฝึกหัดและกลยุทธ์",
    category: "ภาษา",
    lessonsCount: 40,
    estimatedHours: 60,
    rating: 4.9,
    students: "12.5k",
  },
  {
    id: "2",
    title: "Full-Stack JavaScript Developer",
    description:
      "เริ่มจากศูนย์สู่ Full-Stack: HTML, CSS, JavaScript, React, Node.js",
    category: "โปรแกรมมิ่ง",
    lessonsCount: 50,
    estimatedHours: 120,
    rating: 4.8,
    students: "18.2k",
  },
  {
    id: "3",
    title: "Data Science ด้วย Python",
    description:
      "เชี่ยวชาญ Data Science: Python, pandas, NumPy, Machine Learning",
    category: "วิทยาศาสตร์",
    lessonsCount: 45,
    estimatedHours: 90,
    rating: 4.9,
    students: "15.8k",
  },
  {
    id: "4",
    title: "ภาษาอังกฤษธุรกิจ",
    description: "ทักษะการสื่อสารอย่างมืออาชีพสำหรับที่ทำงาน",
    category: "ภาษา",
    lessonsCount: 20,
    estimatedHours: 30,
    rating: 4.7,
    students: "8.5k",
  },
  {
    id: "5",
    title: "React และ TypeScript",
    description: "สร้างเว็บแอปพลิเคชันสมัยใหม่ด้วย React และ TypeScript",
    category: "โปรแกรมมิ่ง",
    lessonsCount: 35,
    estimatedHours: 70,
    rating: 4.8,
    students: "12.1k",
  },
  {
    id: "6",
    title: "พื้นฐานแคลคูลัส",
    description: "คอร์สแคลคูลัสครบถ้วนตั้งแต่พื้นฐานถึงระดับสูง",
    category: "คณิตศาสตร์",
    lessonsCount: 30,
    estimatedHours: 50,
    rating: 4.6,
    students: "6.8k",
  },
];
