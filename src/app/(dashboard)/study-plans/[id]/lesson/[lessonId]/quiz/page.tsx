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
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface PageProps {
  params: {
    id: string;
    lessonId: string;
  };
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function QuizPage({ params }: PageProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds

  const questions: Question[] = [
    {
      id: 1,
      question: "IELTS ย่อมาจากอะไร?",
      options: [
        "International English Language Testing Service",
        "International English Language Testing System",
        "International Education Language Testing System",
        "International English Learning Testing System",
      ],
      correctAnswer: 1,
      explanation:
        "IELTS ย่อมาจาก International English Language Testing System ซึ่งเป็นข้อสอบวัดความสามารถทางภาษาอังกฤษที่ได้รับการยอมรับทั่วโลก",
    },
    {
      id: 2,
      question: "ข้อสอบ IELTS มีกี่ส่วน?",
      options: ["2 ส่วน", "3 ส่วน", "4 ส่วน", "5 ส่วน"],
      correctAnswer: 2,
      explanation:
        "ข้อสอบ IELTS ประกอบด้วย 4 ส่วนหลัก คือ Listening, Reading, Writing และ Speaking",
    },
    {
      id: 3,
      question: "คะแนนสูงสุดของ IELTS คือเท่าไร?",
      options: ["7.0", "8.0", "9.0", "10.0"],
      correctAnswer: 2,
      explanation: "คะแนนสูงสุดของ IELTS คือ 9.0 (Expert User)",
    },
    {
      id: 4,
      question: "ผลสอบ IELTS มีอายุกี่ปี?",
      options: ["1 ปี", "2 ปี", "3 ปี", "ไม่มีกำหนด"],
      correctAnswer: 1,
      explanation: "ผลสอบ IELTS มีอายุ 2 ปี นับจากวันที่สอบ",
    },
    {
      id: 5,
      question: "ข้อสอบ IELTS Academic เหมาะสำหรับใคร?",
      options: [
        "ผู้ที่ต้องการทำงานในต่างประเทศ",
        "ผู้ที่ต้องการเรียนต่อระดับอุดมศึกษา",
        "ผู้ที่ต้องการอพยพ",
        "ผู้ที่ต้องการเรียนภาษาอังกฤษพื้นฐาน",
      ],
      correctAnswer: 1,
      explanation:
        "IELTS Academic เหมาะสำหรับผู้ที่ต้องการเรียนต่อในระดับอุดมศึกษาหรือขึ้นทะเบียนกับองค์กรวิชาชีพในประเทศที่ใช้ภาษาอังกฤษ",
    },
    {
      id: 6,
      question: "ส่วน Speaking ของ IELTS ใช้เวลากี่นาที?",
      options: ["5-8 นาที", "8-10 นาที", "11-14 นาที", "15-20 นาที"],
      correctAnswer: 2,
      explanation: "ส่วน Speaking ของ IELTS ใช้เวลาประมาณ 11-14 นาที",
    },
    {
      id: 7,
      question: "ข้อสอบส่วน Writing ใช้เวลาทั้งหมดกี่นาที?",
      options: ["30 นาที", "45 นาที", "60 นาที", "90 นาที"],
      correctAnswer: 2,
      explanation:
        "ข้อสอบส่วน Writing ใช้เวลา 60 นาที แบ่งเป็น Task 1 (20 นาที) และ Task 2 (40 นาที)",
    },
    {
      id: 8,
      question: "Band Score 6.5 หมายถึงระดับอะไร?",
      options: ["Modest User", "Competent User", "Good User", "Very Good User"],
      correctAnswer: 1,
      explanation: "Band Score 6.5 อยู่ในระดับ Competent User",
    },
    {
      id: 9,
      question: "ข้อสอบส่วน Listening มีกี่ section?",
      options: ["2 sections", "3 sections", "4 sections", "5 sections"],
      correctAnswer: 2,
      explanation: "ข้อสอบส่วน Listening แบ่งออกเป็น 4 sections",
    },
    {
      id: 10,
      question: "Writing Task 2 ต้องเขียนอย่างน้อยกี่คำ?",
      options: ["150 คำ", "200 คำ", "250 คำ", "300 คำ"],
      correctAnswer: 2,
      explanation: "Writing Task 2 ต้องเขียนอย่างน้อย 250 คำ",
    },
  ];

  const handleSelectAnswer = (answerIndex: number) => {
    if (!showResults) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: answerIndex,
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setTimeRemaining(900);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  const score = showResults ? calculateScore() : null;
  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const allAnswered = questions.every(
    (_, idx) => selectedAnswers[idx] !== undefined
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Results View
  if (showResults && score) {
    const passed = score.percentage >= 70;

    return (
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href={`/study-plans/${params.id}/lesson/${params.lessonId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold">Quiz Results</h1>
            <p className="text-muted-foreground">
              แบบทดสอบบทเรียน: แนะนำรูปแบบข้อสอบ IELTS
            </p>
          </div>
        </div>

        {/* Score Card */}
        <Card
          className={cn(
            "border-2",
            passed
              ? "border-primary bg-gradient-to-br from-primary/10 to-transparent"
              : "border-destructive bg-gradient-to-br from-destructive/10 to-transparent"
          )}
        >
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div
                className={cn(
                  "h-24 w-24 rounded-full mx-auto flex items-center justify-center",
                  passed ? "bg-primary/20" : "bg-destructive/20"
                )}
              >
                {passed ? (
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                ) : (
                  <XCircle className="h-12 w-12 text-destructive" />
                )}
              </div>
              <div>
                <h2 className="text-4xl font-display font-bold mb-2">
                  {score.percentage}%
                </h2>
                <p className="text-muted-foreground">
                  {score.correct} out of {score.total} correct
                </p>
              </div>
              <Badge
                variant={passed ? "default" : "destructive"}
                className="text-base px-4 py-1"
              >
                {passed ? "ผ่าน! 🎉" : "ไม่ผ่าน"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button onClick={handleRetry} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            ลองใหม่อีกครั้ง
          </Button>
          <Link href={`/study-plans/${params.id}/lesson/${params.lessonId}`}>
            <Button className="gap-2">กลับไปยังบทเรียน</Button>
          </Link>
        </div>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle>รายละเอียดคำตอบ</CardTitle>
            <CardDescription>ตรวจสอบคำตอบของคุณ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((q, idx) => {
              const userAnswer = selectedAnswers[idx];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={cn(
                    "p-4 rounded-lg border-2",
                    isCorrect
                      ? "border-primary/50 bg-primary/5"
                      : "border-destructive/50 bg-destructive/5"
                  )}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">
                        {idx + 1}. {q.question}
                      </h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-muted-foreground">
                            คำตอบของคุณ:{" "}
                          </span>
                          <span
                            className={
                              isCorrect ? "text-primary" : "text-destructive"
                            }
                          >
                            {q.options[userAnswer]}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              คำตอบที่ถูกต้อง:{" "}
                            </span>
                            <span className="text-primary">
                              {q.options[q.correctAnswer]}
                            </span>
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground italic">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz View
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/study-plans/${params.id}/lesson/${params.lessonId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold">แบบทดสอบ</h1>
            <p className="text-muted-foreground">แนะนำรูปแบบข้อสอบ IELTS</p>
          </div>
        </div>
        <Badge variant="outline" className="gap-2 text-base px-4 py-2">
          <Clock className="h-4 w-4" />
          {formatTime(timeRemaining)}
        </Badge>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">ความคืบหน้า</span>
              <span className="text-muted-foreground">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <Progress
              value={((currentQuestion + 1) / questions.length) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl">
              คำถามที่ {currentQuestion + 1}
            </CardTitle>
            {isAnswered && (
              <Badge variant="outline" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                ตอบแล้ว
              </Badge>
            )}
          </div>
          <CardDescription className="text-lg mt-4">
            {currentQ.question}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectAnswer(idx)}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                selectedAnswers[currentQuestion] === idx
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 hover:bg-accent"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                    selectedAnswers[currentQuestion] === idx
                      ? "border-primary bg-primary"
                      : "border-border"
                  )}
                >
                  {selectedAnswers[currentQuestion] === idx && (
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          ข้อก่อนหน้า
        </Button>

        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={cn(
                "h-8 w-8 rounded-md text-xs font-medium transition-colors",
                idx === currentQuestion
                  ? "bg-primary text-primary-foreground"
                  : selectedAnswers[idx] !== undefined
                  ? "bg-primary/20 text-primary"
                  : "bg-muted hover:bg-accent"
              )}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {currentQuestion === questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="gap-2"
          >
            <Award className="h-4 w-4" />
            ส่งคำตอบ
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!isAnswered}>
            ข้อถัดไป
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-display font-bold text-primary">
                {Object.keys(selectedAnswers).length}
              </p>
              <p className="text-xs text-muted-foreground">ตอบแล้ว</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold">
                {questions.length - Object.keys(selectedAnswers).length}
              </p>
              <p className="text-xs text-muted-foreground">ยังไม่ตอบ</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold">
                {questions.length}
              </p>
              <p className="text-xs text-muted-foreground">ทั้งหมด</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
