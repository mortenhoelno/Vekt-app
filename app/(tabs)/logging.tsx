import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useAppContext } from "@/context/AppContext";
import SectionTitle from "@/components/SectionTitle";
import { formatDate } from "@/utils/date";

export default function LoggingScreen() {
  const { addLog, logs } = useAppContext();
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [energy, setEnergy] = useState("");
  const [mood, setMood] = useState("");
  const [reflection, setReflection] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!weight || !energy || !mood) {
      setError("Vennligst fyll ut vekt, energi og humør.");
      return;
    }

    const numericWeight = Number(weight);
    const numericWaist = waist ? Number(waist) : undefined;
    const numericEnergy = Number(energy);
    const numericMood = Number(mood);

    if ([numericWeight, numericEnergy, numericMood].some((value) => Number.isNaN(value))) {
      setError("Sjekk at tallfeltene kun inneholder tall.");
      return;
    }

    addLog({
      body: {
        weight: numericWeight,
        waist: numericWaist
      },
      wellness: {
        energy: numericEnergy,
        mood: numericMood
      },
      reflection: reflection.trim() ? reflection.trim() : undefined
    });

    setWeight("");
    setWaist("");
    setEnergy("");
    setMood("");
    setReflection("");
    setError(null);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          title="Dagens innsjekk"
          subtitle="Logg hvordan kroppen og humøret ditt har det i dag."
        />
        <View style={styles.form}>
          <TextInput
            label="Vekt (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Midje (cm)"
            value={waist}
            onChangeText={setWaist}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Energi (1-10)"
            value={energy}
            onChangeText={setEnergy}
            keyboardType="number-pad"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Humør (1-10)"
            value={mood}
            onChangeText={setMood}
            keyboardType="number-pad"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Refleksjon"
            value={reflection}
            onChangeText={setReflection}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />
          {error ? <HelperText type="error">{error}</HelperText> : null}
          <Button mode="contained" onPress={handleSubmit}>
            Lagre logg
          </Button>
        </View>

        <SectionTitle title="Historikk" subtitle="Se tidligere registreringer" />
        {logs.map((log) => (
          <View key={log.id} style={styles.logCard}>
            <Text variant="titleSmall" style={styles.logTitle}>
              {formatDate(log.createdAt)}
            </Text>
            <Text variant="bodyMedium" style={styles.logText}>
              Vekt: {log.body.weight.toFixed(1)} kg • Energi: {log.wellness.energy}/10 • Humør: {log.wellness.mood}/10
            </Text>
            {log.reflection ? (
              <Text variant="bodySmall" style={styles.logReflection}>
                "{log.reflection}"
              </Text>
            ) : null}
          </View>
        ))}
        {logs.length === 0 ? (
          <Text variant="bodyMedium" style={styles.empty}>
            Ingen logger enda. Første steg venter på deg! 💛
          </Text>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
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
  form: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    gap: 12
  },
  input: {
    backgroundColor: "white"
  },
  logCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12
  },
  logTitle: {
    color: "#2D3A2E",
    fontWeight: "600",
    marginBottom: 4
  },
  logText: {
    color: "#51624F"
  },
  logReflection: {
    marginTop: 8,
    fontStyle: "italic",
    color: "#7B4B2A"
  },
  empty: {
    textAlign: "center",
    color: "#51624F",
    marginTop: 32
  }
});
