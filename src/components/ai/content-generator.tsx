"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Plus,
  Wand2,
  Lightbulb,
  BookOpen,
  Calculator,
  CheckCircle2,
  X,
  RotateCcw,
  Save,
  Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentGenerationButtonProps {
  onGenerate: (type: string, content: string) => void;
  context: string;
  className?: string;
}

interface GeneratedContent {
  id: string;
  type: string;
  content: string;
  originalContent: string;
  isNew: boolean;
  timestamp: Date;
}

interface ContentEnhancerProps {
  content: string;
  className?: string;
}

const generationTypes = [
  {
    id: "explain",
    label: "อธิบายเพิ่มเติม",
    icon: Lightbulb,
    description: "เพิ่มคำอธิบายและรายละเอียดให้ชัดเจนขึ้น",
  },
  {
    id: "examples",
    label: "เพิ่มตัวอย่าง",
    icon: BookOpen,
    description: "เพิ่มตัวอย่างที่หลากหลายและเข้าใจง่าย",
  },
  {
    id: "simplify",
    label: "ทำให้ง่ายขึ้น",
    icon: Wand2,
    description: "ปรับเนื้อหาให้เข้าใจง่ายขึ้น",
  },
  {
    id: "practice",
    label: "เพิ่มแบบฝึกหัด",
    icon: Calculator,
    description: "เพิ่มแบบฝึกหัดและโจทย์ปัญหา",
  },
];

