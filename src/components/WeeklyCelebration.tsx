import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  points: number;
  highlight: string;
}

export default function WeeklyCelebration({ points, highlight }: Props) {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>
        Ukens feiring 🎉
      </Text>
      <Text variant="bodyMedium" style={styles.text}>
        {highlight}
      </Text>
      <Text variant="labelMedium" style={styles.points}>
        Totale poeng: {points}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE7CC",
    borderRadius: 16,
    padding: 16,
    gap: 8
  },
  title: {
    color: "#7B4B2A",
    fontWeight: "600"
  },
  text: {
    color: "#7B4B2A"
  },
  points: {
    color: "#7B4B2A",
    fontWeight: "600"
  }
});
