import { Image as HeroImage } from "expo-image";
import { Button, PressableFeedback } from "heroui-native";
import {
  AlertCircle,
  ArrowLeft,
  Beaker,
  Brain,
  Scan,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { ProductData, formatMacros } from "../lib/foodApi";
import { HealthInsight, analyzeProduct } from "../lib/geminiService";
import HealthInsights from "./HealthInsights";

interface ProductDetailScreenProps {
  product: ProductData;
  onClose: () => void;
  onScanAgain: () => void;
}

export default function ProductDetailScreen({
  product,
  onClose,
  onScanAgain,
}: ProductDetailScreenProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"nutrition" | "insights">(
    "nutrition",
  );
  const [insight, setInsight] = useState<HealthInsight | null>(null);
  const [insightLoading, setInsightLoading] = useState(true);
  const macros = formatMacros(product);

  // Fetch health insights from Gemini
  useEffect(() => {
    const loadInsights = async () => {
      try {
        setInsightLoading(true);
        const result = await analyzeProduct(product);
        setInsight(result);
      } catch (error) {
        console.error("Error loading insights:", error);
        setInsight(null);
      } finally {
        setInsightLoading(false);
      }
    };

    loadInsights();
  }, [product]);

  const handleSaveProduct = async () => {
    setIsSaving(true);
    try {
      // Mock save
      setTimeout(() => {
        setIsSaving(false);
        alert("Product saved to your log!");
      }, 1000);
    } catch {
      setIsSaving(false);
      alert("Failed to save product");
    }
  };

  const TabButton = ({
    active,
    icon: Icon,
    label,
    onPress,
  }: {
    active: boolean;
    icon: any;
    label: string;
    onPress: () => void;
  }) => (
    <PressableFeedback
      onPress={onPress}
      className={`flex-1 items-center justify-center py-3 border-b-2 ${
        active ? "border-primary" : "border-transparent"
      }`}
    >
      <View className="flex-row items-center">
        <Icon
          size={16}
          color={active ? "#2E7D32" : "#9CA3AF"}
          style={{ marginRight: 8 }}
        />
        <Text
          className={`font-semibold text-sm ${
            active ? "text-foreground" : "text-muted"
          }`}
        >
          {label}
        </Text>
      </View>
    </PressableFeedback>
  );

  const NutritionRow = ({
    label,
    value,
    unit,
  }: {
    label: string;
    value: number | string | null;
    unit: string;
  }) => (
    <View className="flex-row justify-between py-4 border-b border-gray-100">
      <Text className="text-muted font-medium">{label}</Text>
      <Text className="text-foreground font-bold">
        {value !== null ? `${value}${unit}` : "--"}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-background pt-safe">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
          <PressableFeedback onPress={onClose} className="p-2">
            <ArrowLeft size={24} color="#111827" />
          </PressableFeedback>
          <Text className="text-foreground font-bold text-lg">
            Product Details
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Product Info Section */}
          <View className="p-6 border-b border-gray-100">
            <View className="flex-row items-start mb-6">
              <View className="flex-1 pr-4">
                <Text className="text-primary font-bold text-sm mb-1 uppercase tracking-wider">
                  {product.brand || "Generic"}
                </Text>
                <Text className="text-foreground font-bold text-2xl leading-tight">
                  {product.name}
                </Text>
                <Text className="text-muted text-xs mt-2">
                  Source: {product.source || "OpenFoodFacts"}
                </Text>
              </View>
              {product.image && (
                <View className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                  <HeroImage
                    alt={product.name}
                    source={{ uri: product.image }}
                    className="w-full h-full"
                    contentFit="contain"
                  />
                </View>
              )}
            </View>

            {/* Top Stats */}
            <View className="flex-row divide-x divide-gray-100">
              <View className="flex-1 items-center">
                <Text className="text-muted text-[10px] uppercase font-bold tracking-widest mb-1">
                  Health Score
                </Text>
                <Text className="text-foreground font-bold text-xl">
                  {product.nutritionScore || "N/A"}
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-muted text-[10px] uppercase font-bold tracking-widest mb-1">
                  Calories
                </Text>
                <Text className="text-foreground font-bold text-xl">
                  {macros.calories || "0"} kcal
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-muted text-[10px] uppercase font-bold tracking-widest mb-1">
                  NOVA
                </Text>
                <Text className="text-foreground font-bold text-xl">
                  {product.novaGroup || "-"}
                </Text>
              </View>
            </View>
          </View>

          {/* Navigation */}
          <View className="flex-row border-b border-gray-100">
            <TabButton
              active={activeTab === "nutrition"}
              icon={Beaker}
              label="Nutrition"
              onPress={() => setActiveTab("nutrition")}
            />
            <TabButton
              active={activeTab === "insights"}
              icon={Brain}
              label="Insights"
              onPress={() => setActiveTab("insights")}
            />
          </View>

          {/* Content Area */}
          {activeTab === "nutrition" ? (
            <View className="px-6 py-4">
              <Text className="text-foreground font-bold text-sm uppercase tracking-widest mb-2 mt-2">
                Nutritional Values (100g)
              </Text>

              <NutritionRow label="Protein" value={macros.protein} unit="g" />
              <NutritionRow
                label="Carbohydrates"
                value={macros.carbs}
                unit="g"
              />
              <NutritionRow label="Total Fat" value={macros.fat} unit="g" />
              <NutritionRow
                label="Saturated Fat"
                value={macros.saturatedFat}
                unit="g"
              />
              <NutritionRow
                label="Dietary Fiber"
                value={macros.fiber}
                unit="g"
              />
              <NutritionRow label="Sugars" value={macros.sugars} unit="g" />
              <NutritionRow label="Sodium" value={macros.sodium} unit="mg" />

              {/* Ingredients Section */}
              {product.ingredients && (
                <View className="mt-8">
                  <Text className="text-foreground font-bold text-sm uppercase tracking-widest mb-4">
                    Ingredients List
                  </Text>
                  <View className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <Text className="text-gray-600 text-sm leading-6">
                      {product.ingredients}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View className="flex-1">
              {insight ? (
                <HealthInsights insight={insight} isLoading={false} />
              ) : (
                <View className="flex-1 items-center justify-center py-20 px-6">
                  {insightLoading ? (
                    <View className="items-center">
                      <ActivityIndicator size="small" color="#2E7D32" />
                      <Text className="text-muted mt-4 text-xs font-bold uppercase tracking-widest">
                        Analyzing...
                      </Text>
                    </View>
                  ) : (
                    <View className="items-center">
                      <AlertCircle size={32} color="#EF4444" opacity={0.5} />
                      <Text className="text-foreground font-bold mt-3 text-sm">
                        Analysis Unavailable
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        </ScrollView>

        {/* Footer Actions */}
        <View className="p-6 border-t border-gray-100 bg-background">
          <View className="flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 rounded-lg h-12"
              onPress={handleSaveProduct}
              isDisabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-sm uppercase tracking-widest">
                  Save to Log
                </Text>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-6 rounded-lg h-12 border-gray-200"
              onPress={onScanAgain}
            >
              <Scan size={20} color="#374151" />
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
