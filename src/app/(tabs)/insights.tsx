import { AlertTriangle, Sparkles, TrendingUp } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function InsightsScreen() {
  return (
    <View className="flex-1 bg-background pt-safe">
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-100">
        <Text className="text-foreground text-xl font-bold">Insights</Text>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-24">
        {/* AI Weekly Summary */}
        <View className="px-4 py-6 border-b border-gray-100">
          <View className="flex-row items-center mb-3">
            <View className="w-7 h-7 bg-green-100 rounded-lg items-center justify-center mr-2">
              <Sparkles size={16} color="#10B981" />
            </View>
            <Text className="text-foreground font-semibold text-sm uppercase tracking-wide">
              Weekly Review
            </Text>
          </View>
          <View className="p-4 bg-green-50 rounded-xl border border-green-200">
            <Text className="text-gray-700 leading-5 text-sm font-medium">
              You&apos;re on a great streak! Your protein intake has been
              consistently hitting the target for 5 days. However, we noticed a
              slight increase in sodium from processed snacks late at night.
            </Text>
          </View>
        </View>

        {/* Weekly Trend */}
        <View className="px-4 py-6 border-b border-gray-100">
          <Text className="text-muted text-[9px] font-bold uppercase tracking-wider mb-6">
            Weekly Adherence
          </Text>

          {/* Chart Container */}
          <View className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
            {/* Bars */}
            <View className="flex-row justify-between items-end h-40 px-2">
              {[40, 70, 45, 90, 60, 80, 50].map((height, i) => (
                <View key={i} className="items-center gap-2 px-1">
                  {/* Value label */}
                  <Text className="text-[9px] font-bold text-foreground">
                    {height}%
                  </Text>
                  {/* Bar */}
                  <View
                    className={`w-8 rounded-t-lg ${
                      i === 3
                        ? "bg-green-500"
                        : i === 6
                          ? "bg-blue-400"
                          : "bg-gray-300"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  {/* Day label */}
                  <Text className="text-muted text-[9px] font-semibold">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="flex-row items-center p-3 bg-green-100 rounded-lg gap-2">
            <TrendingUp size={16} color="#10B981" />
            <Text className="text-green-700 font-semibold text-xs flex-1">
              Consistency improved by 12% this week
            </Text>
          </View>
        </View>

        {/* Health Metrics */}
        <View className="px-4 py-6 border-b border-gray-100">
          <Text className="text-muted text-[9px] font-bold uppercase tracking-wider mb-4">
            Key Metrics
          </Text>

          <View className="gap-3">
            <View className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Text className="text-blue-900 font-semibold text-xs">
                Hydration
              </Text>
              <Text className="text-blue-700 text-sm font-bold mt-1">
                7/8 glasses
              </Text>
            </View>
            <View className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Text className="text-purple-900 font-semibold text-xs">
                Sleep Quality
              </Text>
              <Text className="text-purple-700 text-sm font-bold mt-1">
                7.2 hours
              </Text>
            </View>
            <View className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <Text className="text-orange-900 font-semibold text-xs">
                Activity
              </Text>
              <Text className="text-orange-700 text-sm font-bold mt-1">
                8,432 steps
              </Text>
            </View>
          </View>
        </View>

        {/* Alerts */}
        <View className="px-4 py-6">
          <Text className="text-muted text-[9px] font-bold uppercase tracking-wider mb-4">
            Alerts
          </Text>

          <View className="p-4 border border-red-200 bg-red-50 rounded-lg flex-row items-start gap-3">
            <View className="w-9 h-9 bg-red-100 rounded-lg items-center justify-center flex-shrink-0">
              <AlertTriangle size={18} color="#DC2626" />
            </View>
            <View className="flex-1">
              <Text className="text-foreground font-semibold text-sm">
                High Sugar Alert
              </Text>
              <Text className="text-gray-600 text-xs mt-1 leading-4 font-medium">
                Found in your &quot;Energy Bar&quot; yesterday. Regular
                consumption is associated with metabolic issues.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
