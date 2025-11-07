import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import ModuleCard from "@/components/ModuleCard";
import SectionTitle from "@/components/SectionTitle";
import { useAppContext } from "@/context/AppContext";

export default function CourseScreen() {
  const { modules, toggleModuleCompletion } = useAppContext();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle
        title="Kursmoduler"
        subtitle="Utforsk video, oppgaver og refleksjoner i ditt tempo."
      />
      <Text variant="bodyMedium" style={styles.intro}>
        Coach Sunniva heier på deg i hver modul. Marker som fullført når du føler deg klar.
      </Text>
      {modules
        .sort((a, b) => a.order - b.order)
        .map((module) => (
          <ModuleCard key={module.id} module={module} onToggle={toggleModuleCompletion} />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5F0"
  },
  content: {
    padding: 20
  },
  intro: {
    marginBottom: 16,
    color: "#51624F"
  }
});
