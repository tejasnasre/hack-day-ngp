import { Redirect } from "expo-router";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import Auth from "../components/Auth";
import { useAuth } from "../providers/AuthProvider";

export default function Index() {
  const { user, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const loadingColor = colorScheme === "dark" ? "#4CAF50" : "#2E7D32";

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={loadingColor} />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)/profile" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Auth />
    </View>
  );
}
