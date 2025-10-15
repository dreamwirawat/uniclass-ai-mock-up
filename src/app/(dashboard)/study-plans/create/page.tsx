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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, GripVertical, X, Save, Sparkles } from "lucide-react";
import Link from "next/link";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Lesson {
  id: string;
  title: string;
  duration: number;
  order: number;
}

function SortableLesson({
  lesson,
  onRemove,
}: {
  lesson: Lesson;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 bg-card border rounded-lg"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="flex-1">
        <h4 className="font-medium">{lesson.title}</h4>
        <p className="text-sm text-muted-foreground">
          {lesson.duration} minutes
        </p>
      </div>

      <Button variant="ghost" size="icon" onClick={() => onRemove(lesson.id)}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function CreateStudyPlanPage() {
  const [planTitle, setPlanTitle] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [category, setCategory] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDuration, setNewLessonDuration] = useState(30);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLessons((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addLesson = () => {
    if (!newLessonTitle.trim()) return;

    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: newLessonTitle,
      duration: newLessonDuration,
      order: lessons.length,
    };

    setLessons([...lessons, newLesson]);
    setNewLessonTitle("");
    setNewLessonDuration(30);
  };

  const removeLesson = (id: string) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  const handleSave = () => {
    // In production, save to database
    console.log("Saving study plan:", {
      title: planTitle,
      description: planDescription,
      category,
      lessons,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/study-plans">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-display font-bold">
              Create Study Plan
            </h1>
            <p className="text-muted-foreground mt-1">
              Build a personalized learning path
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Generate
          </Button>
          <Button className="gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Plan
          </Button>
        </div>
      </div>

      {/* Plan Details */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Details</CardTitle>
          <CardDescription>
            Basic information about your study plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Plan Title *</Label>
            <Input
              id="title"
              placeholder="e.g., IELTS Complete Preparation"
              value={planTitle}
              onChange={(e) => setPlanTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Brief description of your study plan..."
              value={planDescription}
              onChange={(e) => setPlanDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>Add Lesson</CardTitle>
          <CardDescription>Create lessons for your study plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Lesson title..."
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addLesson()}
              />
            </div>
            <div className="w-32">
              <Input
                type="number"
                placeholder="Minutes"
                value={newLessonDuration}
                onChange={(e) => setNewLessonDuration(Number(e.target.value))}
                min={1}
              />
            </div>
            <Button onClick={addLesson}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lessons List with Drag & Drop */}
      <Card>
        <CardHeader>
          <CardTitle>Lessons ({lessons.length})</CardTitle>
          <CardDescription>Drag to reorder lessons</CardDescription>
        </CardHeader>
        <CardContent>
          {lessons.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No lessons yet. Add your first lesson above!</p>
            </div>
          ) : (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={lessons.map((l) => l.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <SortableLesson
                      key={lesson.id}
                      lesson={lesson}
                      onRemove={removeLesson}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle>Plan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-display font-bold text-primary">
                {lessons.length}
              </p>
              <p className="text-sm text-muted-foreground">Lessons</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold">
                {Math.round(
                  lessons.reduce((sum, l) => sum + l.duration, 0) / 60
                )}
                h
              </p>
              <p className="text-sm text-muted-foreground">Total Duration</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold">
                {category || "—"}
              </p>
              <p className="text-sm text-muted-foreground">Category</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const categories = [
  "โปรแกรมมิ่ง",
  "ภาษา",
  "IELTS",
  "คณิตศาสตร์",
  "วิทยาศาสตร์",
  "ธุรกิจ",
  "ดีไซน์",
  "อื่นๆ",
];
