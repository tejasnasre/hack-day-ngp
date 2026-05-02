import { AlertTriangle, Sparkles, TrendingUp } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function InsightsScreen() {
  return (
    <View className="flex-1 bg-white pt-safe">
      <View className="px-6 py-4 border-b border-gray-100">
        <Text className="text-foreground text-2xl font-bold">Health Insights</Text>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-24">
        {/* Gemini Weekly Summary */}
        <View className="px-6 py-8 border-b border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 bg-primary/10 rounded-lg items-center justify-center mr-3">
              <Sparkles size={16} color="#2E7D32" />
            </View>
            <Text className="text-foreground font-bold text-sm uppercase tracking-widest">
              AI Weekly Review
            </Text>
          </View>
          <View className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <Text className="text-gray-700 leading-6 text-base font-medium">
              You&apos;re on a great streak! Your protein intake has been
              consistently hitting the target for 5 days. However, we noticed a
              slight increase in sodium from processed snacks late at night.
            </Text>
          </View>
        </View>

        {/* Weekly Trend */}
        <View className="px-6 py-8 border-b border-gray-100">
          <Text className="text-muted text-[10px] font-bold uppercase tracking-widest mb-6">Weekly Adherence</Text>
          
          <View className="flex-row justify-between items-end h-32 mb-8">
            {[40, 70, 45, 90, 60, 80, 50].map((height, i) => (
              <View key={i} className="items-center flex-1">
                <View
                  className={`w-4 rounded-full ${i === 3 ? "bg-primary" : "bg-gray-200"}`}
                  style={{ height: `${height}%` }}
                />
                <Text className="text-muted text-[10px] font-bold mt-2">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </Text>
              </View>
            ))}
          </View>
          
          <View className="flex-row items-center p-4 bg-primary/5 rounded-xl border border-primary/10">
            <TrendingUp size={16} color="#2E7D32" />
            <Text className="text-primary font-bold text-xs ml-3">
              Caloric consistency improved by 12% this week
            </Text>
          </View>
        </View>

        {/* Health Alerts */}
        <View className="px-6 py-8">
          <Text className="text-muted text-[10px] font-bold uppercase tracking-widest mb-6">Critical Alerts</Text>
          
          <View className="p-4 border border-red-100 bg-red-50/30 rounded-2xl flex-row items-start">
            <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-4">
              <AlertTriangle size={20} color="#DC2626" />
            </View>
            <View className="flex-1">
              <Text className="text-foreground font-bold text-base">
                High Fructose Corn Syrup
              </Text>
              <Text className="text-gray-600 text-xs mt-1 leading-5 font-medium">
                Found in your &quot;Energy Bar&quot; yesterday. Regular consumption is associated with metabolic issues.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

