"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color?: string;
}

interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

interface DiagramArtifactProps {
  title: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  description?: string;
}

export function DiagramArtifact({
  title,
  nodes,
  edges,
  description,
}: DiagramArtifactProps) {
  return (
    <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          🗺️ {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <svg
          width="100%"
          height="400"
          viewBox="0 0 800 400"
          className="border rounded-lg bg-background"
        >
          {/* Draw edges */}
          {edges.map((edge, idx) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            return (
              <g key={idx}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="#FF6B1A"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                {edge.label && (
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2}
                    fill="#666"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Draw nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="30"
                fill={node.color || "#FF6B1A"}
                opacity="0.9"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {node.label}
              </text>
            </g>
          ))}

          {/* Arrow marker */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#FF6B1A" />
            </marker>
          </defs>
        </svg>
      </CardContent>
    </Card>
  );
}
