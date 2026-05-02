import { View } from "react-native";
import Account from "../../components/Account";
import { useAuth } from "../../providers/AuthProvider";

export default function ProfileScreen() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <View className="flex-1 bg-white pt-safe">
      <Account key={user.id} userId={user.id} email={user.email} />
    </View>
  );
}
