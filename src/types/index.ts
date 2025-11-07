export type Gender = "kvinne" | "mann" | "annet" | "ikke-oppgitt";

export interface UserProfile {
  name: string;
  email: string;
  startWeight: number;
  goalWeight: number;
  currentWeight?: number;
  gender?: Gender;
  courseStart?: string;
}

export interface BodyMetrics {
  weight: number;
  waist?: number;
  hip?: number;
  thigh?: number;
  arm?: number;
  bodyFat?: number;
  bodyWater?: number;
}

export interface WellnessMetrics {
  energy: number;
  mood: number;
}

export interface ReflectionEntry {
  id: string;
  createdAt: string;
  text: string;
  prompts?: string[];
}

export interface ProgressLog {
  id: string;
  createdAt: string;
  body: BodyMetrics;
  wellness: WellnessMetrics;
  reflection?: string;
}

export interface CourseContentItem {
  id: string;
  title: string;
  type: "video" | "artikkel" | "øvelse";
  durationMinutes?: number;
  description: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  completed: boolean;
  content: CourseContentItem[];
}

export interface Badge {
  id: string;
  label: string;
  description: string;
  earnedAt: string;
}

export interface CoachMessage {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface AppState {
  profile?: UserProfile;
  modules: CourseModule[];
  logs: ProgressLog[];
  journal: ReflectionEntry[];
  badges: Badge[];
  points: number;
  coachMessages: CoachMessage[];
}
