"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Bot, Bell, Palette, Shield, Save, Camera } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [teachingStyle, setTeachingStyle] = useState("encouraging");
  const [aiModel, setAiModel] = useState("gpt-4");

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-4xl font-display font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your learning experience
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-2">
            <Bot className="h-4 w-4" />
            AI Tutor
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/user-avatar.png" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    ST
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG or PNG. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Student Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="student@uniclass.ai"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  placeholder="Tell us about yourself..."
                  defaultValue="Passionate learner focused on IELTS and programming"
                />
              </div>

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button variant="outline">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Tutor Settings */}
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Selection</CardTitle>
              <CardDescription>
                Choose the AI model that powers your tutor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {aiModels.map((model) => (
                  <div
                    key={model.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      aiModel === model.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setAiModel(model.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{model.name}</h3>
                          {model.recommended && (
                            <Badge variant="secondary">Recommended</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {model.description}
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            Speed: {model.speed}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Quality: {model.quality}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teaching Style</CardTitle>
              <CardDescription>
                Customize how your AI tutor interacts with you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {teachingStyles.map((style) => (
                  <div
                    key={style.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      teachingStyle === style.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setTeachingStyle(style.id)}
                  >
                    <div className="text-2xl mb-2">{style.icon}</div>
                    <h3 className="font-semibold mb-1">{style.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {style.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Avatar</CardTitle>
              <CardDescription>
                Choose an avatar for your AI tutor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {avatars.map((avatar) => (
                  <div
                    key={avatar}
                    className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl cursor-pointer hover:scale-110 transition-transform border-2 border-transparent hover:border-primary"
                  >
                    {avatar}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save AI Settings
          </Button>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{setting.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {setting.enabled ? "On" : "Off"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Customize the look and feel of UniClass AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="p-4 rounded-lg border-2 border-primary bg-primary/5 cursor-pointer">
                  <div className="h-20 rounded-md bg-gradient-to-br from-background to-muted mb-3" />
                  <p className="font-medium text-sm">Light</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-border hover:border-primary/50 cursor-pointer">
                  <div className="h-20 rounded-md bg-gradient-to-br from-gray-900 to-gray-800 mb-3" />
                  <p className="font-medium text-sm">Dark</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-border hover:border-primary/50 cursor-pointer">
                  <div className="h-20 rounded-md bg-gradient-to-br from-background to-gray-800 mb-3" />
                  <p className="font-medium text-sm">Auto</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const aiModels = [
  {
    id: "gpt-4",
    name: "GPT-4 Turbo",
    description:
      "โมเดลที่มีความสามารถสูงสุด มีการใช้เหตุผลขั้นสูงและคำอธิบายที่ละเอียด",
    speed: "เร็ว",
    quality: "ยอดเยี่ยม",
    recommended: true,
  },
  {
    id: "gpt-3.5",
    name: "GPT-3.5 Turbo",
    description: "ตอบกลับเร็วกว่า คุณภาพดีสำหรับคำถามทั่วไป",
    speed: "เร็วมาก",
    quality: "ดี",
    recommended: false,
  },
];

const teachingStyles = [
  {
    id: "encouraging",
    name: "ให้กำลังใจ",
    icon: "🌟",
    description: "สนับสนุนและให้ข้อเสนอแนะเชิงบวก ชมเชยบ่อยๆ",
  },
  {
    id: "socratic",
    name: "แบบโสกราตีส",
    icon: "🤔",
    description: "ชี้แนะผ่านคำถามเพื่อให้คุณค้นพบคำตอบเอง",
  },
  {
    id: "strict",
    name: "เข้มงวด",
    icon: "📚",
    description: "ตรงไปตรงมาและเคร่งครัดด้วยมาตรฐานสูง",
  },
  {
    id: "friendly",
    name: "เป็นกันเอง",
    icon: "😊",
    description: "สบายๆ เข้าถึงง่าย พร้อมคำอธิบายที่เข้าใจง่าย",
  },
];

const avatars = ["🤖", "👨‍🏫", "👩‍🏫", "🦊", "🐼", "🦉", "🐨", "🦄"];

const notificationSettings = [
  {
    id: "1",
    title: "แจ้งเตือนการเรียน",
    description: "รับการแจ้งเตือนก่อนเซสชั่นการเรียนที่กำหนดไว้",
    enabled: true,
  },
  {
    id: "2",
    title: "อัพเดทความก้าวหน้า",
    description: "สรุปความก้าวหน้าการเรียนรู้รายสัปดาห์",
    enabled: true,
  },
  {
    id: "3",
    title: "ผลคะแนนแบบทดสอบ",
    description: "แจ้งเตือนเมื่อผลคะแนนแบบทดสอบพร้อม",
    enabled: true,
  },
  {
    id: "4",
    title: "เทมเพลตใหม่",
    description: "แจ้งเตือนเมื่อมีเทมเพลตแผนการเรียนใหม่",
    enabled: false,
  },
];
