import { Image as HeroImage } from "expo-image";
import { Button, Card, PressableFeedback } from "heroui-native";
import {
  AlertCircle,
  ArrowLeft,
  Beaker,
  Brain,
  Download,
  Flame,
  Info,
  Leaf,
  Scan,
  Zap,
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
      className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-lg ${
        active ? "bg-primary/10" : "bg-transparent"
      }`}
    >
      <Icon
        size={20}
        color={active ? "#2E7D32" : "#9CA3AF"}
        style={{ marginRight: 6 }}
      />
      <Text
        className={`font-semibold text-sm ${
          active ? "text-primary" : "text-muted"
        }`}
      >
        {label}
      </Text>
    </PressableFeedback>
  );

  const MacroCard = ({
    icon: Icon,
    label,
    value,
    unit,
    colorClass,
    iconColor,
  }: {
    icon: any;
    label: string;
    value: number | string | null;
    unit: string;
    colorClass: string;
    iconColor: string;
  }) => (
    <Card className="flex-1 border-none bg-card/50">
      <Card.Body className="items-center py-4">
        <View
          className={`w-12 h-12 rounded-xl ${colorClass} items-center justify-center mb-2`}
        >
          <Icon size={24} color={iconColor} />
        </View>
        <Text className="text-muted text-xs font-semibold mb-1 uppercase tracking-wider">
          {label}
        </Text>
        <Text className="text-foreground font-cossette-bold text-xl">
          {value !== null ? `${value}${unit}` : "N/A"}
        </Text>
      </Card.Body>
    </Card>
  );

  return (
    <View className="flex-1 bg-background pt-safe">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-border/50">
          <PressableFeedback onPress={onClose} className="p-2 -ml-2">
            <View className="flex-row items-center">
              <ArrowLeft size={24} color="#2E7D32" />
              <Text className="ml-1 text-primary font-semibold">Back</Text>
            </View>
          </PressableFeedback>
          <Text className="text-foreground font-cossette-bold text-lg">
            Product Profile
          </Text>
          <View className="w-10" />
        </View>

        {/* Product Image & Info */}
        <View className="px-4 pt-4 pb-4 bg-card/20 border-b border-border/50">
          {product.image ? (
            <View className="mb-4 rounded-2xl overflow-hidden bg-card h-48 shadow-sm border border-border/50">
              <HeroImage
                alt={product.name}
                source={{ uri: product.image }}
                className="w-full h-full"
                contentFit="cover"
              />
            </View>
          ) : (
            <View className="mb-4 rounded-2xl bg-card h-40 items-center justify-center border-2 border-dashed border-border/50">
              <Text className="text-muted text-center font-medium">
                No Image Available
              </Text>
            </View>
          )}

          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-3">
              <Text className="text-foreground font-cossette-bold text-2xl leading-tight mb-1">
                {product.name}
              </Text>
              {product.brand && (
                <Text className="text-primary font-semibold text-sm mb-2">
                  {product.brand}
                </Text>
              )}
              {product.category && (
                <Text className="text-muted text-xs font-medium">
                  {product.category}
                </Text>
              )}
            </View>
            <View className="bg-primary/10 px-2 py-1 rounded-lg">
              <Text className="text-primary text-xs font-bold uppercase">
                {product.source}
              </Text>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row bg-background border-b border-border/50 px-2">
          <TabButton
            active={activeTab === "nutrition"}
            icon={Beaker}
            label="Nutrition"
            onPress={() => setActiveTab("nutrition")}
          />
          <TabButton
            active={activeTab === "insights"}
            icon={Brain}
            label="Health Insights"
            onPress={() => setActiveTab("insights")}
          />
        </View>

        {/* Content Area */}
        {activeTab === "nutrition" ? (
          <ScrollView
            className="flex-1"
            contentContainerClassName="px-4 py-6 pb-10"
          >
            {/* Nutrition Score Banner */}
            {product.nutritionScore && (
              <View className="mb-6 flex-row items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <View className="w-12 h-12 rounded-lg bg-blue-100 items-center justify-center">
                  <Text className="font-cossette-bold text-lg text-blue-900">
                    {product.nutritionScore}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-blue-900 font-semibold text-sm">
                    Nutri-Score
                  </Text>
                  <Text className="text-blue-800 text-xs">
                    Nutritional quality score
                  </Text>
                </View>
                {product.novaGroup && (
                  <View className="items-center">
                    <Text className="text-blue-900 font-semibold text-xs mb-1">
                      NOVA
                    </Text>
                    <Text className="text-blue-900 font-cossette-bold text-lg">
                      {product.novaGroup}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Macros Section */}
            <View className="mb-6">
              <Text className="text-foreground font-cossette-bold text-lg mb-4">
                Nutrition Per 100g
              </Text>

              <View className="grid gap-3 mb-3">
                <View className="flex-row gap-3">
                  <MacroCard
                    icon={Flame}
                    label="Calories"
                    value={macros.calories}
                    unit=" kcal"
                    colorClass="bg-orange-100"
                    iconColor="#F97316"
                  />
                  <MacroCard
                    icon={Zap}
                    label="Protein"
                    value={macros.protein}
                    unit="g"
                    colorClass="bg-red-100"
                    iconColor="#EF4444"
                  />
                </View>
                <View className="flex-row gap-3">
                  <MacroCard
                    icon={Zap}
                    label="Carbs"
                    value={macros.carbs}
                    unit="g"
                    colorClass="bg-blue-100"
                    iconColor="#3B82F6"
                  />
                  <MacroCard
                    icon={Flame}
                    label="Fat"
                    value={macros.fat}
                    unit="g"
                    colorClass="bg-yellow-100"
                    iconColor="#EAB308"
                  />
                </View>
              </View>

              {/* Secondary Macros */}
              {(macros.saturatedFat ||
                macros.fiber ||
                macros.sugars ||
                macros.sodium) && (
                <View className="gap-3">
                  <View className="flex-row gap-3">
                    {macros.fiber && (
                      <MacroCard
                        icon={Leaf}
                        label="Fiber"
                        value={macros.fiber}
                        unit="g"
                        colorClass="bg-green-100"
                        iconColor="#22C55E"
                      />
                    )}
                    {macros.sugars && (
                      <MacroCard
                        icon={Zap}
                        label="Sugars"
                        value={macros.sugars}
                        unit="g"
                        colorClass="bg-pink-100"
                        iconColor="#EC4899"
                      />
                    )}
                  </View>
                  {(macros.sodium || macros.saturatedFat) && (
                    <View className="flex-row gap-3">
                      {macros.sodium && (
                        <MacroCard
                          icon={AlertCircle}
                          label="Sodium"
                          value={macros.sodium}
                          unit="mg"
                          colorClass="bg-purple-100"
                          iconColor="#8B5CF6"
                        />
                      )}
                      {macros.saturatedFat && (
                        <MacroCard
                          icon={Flame}
                          label="Sat. Fat"
                          value={macros.saturatedFat}
                          unit="g"
                          colorClass="bg-amber-100"
                          iconColor="#D97706"
                        />
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>

            {/* Ingredients */}
            {product.ingredients && (
              <Card className="mb-6 border-none bg-card/50">
                <Card.Body>
                  <Text className="text-base font-cossette-bold mb-2">
                    Ingredients
                  </Text>
                  <Text className="text-muted text-sm leading-6">
                    {product.ingredients}
                  </Text>
                </Card.Body>
              </Card>
            )}

            {/* Allergens */}
            {product.allergens && product.allergens.length > 0 && (
              <Card className="mb-6 border-none bg-red-50">
                <Card.Body className="flex-row items-start gap-3">
                  <AlertCircle size={20} color="#DC2626" className="mt-1" />
                  <View className="flex-1">
                    <Text className="text-red-900 text-sm font-bold mb-1">
                      Contains Allergens
                    </Text>
                    <Text className="text-red-800 text-xs font-medium">
                      {product.allergens.join(", ")}
                    </Text>
                  </View>
                </Card.Body>
              </Card>
            )}

            {/* Disclaimer */}
            <Card className="border-none bg-blue-50/50">
              <Card.Body className="flex-row items-start gap-3">
                <Info size={18} color="#2563EB" className="mt-0.5" />
                <Text className="text-blue-800 text-xs leading-5">
                  Information from Open Food Facts. Always check the physical
                  label for most accurate data.
                </Text>
              </Card.Body>
            </Card>
          </ScrollView>
        ) : (
          <View className="flex-1">
            {insight ? (
              <HealthInsights insight={insight} isLoading={false} />
            ) : (
              <View className="flex-1 items-center justify-center px-4">
                {insightLoading ? (
                  <>
                    <ActivityIndicator size="large" color="#2E7D32" />
                    <Text className="text-muted mt-4 text-sm font-medium">
                      Analyzing nutritional health...
                    </Text>
                  </>
                ) : (
                  <>
                    <AlertCircle size={48} color="#EF4444" />
                    <Text className="text-foreground font-semibold mt-3 text-lg">
                      Analysis Unavailable
                    </Text>
                    <Text className="text-muted text-sm text-center mt-2">
                      Could not generate health insights at this time. Please
                      try again.
                    </Text>
                  </>
                )}
              </View>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View className="px-4 py-6 gap-3 bg-background border-t border-border/50 pb-safe-offset-4">
          <Button
            size="lg"
            className="w-full bg-primary shadow-md shadow-primary/20"
            onPress={handleSaveProduct}
            isDisabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="white" />
            ) : (
              <View className="flex-row items-center">
                <Download size={20} color="white" />
                <Text className="text-white font-bold ml-2 text-lg">
                  Add to My Log
                </Text>
              </View>
            )}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full"
            onPress={onScanAgain}
          >
            <View className="flex-row items-center">
              <Scan size={18} color="#2E7D32" />
              <Text className="text-primary font-bold ml-2">
                Scan Another Item
              </Text>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
}
