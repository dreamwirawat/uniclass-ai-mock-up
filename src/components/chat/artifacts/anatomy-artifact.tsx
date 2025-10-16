"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface BodyPart {
  id: string;
  name: string;
  description: string;
  path: string;
  color: string;
}

interface AnatomyArtifactProps {
  title: string;
  type: "human" | "brain" | "heart";
  description?: string;
}

const humanBodyParts: BodyPart[] = [
  {
    id: "head",
    name: "สมอง",
    description: "ควบคุมการทำงานของร่างกาย",
    path: "M400,50 Q420,50 420,70 L420,100 Q420,110 410,110 L390,110 Q380,110 380,100 L380,70 Q380,50 400,50",
    color: "#FF6B1A",
  },
  {
    id: "heart",
    name: "หัวใจ",
    description: "สูบฉีดเลือดไปทั่วร่างกาย",
    path: "M400,150 L380,170 L380,190 Q380,200 390,205 L400,210 L410,205 Q420,200 420,190 L420,170 Z",
    color: "#F44336",
  },
  {
    id: "lungs",
    name: "ปอด",
    description: "แลกเปลี่ยนออกซิเจน",
    path: "M360,160 Q350,160 350,170 L350,200 Q350,210 360,210 L370,210 L370,160 Z M430,160 Q440,160 440,170 L440,200 Q440,210 430,210 L420,210 L420,160 Z",
    color: "#2196F3",
  },
  {
    id: "stomach",
    name: "กระเพาะอาหาร",
    description: "ย่อยอาหาร",
    path: "M385,230 Q370,230 370,245 L370,270 Q370,285 385,285 L415,285 Q430,285 430,270 L430,245 Q430,230 415,230 Z",
    color: "#4CAF50",
  },
  {
    id: "body",
    name: "ลำตัว",
    description: "โครงสร้างหลักของร่างกาย",
    path: "M370,120 L370,300 L390,300 L390,120 M410,120 L410,300 L430,300 L430,120",
    color: "#FFA726",
  },
];

export function AnatomyArtifact({
  title,
  type,
  description,
}: AnatomyArtifactProps) {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);

  return (
    <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          🫀 {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Diagram */}
          <div>
            <svg
              width="100%"
              height="400"
              viewBox="0 0 800 500"
              className="border rounded-lg bg-background"
            >
              {/* Body outline */}
              <path
                d="M400,50 Q420,50 420,70 L420,300 L430,300 L430,350 L435,450 L420,450 L420,480 L380,480 L380,450 L365,450 L370,350 L380,300 L380,70 Q380,50 400,50"
                fill="none"
                stroke="#ccc"
                strokeWidth="2"
              />

              {/* Body parts */}
              {humanBodyParts.map((part) => (
                <g key={part.id}>
                  <path
                    d={part.path}
                    fill={part.color}
                    opacity={selectedPart?.id === part.id ? 1 : 0.7}
                    stroke={selectedPart?.id === part.id ? "#000" : "none"}
                    strokeWidth="2"
                    className="cursor-pointer transition-all hover:opacity-100"
                    onClick={() => setSelectedPart(part)}
                    onMouseEnter={() => setSelectedPart(part)}
                  />
                </g>
              ))}

              {/* Arms */}
              <line
                x1="370"
                y1="140"
                x2="330"
                y2="250"
                stroke="#FFA726"
                strokeWidth="15"
                strokeLinecap="round"
              />
              <line
                x1="430"
                y1="140"
                x2="470"
                y2="250"
                stroke="#FFA726"
                strokeWidth="15"
                strokeLinecap="round"
              />

              {/* Legs */}
              <line
                x1="385"
                y1="300"
                x2="375"
                y2="480"
                stroke="#FFA726"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <line
                x1="415"
                y1="300"
                x2="425"
                y2="480"
                stroke="#FFA726"
                strokeWidth="20"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">ส่วนประกอบของร่างกาย</h3>
            {humanBodyParts.map((part) => (
              <div
                key={part.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedPart?.id === part.id
                    ? "border-primary bg-primary/10"
                    : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedPart(part)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: part.color }}
                  />
                  <span className="font-semibold">{part.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {part.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
