"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MathGraphProps {
  equation: string;
  type: "function" | "parametric" | "polar" | "implicit";
  title?: string;
  description?: string;
  className?: string;
}

interface GraphData {
  x: number[];
  y: number[];
}

export function MathGraph({
  equation,
  type,
  title,
  description,
  className,
}: MathGraphProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate graph data based on equation and type
  const generateGraphData = (): GraphData => {
    const x: number[] = [];
    const y: number[] = [];

    // Simple function evaluation for demonstration
    // In a real implementation, you'd use a proper math parser
    for (let i = -10; i <= 10; i += 0.1) {
      x.push(i);

      // Simple function examples
      if (equation.includes("x^2")) {
        y.push(i * i);
      } else if (equation.includes("sin")) {
        y.push(Math.sin(i));
      } else if (equation.includes("cos")) {
        y.push(Math.cos(i));
      } else if (equation.includes("exp") || equation.includes("e^")) {
        y.push(Math.exp(i));
      } else if (equation.includes("log")) {
        y.push(Math.log(Math.abs(i) + 0.1));
      } else if (equation.includes("sqrt")) {
        y.push(Math.sqrt(Math.abs(i)));
      } else {
        // Default linear function
        y.push(i * 0.5);
      }
    }

    return { x, y };
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up coordinate system
    const centerX = width / 2 + pan.x;
    const centerY = height / 2 + pan.y;

    // Draw axes
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Draw grid
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 0.5;
    const gridSize = 20 * zoom;

    for (let i = 0; i < width; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }

    for (let i = 0; i < height; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Draw function
    const data = generateGraphData();
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;
    data.x.forEach((xVal, index) => {
      const x = centerX + xVal * gridSize * zoom;
      const y = centerY - data.y[index] * gridSize * zoom;

      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
    });

    ctx.stroke();

    // Draw equation
    ctx.fillStyle = "#374151";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillText(equation, 10, 25);
  };

  useEffect(() => {
    drawGraph();
  }, [equation, zoom, pan]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 3));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.3));
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Math Equation Display */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-3">
          <Calculator className="h-5 w-5 text-primary" />
          <div>
            <div className="font-mono text-sm font-medium">{equation}</div>
            {title && (
              <div className="text-xs text-muted-foreground">{title}</div>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          {isExpanded ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
          {isExpanded ? "ซ่อนกราฟ" : "แสดงกราฟ"}
        </Button>
      </div>

      {/* Graph Visualization */}
      {isExpanded && (
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                กราฟฟังก์ชัน
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Interactive
                </Badge>
                <Button variant="ghost" size="sm" onClick={resetView}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={isExpanded ? 600 : 400}
                height={isExpanded ? 400 : 300}
                className={cn(
                  "border-b cursor-grab",
                  isDragging && "cursor-grabbing"
                )}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />

              {/* Controls */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={zoomIn}
                  className="h-8 w-8 p-0"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={zoomOut}
                  className="h-8 w-8 p-0"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Graph Info */}
            <div className="p-4 bg-muted/30">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">ประเภท:</span>
                  <span className="ml-2 text-muted-foreground capitalize">
                    {type}
                  </span>
                </div>
                <div>
                  <span className="font-medium">ซูม:</span>
                  <span className="ml-2 text-muted-foreground">
                    {zoom.toFixed(1)}x
                  </span>
                </div>
              </div>
              {description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {description}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Math content detector and enhancer
export function MathContentEnhancer({ content }: { content: string }) {
  const mathPatterns = [
    { pattern: /f\(x\)\s*=\s*([^,\n]+)/g, type: "function" as const },
    { pattern: /y\s*=\s*([^,\n]+)/g, type: "function" as const },
    { pattern: /sin\s*\([^)]+\)/g, type: "function" as const },
    { pattern: /cos\s*\([^)]+\)/g, type: "function" as const },
    { pattern: /x\^2/g, type: "function" as const },
    { pattern: /e\^x/g, type: "function" as const },
    { pattern: /log\s*\([^)]+\)/g, type: "function" as const },
  ];

  const enhancedContent = content.split("\n").map((line, lineIndex) => {
    let enhancedLine = line;
    let hasMath = false;

    mathPatterns.forEach(({ pattern, type }) => {
      const matches = line.match(pattern);
      if (matches) {
        hasMath = true;
        matches.forEach((match) => {
          const mathComponent = (
            <MathGraph
              key={`${lineIndex}-${match}`}
              equation={match}
              type={type}
              title={`ฟังก์ชัน: ${match}`}
              description="คลิกเพื่อดูกราฟแบบ interactive"
            />
          );
          // In a real implementation, you'd replace the text with the component
          enhancedLine = enhancedLine.replace(match, `[MATH:${match}]`);
        });
      }
    });

    return { line: enhancedLine, hasMath, lineIndex };
  });

  return (
    <div className="space-y-4">
      {enhancedContent.map(({ line, hasMath, lineIndex }) => (
        <div key={lineIndex}>
          {hasMath ? (
            <div className="space-y-2">
              <p className="text-muted-foreground">{line}</p>
              {/* Render math components here */}
            </div>
          ) : (
            <p className="text-muted-foreground">{line}</p>
          )}
        </div>
      ))}
    </div>
  );
}
