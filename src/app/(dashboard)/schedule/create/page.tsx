"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { ArrowLeft, Save, Calendar, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

export default function CreateSchedulePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonParam = searchParams.get("lesson");
  const planParam = searchParams.get("plan");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(planParam || "");
  const [selectedLesson, setSelectedLesson] = useState(lessonParam || "");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Auto-fill title based on lesson/plan
    if (lessonParam) {
      setTitle("Review Lesson Session");
    } else if (planParam) {
      setTitle("Study Session");
    }
  }, [lessonParam, planParam]);

  const handleSave = () => {
    if (!title || !date || !startTime || !endTime) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newSession = {
      id: Date.now().toString(),
      title,
      date,
      startTime,
      endTime,
      studyPlanId: selectedPlan,
      lessonId: selectedLesson,
      notes,
      created_at: new Date().toISOString(),
    };

    // Save to localStorage
    const existingSessions = JSON.parse(
      localStorage.getItem("scheduleSessions") || "[]"
    );
    localStorage.setItem(
      "scheduleSessions",
      JSON.stringify([...existingSessions, newSession])
    );

    // Redirect back to schedule
    router.push("/schedule");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/schedule">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold">Create Session</h1>
          <p className="text-muted-foreground mt-1">
            Schedule a study session for your plan
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
          <CardDescription>
            Fill in the details for your study session
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Session Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Session Title *</Label>
            <Input
              id="title"
              placeholder="e.g., IELTS Speaking Practice"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Date and Time */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time *</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time *</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* Study Plan Selection */}
          <div className="space-y-2">
            <Label htmlFor="plan">Study Plan (Optional)</Label>
            <select
              id="plan"
              className="w-full p-2 border rounded-lg"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="">Select a study plan...</option>
              <option value="1">เตรียมสอบ IELTS ฉบับสมบูรณ์</option>
              <option value="2">พัฒนาเว็บไซต์แบบ Full-Stack</option>
              <option value="3">โครงสร้างข้อมูลและอัลกอริทึม</option>
            </select>
          </div>

          {/* Lesson Selection (if plan is selected) */}
          {selectedPlan && (
            <div className="space-y-2">
              <Label htmlFor="lesson">Specific Lesson (Optional)</Label>
              <select
                id="lesson"
                className="w-full p-2 border rounded-lg"
                value={selectedLesson}
                onChange={(e) => setSelectedLesson(e.target.value)}
              >
                <option value="">Select a lesson...</option>
                <option value="1">แนะนำรูปแบบข้อสอบ IELTS</option>
                <option value="2">ทักษะการอ่าน: Skimming & Scanning</option>
                <option value="3">Writing Task 1: การบรรยายกราฟ</option>
              </select>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              className="w-full p-3 border rounded-lg min-h-[100px]"
              placeholder="Add any notes or reminders for this session..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Preview */}
          {title && date && startTime && endTime && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Session Preview
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{title}</p>
                    {selectedPlan && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        Study Plan Selected
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(date).toLocaleDateString("th-TH", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {startTime} - {endTime}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Link href="/schedule">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Session
        </Button>
      </div>
    </div>
  );
}
