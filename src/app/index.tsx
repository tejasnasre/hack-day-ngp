import { Spinner } from "heroui-native";
import { View } from "react-native";
import Account from "../components/Account";
import Auth from "../components/Auth";
import { useAuth } from "../providers/AuthProvider";

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner size="lg" color="primary" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? (
        <Account key={user.id} userId={user.id} email={user.email} />
      ) : (
        <Auth />
      )}
    </View>
  );
}
