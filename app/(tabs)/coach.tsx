import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { useCoachChat } from "@/hooks/useCoachChat";
import { formatTime } from "@/utils/date";

export default function CoachScreen() {
  const { messages, sendMessage, isSending } = useCoachChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }
    sendMessage(trimmed);
    setInput("");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <View style={styles.inner}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.role === "user" ? styles.userBubble : styles.coachBubble]}>
              <Text variant="labelSmall" style={styles.timestamp}>
                {item.role === "user" ? "Deg" : "Coach Sunniva"} • {formatTime(item.createdAt)}
              </Text>
              <Text variant="bodyMedium" style={styles.messageText}>
                {item.content}
              </Text>
            </View>
          )}
        />
        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Still et spørsmål eller del en seier"
            style={styles.textInput}
            mode="outlined"
            multiline
          />
          <Button mode="contained" onPress={handleSend} disabled={isSending}>
            Send
          </Button>
        </View>
        {isSending ? (
          <View style={styles.loading}>
            <ActivityIndicator />
            <Text variant="bodySmall">Coach Sunniva tenker ...</Text>
          </View>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5F0"
  },
  inner: {
    flex: 1,
    padding: 16,
    gap: 12
  },
  listContent: {
    gap: 12,
    paddingBottom: 80
  },
  messageBubble: {
    padding: 16,
    borderRadius: 16
  },
  userBubble: {
    backgroundColor: "#CDE7DF",
    alignSelf: "flex-end"
  },
  coachBubble: {
    backgroundColor: "white",
    alignSelf: "flex-start"
  },
  timestamp: {
    marginBottom: 4,
    color: "#51624F"
  },
  messageText: {
    color: "#2D3A2E"
  },
  inputRow: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    gap: 12
  },
  textInput: {
    maxHeight: 120,
    backgroundColor: "white"
  },
  loading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  }
});
