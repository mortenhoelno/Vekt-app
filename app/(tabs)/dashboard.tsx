import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Card, ProgressBar } from "react-native-paper";
import { useAppContext } from "@/context/AppContext";
import SectionTitle from "@/components/SectionTitle";
import MetricCard from "@/components/MetricCard";
import WeeklyCelebration from "@/components/WeeklyCelebration";
import { formatDate } from "@/utils/date";

export default function DashboardScreen() {
  const { profile, logs, points, modules, badges } = useAppContext();
  const latestLog = logs[0];
  const progress = modules.length
    ? modules.filter((module) => module.completed).length / modules.length
    : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineMedium" style={styles.greeting}>
        Hei {profile?.name ?? "venn"} 🌿
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Små steg teller mest. Her er et glimt av reisen din.
      </Text>

      <View style={styles.metricRow}>
        <MetricCard
          label="Sist registrerte vekt"
          value={latestLog ? `${latestLog.body.weight.toFixed(1)} kg` : "Ingen enda"}
          accent="primary"
        />
        <MetricCard
          label="Energi"
          value={latestLog ? `${latestLog.wellness.energy}/10` : "–"}
          accent="secondary"
        />
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <SectionTitle title="Kursprogresjon" subtitle="Hold rytmen i modulene" />
          <ProgressBar progress={progress} color="#4F8B7F" style={styles.progress} />
          <Text variant="labelMedium" style={styles.progressText}>
            {Math.round(progress * 100)} % fullført
          </Text>
        </Card.Content>
      </Card>

      {latestLog ? (
        <Card style={styles.card}>
          <Card.Content>
            <SectionTitle
              title="Siste refleksjon"
              subtitle={`Registrert ${formatDate(latestLog.createdAt)}`}
            />
            <Text variant="bodyMedium" style={styles.reflection}>
              {latestLog.reflection ?? "Du skrev ingen refleksjon denne gangen, og det er helt greit."}
            </Text>
          </Card.Content>
        </Card>
      ) : null}

      <WeeklyCelebration
        points={points}
        highlight={
          badges.length
            ? `Du har allerede ${badges.length} badge${badges.length > 1 ? "r" : ""}. Fortsett å feire!`
            : "Logg et øyeblikk i dag for å låse opp din første badge."
        }
      />
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
  greeting: {
    color: "#2D3A2E",
    fontWeight: "600"
  },
  subtitle: {
    color: "#51624F"
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap"
  },
  card: {
    borderRadius: 16
  },
  progress: {
    marginTop: 8,
    height: 10,
    borderRadius: 12
  },
  progressText: {
    marginTop: 8,
    color: "#51624F"
  },
  reflection: {
    color: "#2D3A2E"
  }
});
