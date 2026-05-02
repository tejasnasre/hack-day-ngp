import { Redirect, Tabs } from "expo-router";
import {
  ChartSpline,
  CircleUserRound,
  ClipboardList,
  ScanSearch,
} from "lucide-react-native";
import { useColorScheme } from "react-native";
import { useAuth } from "../../providers/AuthProvider";

export default function TabLayout() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const activeTintColor = colorScheme === "dark" ? "#4CAF50" : "#2E7D32";

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: "#8F8A82",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#F8F5F0",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
          height: 78,
          paddingTop: 8,
          paddingBottom: 14,
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 0,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => <ScanSearch size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "Log",
          tabBarIcon: ({ color }) => <ClipboardList size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => <ChartSpline size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <CircleUserRound size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
