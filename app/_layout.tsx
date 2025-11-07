import { Stack } from "expo-router";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { AppProvider, useAppBootstrap } from "@/context/AppContext";
import theme from "@/utils/theme";

SplashScreen.preventAutoHideAsync();

function AppShell() {
  const { ready } = useAppBootstrap();

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
      <AppProvider>
        <AppShell />
      </AppProvider>
    </PaperProvider>
  );
}