export function ContentGenerationButton({
  onGenerate,
  context,
  className,
}: ContentGenerationButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleGenerate = async (type: string) => {
    setIsGenerating(true);
    setShowOptions(false);

    // Simulate AI generation
    setTimeout(() => {
      let generatedContent = "";

      switch (type) {
        case "explain":
          generatedContent = `นี่คือคำอธิบายเพิ่มเติมสำหรับ "${context}":

**รายละเอียดเพิ่มเติม:**
- ประเด็นนี้มีความสำคัญเพราะ...
- การประยุกต์ใช้ในชีวิตจริง...
- ข้อควรระวังและข้อจำกัด...

**เคล็ดลับการเรียนรู้:**
- วิธีจำและเข้าใจง่าย...
- การเชื่อมโยงกับเนื้อหาอื่น...`;
          break;
        case "examples":
          generatedContent = `**ตัวอย่างเพิ่มเติมสำหรับ "${context}":**

**ตัวอย่างที่ 1:**
- สถานการณ์: ...
- วิธีแก้: ...
- ผลลัพธ์: ...

**ตัวอย่างที่ 2:**
- สถานการณ์: ...
- วิธีแก้: ...
- ผลลัพธ์: ...

**ตัวอย่างที่ 3:**
- สถานการณ์: ...
- วิธีแก้: ...
- ผลลัพธ์: ...`;
          break;
        case "simplify":
          generatedContent = `**คำอธิบายแบบง่ายสำหรับ "${context}":**

**แนวคิดหลัก:**
- สิ่งที่สำคัญที่สุดคือ...
- คิดง่ายๆ ว่า...

**ขั้นตอนง่ายๆ:**
1. ขั้นตอนแรก: ...
2. ขั้นตอนที่สอง: ...
3. ขั้นตอนสุดท้าย: ...

**สรุปสั้นๆ:**
- สิ่งที่ต้องจำ: ...
- สิ่งที่ต้องทำ: ...`;
          break;
        case "practice":
          generatedContent = `**แบบฝึกหัดสำหรับ "${context}":**

**โจทย์ที่ 1:** (ระดับง่าย)
- คำถาม: ...
- คำตอบ: ...

**โจทย์ที่ 2:** (ระดับปานกลาง)
- คำถาม: ...
- คำตอบ: ...

**โจทย์ที่ 3:** (ระดับยาก)
- คำถาม: ...
- คำตอบ: ...

**แบบทดสอบความเข้าใจ:**
- คำถาม: ...
- คำตอบ: ...`;
          break;
      }

      onGenerate(type, generatedContent);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowOptions(!showOptions)}
        disabled={isGenerating}
        className="gap-2"
      >
        {isGenerating ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            กำลังสร้าง...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            สร้างเนื้อหาเพิ่ม
          </>
        )}
      </Button>

      {showOptions && !isGenerating && (
        <Card className="absolute top-full left-0 mt-2 w-80 z-50 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm mb-3">
                เลือกประเภทเนื้อหาที่ต้องการสร้าง
              </h4>
              {generationTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Button
                    key={type.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-auto p-3"
                    onClick={() => handleGenerate(type.id)}
                  >
                    <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{type.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {type.description}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function ContentEnhancer({ content, className }: ContentEnhancerProps) {
  const [generatedContents, setGeneratedContents] = useState<
    GeneratedContent[]
  >([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const handleGenerate = (type: string, generatedContent: string) => {
    const newContent: GeneratedContent = {
      id: Date.now().toString(),
      type,
      content: generatedContent,
      originalContent: content,
      isNew: true,
      timestamp: new Date(),
    };

    setGeneratedContents((prev) => [...prev, newContent]);

    // Remove "new" highlight after 3 seconds
    setTimeout(() => {
      setGeneratedContents((prev) =>
        prev.map((item) =>
          item.id === newContent.id ? { ...item, isNew: false } : item
        )
      );
    }, 3000);
  };

  const handleEdit = (id: string, currentContent: string) => {
    setEditingId(id);
    setEditingContent(currentContent);
  };

  const handleSaveEdit = (id: string) => {
    setGeneratedContents((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, content: editingContent } : item
      )
    );
    setEditingId(null);
    setEditingContent("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const handleRegenerate = (id: string) => {
    const item = generatedContents.find((c) => c.id === id);
    if (!item) return;

    // Simulate regeneration
    setTimeout(() => {
      const regeneratedContent = `${item.content}\n\n**เนื้อหาที่ปรับปรุงใหม่:**\n- เพิ่มข้อมูลล่าสุด\n- ปรับปรุงการอธิบาย\n- เพิ่มตัวอย่างใหม่`;

      setGeneratedContents((prev) =>
        prev.map((content) =>
          content.id === id
            ? { ...content, content: regeneratedContent, isNew: true }
            : content
        )
      );
    }, 1500);
  };

  const handleDelete = (id: string) => {
    setGeneratedContents((prev) => prev.filter((item) => item.id !== id));
  };

  const getTypeInfo = (type: string) => {
    return generationTypes.find((t) => t.id === type) || generationTypes[0];
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Original Content */}
      <div className="relative">
        <div className="prose prose-sm max-w-none">
          <div className="text-muted-foreground leading-relaxed">
            {content.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>

        {/* Generation Button */}
        <div className="absolute top-2 right-2">
          <ContentGenerationButton
            onGenerate={handleGenerate}
            context={content.slice(0, 50) + "..."}
          />
        </div>
      </div>

      {/* Generated Contents */}
      {generatedContents.map((item) => {
        const typeInfo = getTypeInfo(item.type);
        const Icon = typeInfo.icon;

        return (
          <Card
            key={item.id}
            className={cn(
              "border-l-4 border-l-primary/50 transition-all duration-500",
              item.isNew && "animate-pulse bg-primary/5"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    {typeInfo.label}
                  </Badge>
                  {item.isNew && (
                    <Badge className="gap-1">
                      <Plus className="h-3 w-3" />
                      ใหม่
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(item.id, item.content)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRegenerate(item.id)}
                    className="h-8 w-8 p-0"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {editingId === item.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="w-full min-h-[200px] p-3 border rounded-lg resize-none"
                    placeholder="แก้ไขเนื้อหา..."
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSaveEdit(item.id)}>
                      <Save className="h-4 w-4 mr-1" />
                      บันทึก
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      ยกเลิก
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <div className="text-muted-foreground leading-relaxed">
                    {item.content.split("\n").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                สร้างเมื่อ: {item.timestamp.toLocaleString("th-TH")}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
