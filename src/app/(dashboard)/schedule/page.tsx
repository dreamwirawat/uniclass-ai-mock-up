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
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"week" | "month">("week");

  const getWeekDates = () => {
    const week = [];
    const curr = new Date(currentDate);
    const first = curr.getDate() - curr.getDay();

    for (let i = 0; i < 7; i++) {
      const date = new Date(curr.setDate(first + i));
      week.push(date);
    }
    return week;
  };

  const weekDates = getWeekDates();

  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">
            Study Schedule
          </h1>
          <p className="text-muted-foreground">
            Plan and track your study sessions
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Session
        </Button>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={previousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-display font-bold ml-2">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
            </div>

            <div className="flex gap-2">
              <Button
                variant={view === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("week")}
              >
                Week
              </Button>
              <Button
                variant={view === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("month")}
              >
                Month
              </Button>
            </div>
          </div>

          {/* Week View Calendar */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-8 gap-2 mb-2">
                <div className="text-sm font-medium text-muted-foreground"></div>
                {weekDates.map((date, i) => {
                  const isToday =
                    date.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={i}
                      className={cn(
                        "text-center p-2 rounded-lg",
                        isToday && "bg-primary text-primary-foreground"
                      )}
                    >
                      <div className="text-xs font-medium">{days[i]}</div>
                      <div className="text-lg font-bold">{date.getDate()}</div>
                    </div>
                  );
                })}
              </div>

              {/* Time Grid */}
              <div className="space-y-1">
                {hours.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 gap-2">
                    <div className="text-xs text-muted-foreground py-2">
                      {hour}:00
                    </div>
                    {weekDates.map((_, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="border border-border rounded min-h-[60px] hover:bg-accent/50 transition-colors cursor-pointer relative group"
                      >
                        {mockSessions
                          .filter((s) => s.day === dayIndex && s.hour === hour)
                          .map((session) => (
                            <div
                              key={session.id}
                              className={cn(
                                "absolute inset-1 rounded p-2 text-xs",
                                session.color,
                                "hover:shadow-lg transition-shadow"
                              )}
                            >
                              <p className="font-semibold line-clamp-1">
                                {session.title}
                              </p>
                              <p className="text-xs opacity-90">
                                {session.time}
                              </p>
                            </div>
                          ))}
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                          <Plus className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Sessions
            </CardTitle>
            <CardDescription>Your next scheduled study times</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{session.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {session.date} • {session.time}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {session.category}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Week's Stats</CardTitle>
            <CardDescription>Your study time summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-3xl font-display font-bold">12</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-3xl font-display font-bold">18.5</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-display font-bold text-primary">
                  9
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-3xl font-display font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const mockSessions = [
  {
    id: "1",
    day: 1,
    hour: 10,
    title: "ฝึกพูด IELTS",
    time: "10:00 - 11:30",
    color: "bg-primary/20 text-primary-foreground",
  },
  {
    id: "2",
    day: 2,
    hour: 14,
    title: "สอน React",
    time: "14:00 - 16:00",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    id: "3",
    day: 3,
    hour: 9,
    title: "ฝึกแก้อัลกอริทึม",
    time: "09:00 - 11:00",
    color: "bg-secondary/40 text-secondary-foreground",
  },
  {
    id: "4",
    day: 4,
    hour: 15,
    title: "ฝึกเขียน",
    time: "15:00 - 16:30",
    color: "bg-primary/20 text-primary-foreground",
  },
];

const upcomingSessions = [
  {
    id: "1",
    title: "ฝึกพูด IELTS",
    date: "วันจันทร์ที่ 16 ต.ค.",
    time: "10:00 - 11:30 น.",
    category: "ภาษา",
  },
  {
    id: "2",
    title: "เรียนรู้ React Hooks เชิงลึก",
    date: "วันอังคารที่ 17 ต.ค.",
    time: "14:00 - 16:00 น.",
    category: "โปรแกรมมิ่ง",
  },
  {
    id: "3",
    title: "ทดสอบโครงสร้างข้อมูล",
    date: "วันพุธที่ 18 ต.ค.",
    time: "09:00 - 11:00 น.",
    category: "วิทยาการคอมพิวเตอร์",
  },
];
