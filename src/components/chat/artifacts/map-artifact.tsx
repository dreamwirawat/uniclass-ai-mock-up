"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  description?: string;
  color?: string;
}

interface MapArtifactProps {
  title: string;
  type: "thailand" | "world" | "asia";
  locations: Location[];
  description?: string;
}

export function MapArtifact({
  title,
  type,
  locations,
  description,
}: MapArtifactProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  // Simplified Thailand map path
  const thailandMapPath =
    "M250,50 L270,80 L280,120 L290,160 L285,200 L280,240 L270,280 L260,320 L255,360 L250,400 L240,380 L230,340 L220,300 L215,260 L210,220 L215,180 L220,140 L230,100 L240,70 Z";

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
        <div className="grid gap-4 md:grid-cols-2">
          {/* Map */}
          <div>
            <svg
              width="100%"
              height="500"
              viewBox="0 0 500 500"
              className="border rounded-lg bg-gradient-to-b from-blue-50 to-green-50"
            >
              {/* Thailand map outline */}
              <path
                d={thailandMapPath}
                fill="#FFA726"
                opacity="0.3"
                stroke="#FF6B1A"
                strokeWidth="2"
              />

              {/* Locations */}
              {locations.map((location) => (
                <g key={location.id}>
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r={selectedLocation?.id === location.id ? "12" : "8"}
                    fill={location.color || "#FF6B1A"}
                    opacity="0.9"
                    className="cursor-pointer transition-all hover:r-12"
                    onClick={() => setSelectedLocation(location)}
                    onMouseEnter={() => setSelectedLocation(location)}
                  />
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r={selectedLocation?.id === location.id ? "18" : "14"}
                    fill="none"
                    stroke={location.color || "#FF6B1A"}
                    strokeWidth="2"
                    opacity="0.5"
                    className="animate-ping"
                  />
                  <text
                    x={location.x + 15}
                    y={location.y + 5}
                    fill="#333"
                    fontSize="12"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {location.name}
                  </text>
                </g>
              ))}

              {/* Grid lines for reference */}
              <defs>
                <pattern
                  id="grid"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="#ccc"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                </pattern>
              </defs>
              <rect width="500" height="500" fill="url(#grid)" />
            </svg>
          </div>

          {/* Location info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">สถานที่</h3>
            {selectedLocation && (
              <div className="p-4 rounded-lg border-2 border-primary bg-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      backgroundColor: selectedLocation.color || "#FF6B1A",
                    }}
                  />
                  <span className="font-bold text-lg">
                    {selectedLocation.name}
                  </span>
                </div>
                {selectedLocation.description && (
                  <p className="text-sm text-muted-foreground">
                    {selectedLocation.description}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedLocation?.id === location.id
                      ? "border-primary bg-primary/10"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: location.color || "#FF6B1A" }}
                    />
                    <span className="font-semibold">{location.name}</span>
                  </div>
                  {location.description && (
                    <p className="text-xs text-muted-foreground mt-1 ml-5">
                      {location.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
