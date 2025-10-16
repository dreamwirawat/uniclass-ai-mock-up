"use client";

import { useEffect, useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Plus, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getStudyPlans, initializeDefaultData } from "@/lib/storage";
import { ChatSidebar } from "@/components/chat/chat-sidebar";

export default function StudyPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    initializeDefaultData();
    loadPlans();
  }, []);

  const loadPlans = () => {
    const allPlans = getStudyPlans();
    setPlans(allPlans);
  };

  const filteredPlans = plans.filter((plan) => {
    if (filter === "all") return true;
    if (filter === "in-progress")
      return plan.progress > 0 && plan.progress < 100;
    if (filter === "completed") return plan.progress === 100;
    if (filter === "templates") return plan.is_template;
    return true;
  });
  return (
    <>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">
              My Study Plans
            </h1>
            <p className="text-muted-foreground">
              Manage your personalized learning paths
            </p>
          </div>
          <Link href="/study-plans/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Plan
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All Plans ({plans.length})
          </Button>
          <Button
            variant={filter === "in-progress" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("in-progress")}
          >
            In Progress (
            {plans.filter((p) => p.progress > 0 && p.progress < 100).length})
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            Completed ({plans.filter((p) => p.progress === 100).length})
          </Button>
          <Button
            variant={filter === "templates" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("templates")}
          >
            Templates ({plans.filter((p) => p.is_template).length})
          </Button>
        </div>

        {/* Study Plans Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlans.map((plan) => (
            <Card
              key={plan.id}
              className="flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={plan.is_template ? "secondary" : "default"}>
                    {plan.is_template ? "Template" : plan.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {plan.lessonsCount} lessons
                  </span>
                </div>
                <CardTitle className="line-clamp-1">{plan.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{plan.progress}%</span>
                    </div>
                    <Progress value={plan.progress} />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {plan.lessonsCount} lessons
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {plan.estimatedHours}h
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((plan.progress / 100) * plan.lessonsCount)}{" "}
                        done
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="gap-2">
                <Link href={`/study-plans/${plan.id}`} className="flex-1">
                  <Button variant="default" className="w-full">
                    Continue Learning
                  </Button>
                </Link>
                <Button variant="outline" size="icon">
                  <BookOpen className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* Create New Card */}
          <Link href="/study-plans/create">
            <Card className="flex flex-col items-center justify-center h-full min-h-[300px] border-dashed hover:border-primary hover:bg-accent/50 transition-all cursor-pointer group">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold mb-1">
                    Create New Plan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Start a custom learning path
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* AI Chat Sidebar */}
      <ChatSidebar contextType="plan" />
    </>
  );
}
