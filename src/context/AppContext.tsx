import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import {
  AppState,
  Badge,
  CoachMessage,
  ProgressLog,
  ReflectionEntry,
  UserProfile
} from "@/types";
import { defaultModules } from "@/data/modules";
import { clearState, loadState, saveState } from "@/services/storage";

interface LoginPayload {
  name: string;
  email: string;
  startWeight: number;
  goalWeight: number;
}

interface AppContextValue extends AppState {
  ready: boolean;
  login: (payload: LoginPayload) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addLog: (log: Omit<ProgressLog, "id" | "createdAt"> & { createdAt?: string }) => void;
  addJournalEntry: (entry: Omit<ReflectionEntry, "id" | "createdAt"> & { createdAt?: string }) => void;
  toggleModuleCompletion: (moduleId: string) => void;
  addCoachMessage: (message: CoachMessage) => void;
  setCoachMessages: (messages: CoachMessage[]) => void;
}

const initialState: AppState = {
  profile: undefined,
  modules: defaultModules,
  logs: [],
  journal: [],
  badges: [],
  points: 0,
  coachMessages: []
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AppState>(initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await loadState<AppState>();
      if (stored) {
        setState({
          ...stored,
          modules: stored.modules.length ? stored.modules : defaultModules
        });
      }
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }
    saveState(state).catch(() => null);
  }, [state, ready]);

  const value = useMemo<AppContextValue>(() => {
    return {
      ...state,
      ready,
      login: (payload) => {
        const courseStart = new Date().toISOString();
        setState((prev) => ({
          ...prev,
          profile: {
            name: payload.name,
            email: payload.email,
            startWeight: payload.startWeight,
            goalWeight: payload.goalWeight,
            courseStart
          },
          coachMessages:
            prev.coachMessages.length > 0
              ? prev.coachMessages
              : [
                  {
                    id: `assistant-welcome-${Date.now()}`,
                    role: "assistant",
                    content:
                      "Så fint å møte deg! Jeg er her som din varme støttespiller gjennom hele kurset. Si fra når du ønsker tips eller motivasjon.",
                    createdAt: new Date().toISOString()
                  }
                ]
        }));
        router.replace("/(tabs)/dashboard");
      },
      logout: () => {
        setState(initialState);
        clearState().catch(() => null);
        router.replace("/");
      },
      updateProfile: (profileUpdates) => {
        setState((prev) => ({
          ...prev,
          profile: prev.profile ? { ...prev.profile, ...profileUpdates } : prev.profile
        }));
      },
      addLog: (logInput) => {
        setState((prev) => {
          const newLog: ProgressLog = {
            id: `log-${Date.now()}`,
            createdAt: logInput.createdAt ?? new Date().toISOString(),
            body: logInput.body,
            wellness: logInput.wellness,
            reflection: logInput.reflection
          };
          const logs = [newLog, ...prev.logs];
          const badgeIds = new Set(prev.badges.map((badge) => badge.id));
          const newBadges: Badge[] = [...prev.badges];
          let pointsEarned = 25;

          if (!badgeIds.has("first-log")) {
            newBadges.push({
              id: "first-log",
              label: "Første innsjekk",
              description: "Du har tatt ditt første steg i loggboken!",
              earnedAt: new Date().toISOString()
            });
            badgeIds.add("first-log");
            pointsEarned += 50;
          }

          const uniqueDays = new Set(
            logs.map((log) => new Date(log.createdAt).toISOString().substring(0, 10))
          );
          if (!badgeIds.has("streak-3") && uniqueDays.size >= 3) {
            newBadges.push({
              id: "streak-3",
              label: "3-dagers streak",
              description: "Du har logget tre dager på rad. Vanene dine sitter!",
              earnedAt: new Date().toISOString()
            });
            badgeIds.add("streak-3");
            pointsEarned += 50;
          }

          return {
            ...prev,
            logs,
            badges: newBadges,
            points: prev.points + pointsEarned,
            profile: prev.profile
              ? { ...prev.profile, currentWeight: logInput.body.weight }
              : prev.profile
          };
        });
      },
      addJournalEntry: (entry) => {
        setState((prev) => {
          const newEntry: ReflectionEntry = {
            id: `journal-${Date.now()}`,
            createdAt: entry.createdAt ?? new Date().toISOString(),
            text: entry.text,
            prompts: entry.prompts
          };
          return {
            ...prev,
            journal: [newEntry, ...prev.journal],
            points: prev.points + 15
          };
        });
      },
      toggleModuleCompletion: (moduleId) => {
        setState((prev) => {
          const modules = prev.modules.map((module) =>
            module.id === moduleId ? { ...module, completed: !module.completed } : module
          );
          const completedCount = modules.filter((m) => m.completed).length;
          const badgeIds = new Set(prev.badges.map((badge) => badge.id));
          const badges: Badge[] = [...prev.badges];
          let pointsEarned = 20;

          if (completedCount === modules.length && modules.length > 0 && !badgeIds.has("course-finish")) {
            badges.push({
              id: "course-finish",
              label: "Fullført kurs",
              description: "Hele kursreisen er komplett. For en prestasjon!",
              earnedAt: new Date().toISOString()
            });
            pointsEarned += 100;
          }

          return {
            ...prev,
            modules,
            badges,
            points: prev.points + pointsEarned
          };
        });
      },
      addCoachMessage: (message) => {
        setState((prev) => ({
          ...prev,
          coachMessages: [...prev.coachMessages, message]
        }));
      },
      setCoachMessages: (messages) => {
        setState((prev) => ({
          ...prev,
          coachMessages: messages
        }));
      }
    };
  }, [state, ready, router]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext må brukes innenfor AppProvider");
  }
  return context;
}

export function useAppBootstrap() {
  const { ready } = useAppContext();
  return { ready };
}
