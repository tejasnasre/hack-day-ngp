import { Card } from "heroui-native";
import {
  AlertCircle,
  Award,
  Brain,
  CheckCircle,
  Lightbulb,
  TrendingDown,
  Zap,
} from "lucide-react-native";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { HealthInsight } from "../lib/geminiService";

interface HealthInsightsProps {
  insight: HealthInsight;
  isLoading?: boolean;
}

const GradeColors: Record<string, { bg: string; text: string }> = {
  A: { bg: "bg-green-100", text: "text-green-900" },
  B: { bg: "bg-blue-100", text: "text-blue-900" },
  C: { bg: "bg-yellow-100", text: "text-yellow-900" },
  D: { bg: "bg-orange-100", text: "text-orange-900" },
  F: { bg: "bg-red-100", text: "text-red-900" },
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "bg-green-100";
  if (score >= 65) return "bg-blue-100";
  if (score >= 50) return "bg-yellow-100";
  if (score >= 35) return "bg-orange-100";
  return "bg-red-100";
};

const getScoreTextColor = (score: number) => {
  if (score >= 80) return "text-green-900";
  if (score >= 65) return "text-blue-900";
  if (score >= 50) return "text-yellow-900";
  if (score >= 35) return "text-orange-900";
  return "text-red-900";
};

export default function HealthInsights({
  insight,
  isLoading = false,
}: HealthInsightsProps) {
  if (isLoading) {
    return (
      <View className="py-12 items-center justify-center">
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text className="text-muted mt-3 text-sm font-medium">
          Analyzing nutritional health...
        </Text>
      </View>
    );
  }

  const colors = GradeColors[insight.healthGrade] || GradeColors.C;

  return (
    <ScrollView className="flex-1">
      <View className="px-4">
        {/* Health Score Card */}
        <Card className="mb-6 border-none shadow-sm">
          <Card.Body className="items-center py-6">
            <View className="flex-row items-center gap-6">
              <View
                className={`w-24 h-24 rounded-2xl ${getScoreColor(insight.healthScore)} items-center justify-center`}
              >
                <View className="items-center">
                  <Text
                    className={`${getScoreTextColor(insight.healthScore)} font-cossette-bold text-4xl`}
                  >
                    {insight.healthScore}
                  </Text>
                  <Text
                    className={`${getScoreTextColor(insight.healthScore)} text-xs font-semibold mt-1`}
                  >
                    /100
                  </Text>
                </View>
              </View>

              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Award size={20} color="#2E7D32" />
                  <Text className="text-muted text-xs font-semibold ml-2 uppercase tracking-wider">
                    Health Grade
                  </Text>
                </View>
                <View className={`${colors.bg} px-4 py-2 rounded-xl`}>
                  <Text
                    className={`${colors.text} font-cossette-bold text-3xl`}
                  >
                    {insight.healthGrade}
                  </Text>
                </View>
                <Text className="text-muted text-xs mt-2 font-medium">
                  {insight.category}
                </Text>
              </View>
            </View>
          </Card.Body>
        </Card>

        {/* Summary */}
        <Card className="mb-6 border-none bg-card/50">
          <Card.Body>
            <View className="flex-row items-start gap-3">
              <Brain size={20} color="#2563EB" className="mt-1" />
              <View className="flex-1">
                <Text className="text-base font-cossette-bold mb-2 text-foreground">
                  Health Analysis
                </Text>
                <Text className="text-foreground/80 text-sm leading-6">
                  {insight.summary}
                </Text>
              </View>
            </View>
          </Card.Body>
        </Card>

        {/* Strengths */}
        <Card className="mb-6 border-none bg-green-50/50">
          <Card.Body>
            <View className="flex-row items-center mb-3">
              <CheckCircle size={18} color="#22C55E" />
              <Text className="text-green-900 font-cossette-bold ml-2">
                Strengths
              </Text>
            </View>
            <View className="gap-2 ml-6">
              {insight.strengths.map((strength, index) => (
                <View key={index} className="flex-row items-start gap-2">
                  <View className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2" />
                  <Text className="text-green-900 text-sm flex-1 font-medium">
                    {strength}
                  </Text>
                </View>
              ))}
            </View>
          </Card.Body>
        </Card>

        {/* Concerns */}
        {insight.concerns.length > 0 && (
          <Card className="mb-6 border-none bg-red-50/50">
            <Card.Body>
              <View className="flex-row items-center mb-3">
                <AlertCircle size={18} color="#EF4444" />
                <Text className="text-red-900 font-cossette-bold ml-2">
                  Health Concerns
                </Text>
              </View>
              <View className="gap-2 ml-6">
                {insight.concerns.map((concern, index) => (
                  <View key={index} className="flex-row items-start gap-2">
                    <View className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2" />
                    <Text className="text-red-900 text-sm flex-1 font-medium">
                      {concern}
                    </Text>
                  </View>
                ))}
              </View>
            </Card.Body>
          </Card>
        )}

        {/* Recommendations */}
        <Card className="mb-6 border-none bg-blue-50/50">
          <Card.Body>
            <View className="flex-row items-center mb-3">
              <Lightbulb size={18} color="#3B82F6" />
              <Text className="text-blue-900 font-cossette-bold ml-2">
                Recommendations
              </Text>
            </View>
            <View className="gap-2 ml-6">
              {insight.recommendations.map((rec, index) => (
                <View key={index} className="flex-row items-start gap-2">
                  <View className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                  <Text className="text-blue-900 text-sm flex-1 font-medium">
                    {rec}
                  </Text>
                </View>
              ))}
            </View>
          </Card.Body>
        </Card>

        {/* Detailed Analysis */}
        <Card className="mb-6 border-none bg-card/50">
          <Card.Body>
            <View className="flex-row items-center mb-3">
              <Zap size={18} color="#F59E0B" />
              <Text className="text-foreground font-cossette-bold ml-2">
                Nutrition Details
              </Text>
            </View>
            <Text className="text-foreground/80 text-sm leading-6">
              {insight.nutritionAnalysis}
            </Text>
          </Card.Body>
        </Card>

        {/* Data Source Note */}
        <Card className="mb-8 border-none bg-muted/20">
          <Card.Body>
            <View className="flex-row items-start gap-2">
              <TrendingDown size={16} color="#6B7280" className="mt-0.5" />
              <Text className="text-muted text-xs flex-1">
                Health insights generated by AI analysis based on Open Food
                Facts data. For personalized nutrition advice, consult a
                healthcare professional.
              </Text>
            </View>
          </Card.Body>
        </Card>
      </View>
    </ScrollView>
  );
}
