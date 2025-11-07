import { Redirect } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Button, Text, TextInput, HelperText } from "react-native-paper";
import { useAppContext } from "@/context/AppContext";

export default function Index() {
  const { profile, login } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startWeight, setStartWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (profile) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  const handleLogin = () => {
    if (!name.trim() || !email.trim() || !startWeight.trim() || !goalWeight.trim()) {
      setError("Vennligst fyll inn alle felt.");
      return;
    }

    const numericStart = Number(startWeight);
    const numericGoal = Number(goalWeight);

    if (Number.isNaN(numericStart) || Number.isNaN(numericGoal)) {
      setError("Vekt må være et tall.");
      return;
    }

    login({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      startWeight: numericStart,
      goalWeight: numericGoal
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text variant="headlineMedium" style={styles.title}>
            Velkommen til Sunn Slanking for Livsnytere
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            La oss bli kjent slik at vi kan følge deg tett gjennom reisen.
          </Text>
          <TextInput label="Navn" value={name} onChangeText={setName} style={styles.input} mode="outlined" />
          <TextInput
            label="E-post"
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Startvekt (kg)"
            value={startWeight}
            onChangeText={setStartWeight}
            keyboardType="decimal-pad"
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Målvekt (kg)"
            value={goalWeight}
            onChangeText={setGoalWeight}
            keyboardType="decimal-pad"
            style={styles.input}
            mode="outlined"
          />
          {error ? <HelperText type="error">{error}</HelperText> : null}
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Start reisen
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5F0"
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    gap: 16,
    elevation: 3
  },
  title: {
    textAlign: "center",
    color: "#2D3A2E"
  },
  subtitle: {
    textAlign: "center",
    color: "#51624F"
  },
  input: {
    backgroundColor: "white"
  },
  button: {
    marginTop: 8
  }
});
