// Mock data store using localStorage
// This simulates a backend database for the mockup

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  category: string;
  lessonsCount: number;
  estimatedHours: number;
  progress: number;
  completedLessons: number;
  is_template: boolean;
  created_at: string;
  updated_at?: string;
}

export interface LessonProgress {
  lessonId: string;
  studyPlanId: string;
  completed: boolean;
  completedAt?: string;
  quizScore?: number;
  timeSpent?: number;
}

export interface ScheduleSession {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  studyPlanId?: string;
  lessonId?: string;
  notes?: string;
  created_at: string;
}

export interface UserSettings {
  name: string;
  email: string;
  bio: string;
  teachingStyle: string;
  aiModel: string;
  theme: string;
  notifications: { [key: string]: boolean };
  updated_at: string;
}

// Study Plans
export function getStudyPlans(): StudyPlan[] {
  if (typeof window === "undefined") return [];
  const plans = localStorage.getItem("studyPlans");
  return plans ? JSON.parse(plans) : getDefaultStudyPlans();
}

export function getStudyPlan(id: string): StudyPlan | null {
  const plans = getStudyPlans();
  return plans.find((p) => p.id === id) || null;
}

export function saveStudyPlan(plan: StudyPlan): void {
  const plans = getStudyPlans();
  const index = plans.findIndex((p) => p.id === plan.id);

  if (index >= 0) {
    plans[index] = { ...plan, updated_at: new Date().toISOString() };
  } else {
    plans.push({ ...plan, created_at: new Date().toISOString() });
  }

  localStorage.setItem("studyPlans", JSON.stringify(plans));
}

export function deleteStudyPlan(id: string): void {
  const plans = getStudyPlans().filter((p) => p.id !== id);
  localStorage.setItem("studyPlans", JSON.stringify(plans));
}

// Lesson Progress
export function getLessonProgress(): LessonProgress[] {
  if (typeof window === "undefined") return [];
  const progress = localStorage.getItem("lessonProgress");
  return progress ? JSON.parse(progress) : [];
}

export function getLessonProgressByPlan(planId: string): LessonProgress[] {
  return getLessonProgress().filter((p) => p.studyPlanId === planId);
}

export function saveLessonProgress(progress: LessonProgress): void {
  const allProgress = getLessonProgress();
  const index = allProgress.findIndex(
    (p) =>
      p.lessonId === progress.lessonId && p.studyPlanId === progress.studyPlanId
  );

  if (index >= 0) {
    allProgress[index] = progress;
  } else {
    allProgress.push(progress);
  }

  localStorage.setItem("lessonProgress", JSON.stringify(allProgress));

  // Update study plan progress
  updateStudyPlanProgress(progress.studyPlanId);
}

export function updateStudyPlanProgress(planId: string): void {
  const plan = getStudyPlan(planId);
  if (!plan) return;

  const planProgress = getLessonProgressByPlan(planId);
  const completedCount = planProgress.filter((p) => p.completed).length;
  const totalLessons = plan.lessonsCount || 20; // Default to 20 if not set
  const progressPercentage = Math.round((completedCount / totalLessons) * 100);

  plan.progress = progressPercentage;
  plan.completedLessons = completedCount;
  saveStudyPlan(plan);
}

// Schedule Sessions
export function getScheduleSessions(): ScheduleSession[] {
  if (typeof window === "undefined") return [];
  const sessions = localStorage.getItem("scheduleSessions");
  return sessions ? JSON.parse(sessions) : [];
}

export function saveScheduleSession(session: ScheduleSession): void {
  const sessions = getScheduleSessions();
  const index = sessions.findIndex((s) => s.id === session.id);

  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }

  localStorage.setItem("scheduleSessions", JSON.stringify(sessions));
}

export function deleteScheduleSession(id: string): void {
  const sessions = getScheduleSessions().filter((s) => s.id !== id);
  localStorage.setItem("scheduleSessions", JSON.stringify(sessions));
}

