import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      {subtitle ? (
        <Text variant="bodyMedium" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  title: {
    color: "#2D3A2E",
    fontWeight: "600"
  },
  subtitle: {
    color: "#5A6C5A"
  }
});
