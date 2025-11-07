import { StyleSheet, View } from "react-native";
import { Button, Chip, Text } from "react-native-paper";
import { CourseModule } from "@/types";

interface Props {
  module: CourseModule;
  onToggle: (moduleId: string) => void;
}

export default function ModuleCard({ module, onToggle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.title}>
          {module.title}
        </Text>
        <Chip icon={module.completed ? "check" : "progress-clock"}>
          {module.completed ? "Fullført" : "Underveis"}
        </Chip>
      </View>
      <Text variant="bodyMedium" style={styles.description}>
        {module.description}
      </Text>
      <View style={styles.contentList}>
        {module.content.map((item) => (
          <Chip key={item.id} style={styles.chip} icon={iconForContent(item.type)}>
            {item.title}
          </Chip>
        ))}
      </View>
      <Button
        mode={module.completed ? "outlined" : "contained"}
        onPress={() => onToggle(module.id)}
        style={styles.button}
      >
        {module.completed ? "Marker som ikke fullført" : "Marker som fullført"}
      </Button>
    </View>
  );
}

function iconForContent(type: CourseModule["content"][number]["type"]) {
  switch (type) {
    case "video":
      return "play-circle";
    case "artikkel":
      return "book";
    case "øvelse":
      return "checkbox-marked-circle";
    default:
      return "information";
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    gap: 12,
    elevation: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    color: "#2D3A2E",
    flex: 1,
    marginRight: 12
  },
  description: {
    color: "#51624F"
  },
  contentList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  chip: {
    backgroundColor: "#E8F1EB"
  },
  button: {
    alignSelf: "flex-start"
  }
});
