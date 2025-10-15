"use client";

import { useState } from "react";
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
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

interface QuizCardProps {
  title: string;
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export function QuizCard({ title, questions, onComplete }: QuizCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer,
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const correctCount = questions.filter(
      (q, index) => selectedAnswers[index] === q.correctAnswer
    ).length;
    const score = Math.round((correctCount / questions.length) * 100);
    setShowResults(true);
    onComplete?.(score);
  };

  if (showResults) {
    const correctCount = questions.filter(
      (q, index) => selectedAnswers[index] === q.correctAnswer
    ).length;
    const score = Math.round((correctCount / questions.length) * 100);

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-4xl font-display font-bold text-primary">
              {score}%
            </span>
          </div>
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <CardDescription>
            You got {correctCount} out of {questions.length} questions correct
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-display font-bold text-primary">
                {correctCount}
              </p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-display font-bold">
                {questions.length - correctCount}
              </p>
              <p className="text-sm text-muted-foreground">Incorrect</p>
            </div>
          </div>

          {/* Question Review */}
          <div className="space-y-2">
            <h3 className="font-semibold">Review Answers</h3>
            {questions.map((q, index) => {
              const isCorrect = selectedAnswers[index] === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={cn(
                    "p-3 rounded-lg border",
                    isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  )}
                >
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{q.question}</p>
                      {!isCorrect && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Correct answer: {q.correctAnswer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => window.location.reload()}>
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge>
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {Math.floor(timeElapsed / 60)}:
            {(timeElapsed % 60).toString().padStart(2, "0")}
          </div>
        </div>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-xl">{question.question}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswers[currentQuestion] === option;

          return (
            <button
              key={option}
              onClick={() => handleSelectAnswer(option)}
              className={cn(
                "w-full p-4 text-left rounded-lg border-2 transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-accent/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                    isSelected ? "border-primary" : "border-muted-foreground"
                  )}
                >
                  {isSelected && (
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  )}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          );
        })}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!hasAnswered} className="gap-2">
          {isLastQuestion ? "Finish" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
