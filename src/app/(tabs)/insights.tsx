import { Card, useThemeColor } from "heroui-native";
import { AlertTriangle, Sparkles, TrendingUp } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InsightsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView className="flex-1" contentContainerClassName="p-4 pb-20">
        <View className="mb-6 mt-2 flex-row justify-between items-center">
          <View>
            <Text className="text-foreground text-3xl font-cossette-bold tracking-tight">
              Insights
            </Text>
            <Text className="text-muted text-base mt-1">
              Your weekly health summary
            </Text>
          </View>
          <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center">
            <Sparkles size={24} />
          </View>
        </View>

        {/* Gemini Weekly Summary */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
          <View className="flex-row items-center mb-4">
            <Sparkles size={20} className="mr-2" />
            <Text className="text-foreground font-cossette-bold text-lg">
              Gemini Analysis
            </Text>
          </View>
          <Text className="text-foreground leading-relaxed text-base">
            You&apos;re on a great streak! Your protein intake has been
            consistently hitting the target for 5 days. However, we noticed a
            slight increase in sodium from processed snacks late at night.
          </Text>
        </Card>

        {/* Charts / Trends Mockup */}
        <Text className="text-foreground font-bold text-xl mb-4">
          Weekly Trends
        </Text>
        <Card className="p-5 mb-6">
          <View className="flex-row justify-between items-end h-32 mb-4">
            {[40, 70, 45, 90, 60, 80, 50].map((height, i) => (
              <View key={i} className="items-center w-8">
                <View
                  className={`w-6 rounded-t-sm ${i === 3 ? "bg-primary" : "bg-primary/30"}`}
                  style={{ height: `${height}%` }}
                />
                <Text className="text-muted text-xs mt-2">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </Text>
              </View>
            ))}
          </View>
          <View className="flex-row items-center justify-center">
            <TrendingUp
              size={16}
              color={useThemeColor("success")}
              className="mr-2"
            />
            <Text className="text-foreground font-medium text-sm">
              Caloric adherence improved by 12%
            </Text>
          </View>
        </Card>

        {/* Flagged Additives */}
        <Text className="text-foreground font-bold text-xl mb-4">
          Flagged Additives
        </Text>
        <Card className="p-4 border border-warning/30 bg-warning/5 flex-row items-start">
          <View className="w-10 h-10 bg-warning/20 rounded-full items-center justify-center mr-4 mt-1">
            <AlertTriangle size={20} />
          </View>
          <View className="flex-1">
            <Text className="text-foreground font-bold text-lg">
              High Fructose Corn Syrup
            </Text>
            <Text className="text-muted text-sm mt-1 leading-snug">
              Found in your &quot;Energy Bar&quot; yesterday. It is associated
              with increased fat accumulation in the liver.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
