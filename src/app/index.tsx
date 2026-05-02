import { Spinner } from "heroui-native";
import { View } from "react-native";
import { Redirect } from "expo-router";
import Auth from "../components/Auth";
import { useAuth } from "../providers/AuthProvider";

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Spinner size="lg" color="primary" />
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

