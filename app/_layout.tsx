import { Stack } from "expo-router";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { useEffect, useMemo } from "react";
import { SplashScreen } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { AppProvider, useAppBootstrap } from "@/context/AppContext";
import theme from "@/utils/theme";

SplashScreen.preventAutoHideAsync();

function AppShell() {
  const { ready } = useAppBootstrap();
  const { ready: stateReady } = useAppBootstrap();
  const [fontsLoaded] = useFonts({
    ...MaterialCommunityIcons.font,
    ...MaterialIcons.font
  });
  const ready = stateReady && fontsLoaded;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync().catch(() => null);
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function Layout() {
  return (
    <PaperProvider theme={theme}>
  const paperSettings = useMemo(
    () => ({
      icon: (props: { name: string; color: string; size: number }) => (
        <MaterialCommunityIcons {...props} />
      )
    }),
    []
  );

  return (
    <PaperProvider theme={theme} settings={paperSettings}>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </PaperProvider>
  );
}