// User Settings
export function getUserSettings(): UserSettings | null {
  if (typeof window === "undefined") return null;
  const settings = localStorage.getItem("userSettings");
  return settings ? JSON.parse(settings) : null;
}

export function saveUserSettings(settings: UserSettings): void {
  localStorage.setItem("userSettings", JSON.stringify(settings));
}

// Statistics
export function getUserStatistics() {
  const plans = getStudyPlans();
  const progress = getLessonProgress();

  const totalLessons = plans.reduce(
    (sum, plan) => sum + (plan.lessonsCount || 0),
    0
  );
  const completedLessons = progress.filter((p) => p.completed).length;
  const totalHours =
    progress.reduce((sum, p) => sum + (p.timeSpent || 0), 0) / 60;

  const averageScore =
    progress.filter((p) => p.quizScore !== undefined).length > 0
      ? Math.round(
          progress
            .filter((p) => p.quizScore !== undefined)
            .reduce((sum, p) => sum + (p.quizScore || 0), 0) /
            progress.filter((p) => p.quizScore !== undefined).length
        )
      : 0;

  // Calculate streak (mock - would need actual daily data)
  const currentStreak = 7;
  const longestStreak = 14;

  return {
    totalPlans: plans.length,
    activePlans: plans.filter((p) => p.progress > 0 && p.progress < 100).length,
    totalLessons,
    completedLessons,
    inProgressLessons: totalLessons - completedLessons,
    totalHours,
    averageScore,
    currentStreak,
    longestStreak,
    completionRate:
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0,
  };
}

// Default mock data
function getDefaultStudyPlans(): StudyPlan[] {
  return [
    {
      id: "1",
      title: "เตรียมสอบ IELTS ฉบับสมบูรณ์",
      description:
        "การเตรียมสอบ IELTS แบบครอบคลุมทั้ง 4 ทักษะ: อ่าน เขียน ฟัง และพูด พร้อมเทคนิคและแนวข้อสอบจริง",
      category: "ภาษา",
      lessonsCount: 20,
      estimatedHours: 40,
      progress: 60,
      completedLessons: 12,
      is_template: false,
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      title: "พัฒนาเว็บไซต์แบบ Full-Stack",
      description:
        "เรียนรู้ HTML, CSS, JavaScript, React, Node.js และฐานข้อมูล เพื่อเป็นนักพัฒนาเว็บ Full-Stack",
      category: "โปรแกรมมิ่ง",
      lessonsCount: 35,
      estimatedHours: 80,
      progress: 45,
      completedLessons: 16,
      is_template: false,
      created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      title: "โครงสร้างข้อมูลและอัลกอริทึม",
      description:
        "เชี่ยวชาญโครงสร้างข้อมูลและอัลกอริทึมพื้นฐานสำหรับสัมภาษณ์งานและการแข่งขันเขียนโปรแกรม",
      category: "วิทยาการคอมพิวเตอร์",
      lessonsCount: 25,
      estimatedHours: 50,
      progress: 20,
      completedLessons: 5,
      is_template: false,
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

// Initialize default data if not exists
export function initializeDefaultData(): void {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem("studyPlans")) {
    localStorage.setItem("studyPlans", JSON.stringify(getDefaultStudyPlans()));
  }

  if (!localStorage.getItem("lessonProgress")) {
    // Initialize some sample lesson progress
    const sampleProgress: LessonProgress[] = [
      {
        lessonId: "1",
        studyPlanId: "1",
        completed: true,
        completedAt: new Date().toISOString(),
        quizScore: 90,
        timeSpent: 30,
      },
      {
        lessonId: "2",
        studyPlanId: "1",
        completed: true,
        completedAt: new Date().toISOString(),
        quizScore: 85,
        timeSpent: 45,
      },
      {
        lessonId: "3",
        studyPlanId: "1",
        completed: false,
        quizScore: undefined,
        timeSpent: 15,
      },
    ];
    localStorage.setItem("lessonProgress", JSON.stringify(sampleProgress));
  }
}
