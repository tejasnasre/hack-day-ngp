import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { HeroUINativeProvider } from "heroui-native";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaListener,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Uniwind } from "uniwind";
import { AuthProvider } from "../providers/AuthProvider";
// @ts-ignore
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Use `useFonts` only if you can't use the config plugin.
  const [loaded, error] = useFonts({
    "CossetteTexte-Regular": require("../../assets/fonts/Cossette_Texte/CossetteTexte-Regular.ttf"),
    "CossetteTexte-Bold": require("../../assets/fonts/Cossette_Texte/CossetteTexte-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaListener
          onChange={({ insets }) => {
            Uniwind.updateInsets(insets);
          }}
        >
          <HeroUINativeProvider
            config={{
              devInfo: {
                stylingPrinciples: false,
              },
            }}
          >
            <AuthProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </AuthProvider>
          </HeroUINativeProvider>
        </SafeAreaListener>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
