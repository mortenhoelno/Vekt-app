import Constants from "expo-constants";
import { CoachMessage, ProgressLog, UserProfile } from "@/types";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

function buildSystemPrompt(profile?: UserProfile) {
  const base =
    "Du er Sunniva, en empatisk AI-coach for programmet Sunn Slanking for Livsnytere. " +
    "Du skriver på varm norsk bokmål, feirer små steg og inviterer til refleksjon uten skam.";

  if (!profile) {
    return base;
  }

  return (
    base +
    ` Bruker heter ${profile.name} og ønsker å gå fra ${profile.startWeight} kg til ${profile.goalWeight} kg. ` +
    "Tilby konkrete, oppmuntrende tips og knytt gjerne svar til relevante moduler når det passer."
  );
}

export async function generateCoachResponse(options: {
  messages: CoachMessage[];
  profile?: UserProfile;
  latestLog?: ProgressLog | null;
}): Promise<CoachMessage> {
  const { messages, profile, latestLog } = options;
  const apiKey = Constants.expoConfig?.extra?.openaiKey ?? process.env.EXPO_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    const fallbackContent =
      "Jeg ser at du ønsker støtte, men jeg mangler nøklene for å kontakte OpenAI akkurat nå. " +
      "Be en administrator legge til EXPO_PUBLIC_OPENAI_API_KEY for å aktivere meg.";
    return {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: fallbackContent,
      createdAt: new Date().toISOString()
    };
  }

  const systemPrompt = buildSystemPrompt(profile);

  const payloadMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((message) => ({ role: message.role, content: message.content }))
  ];

  if (latestLog) {
    payloadMessages.push({
      role: "system",
      content: `Siste logg: ${latestLog.body.weight} kg, energi ${latestLog.wellness.energy}/10, humør ${latestLog.wellness.mood}/10. Refleksjon: ${latestLog.reflection ?? "(ikke skrevet)"}.`
    });
  }

  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: payloadMessages,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const fallback = await response.text();
    return {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: `Jeg fikk ikke kontakt med AI-tjenesten akkurat nå. Feil: ${fallback}`,
      createdAt: new Date().toISOString()
    };
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content ?? "Jeg er her for deg 💛 Hva ønsker du å utforske i dag?";

  return {
    id: json.id ?? `assistant-${Date.now()}`,
    role: "assistant",
    content,
    createdAt: new Date().toISOString()
  };
}
