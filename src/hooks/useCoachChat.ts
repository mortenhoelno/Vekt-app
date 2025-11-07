import { useState } from "react";
import { generateCoachResponse } from "@/services/coach";
import { CoachMessage } from "@/types";
import { useAppContext } from "@/context/AppContext";

export function useCoachChat() {
  const { addCoachMessage, coachMessages, profile, logs } = useAppContext();
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) {
      return;
    }

    const userMessage: CoachMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
      createdAt: new Date().toISOString()
    };

    addCoachMessage(userMessage);
    setIsSending(true);

    try {
      const assistantMessage = await generateCoachResponse({
        messages: [...coachMessages, userMessage],
        profile,
        latestLog: logs[0] ?? null
      });
      addCoachMessage(assistantMessage);
    } finally {
      setIsSending(false);
    }
  };

  return {
    messages: coachMessages,
    isSending,
    sendMessage
  };
}
