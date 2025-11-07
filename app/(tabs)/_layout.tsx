import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4F8B7F",
        tabBarStyle: {
          backgroundColor: "#FFFFFF"
        }
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Hjem",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          title: "Kurs",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="school" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="logging"
        options={{
          title: "Logg",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="edit" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Dagbok",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="book" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: "Coach",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="chat" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
