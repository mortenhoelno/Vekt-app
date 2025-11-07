import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import SectionTitle from "@/components/SectionTitle";
import { useAppContext } from "@/context/AppContext";
import { formatDate } from "@/utils/date";

export default function ProfileScreen() {
  const { profile, updateProfile, logout, points, badges } = useAppContext();
  const [name, setName] = useState(profile?.name ?? "");
  const [gender, setGender] = useState(profile?.gender ?? "");
  const [error, setError] = useState<string | null>(null);

  if (!profile) {
    return (
      <View style={styles.emptyState}>
        <Text variant="bodyLarge">Logg inn for å se profilen din.</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (!name.trim()) {
      setError("Navn kan ikke være tomt.");
      return;
    }

    updateProfile({
      name: name.trim(),
      gender: gender.trim() ? (gender.trim() as typeof profile.gender) : undefined
    });
    setError(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="Profil" subtitle="Tilpass coachens stemme og mål." />
      <View style={styles.card}>
        <TextInput
          label="Navn"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Kjønn (valgfritt)"
          value={gender}
          onChangeText={setGender}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Startvekt"
          value={`${profile.startWeight} kg`}
          editable={false}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Målvekt"
          value={`${profile.goalWeight} kg`}
          editable={false}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Kursstart"
          value={profile.courseStart ? formatDate(profile.courseStart) : "Ikke satt"}
          editable={false}
          mode="outlined"
          style={styles.input}
        />
        {profile.currentWeight ? (
          <Text variant="bodyMedium" style={styles.status}>
            Nåværende vekt: {profile.currentWeight.toFixed(1)} kg
          </Text>
        ) : null}
        {error ? <HelperText type="error">{error}</HelperText> : null}
        <Button mode="contained" onPress={handleSave}>
          Lagre profil
        </Button>
      </View>

      <SectionTitle title="Poeng og badges" />
      <View style={styles.card}>
        <Text variant="titleMedium" style={styles.status}>
          Totale poeng: {points}
        </Text>
        {badges.length ? (
          badges.map((badge) => (
            <Text key={badge.id} variant="bodyMedium" style={styles.badge}>
              🏅 {badge.label} — {badge.description}
            </Text>
          ))
        ) : (
          <Text variant="bodyMedium" style={styles.status}>
            Badgene dine venter på deg! Fullfør aktiviteter for å låse dem opp.
          </Text>
        )}
      </View>

      <Button mode="outlined" onPress={logout} style={styles.logout}>
        Logg ut
      </Button>
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
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    gap: 12
  },
  input: {
    backgroundColor: "white"
  },
  status: {
    color: "#51624F"
  },
  badge: {
    color: "#2D3A2E"
  },
  logout: {
    alignSelf: "center"
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
