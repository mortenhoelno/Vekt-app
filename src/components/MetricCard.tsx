import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  label: string;
  value: string;
  accent?: "primary" | "secondary" | "neutral";
}

const palette = {
  primary: "#E1F4EF",
  secondary: "#FFE7CC",
  neutral: "#F1F4F1"
};

export default function MetricCard({ label, value, accent = "neutral" }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: palette[accent] }]}>
      <Text variant="bodyMedium" style={styles.label}>
        {label}
      </Text>
      <Text variant="headlineSmall" style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    minWidth: 120
  },
  label: {
    color: "#51624F",
    marginBottom: 8
  },
  value: {
    color: "#2D3A2E",
    fontWeight: "600"
  }
});
