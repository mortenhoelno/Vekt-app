import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import SectionTitle from "@/components/SectionTitle";
import { useAppContext } from "@/context/AppContext";
import { formatDate, formatTime } from "@/utils/date";

const prompts = [
  "Hva gikk bra i dag?",
  "Hva vil du feire akkurat nå?",
  "Hva trenger du i morgen for å kjenne ro?"
];

export default function JournalScreen() {
  const { journal, addJournalEntry } = useAppContext();
  const [text, setText] = useState("");

  const handleSave = () => {
    if (!text.trim()) {
      return;
    }
    addJournalEntry({
      text: text.trim(),
      prompts
    });
    setText("");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle
        title="Dagbok"
        subtitle="La tankene lande. Coach Sunniva foreslår noen myke spørsmål."
      />
      <View style={styles.promptContainer}>
        {prompts.map((prompt) => (
          <Text key={prompt} variant="bodyMedium" style={styles.prompt}>
            • {prompt}
          </Text>
        ))}
      </View>
      <TextInput
        label="Dine refleksjoner"
        value={text}
        onChangeText={setText}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave}>
        Lagre refleksjon
      </Button>

      <SectionTitle title="Tidligere refleksjoner" />
      {journal.map((entry) => (
        <View key={entry.id} style={styles.entry}>
          <Text variant="titleSmall" style={styles.entryTitle}>
            {formatDate(entry.createdAt)} kl. {formatTime(entry.createdAt)}
          </Text>
          <Text variant="bodyMedium" style={styles.entryText}>
            {entry.text}
          </Text>
        </View>
      ))}
      {journal.length === 0 ? (
        <Text variant="bodyMedium" style={styles.empty}>
          Del en liten tanke for å se tidslinjen vokse 💛
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5F0"
  },
  content: {
    padding: 20,
    gap: 20
  },
  promptContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    gap: 8
  },
  prompt: {
    color: "#51624F"
  },
  input: {
    backgroundColor: "white"
  },
  entry: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12
  },
  entryTitle: {
    color: "#2D3A2E",
    marginBottom: 8,
    fontWeight: "600"
  },
  entryText: {
    color: "#51624F"
  },
  empty: {
    textAlign: "center",
    color: "#51624F"
  }
});
