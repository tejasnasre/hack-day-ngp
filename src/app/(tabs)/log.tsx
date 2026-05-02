import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, useThemeColor } from "heroui-native";
import { ChevronLeft, ChevronRight, Apple, Flame } from "lucide-react-native";

export default function LogScreen() {
  const successColor = useThemeColor("success");
  
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="p-4 pb-20">
        
        {/* Header & Date Navigation */}
        <View className="flex-row items-center justify-between mb-6 mt-2">
          <View className="w-10 h-10 rounded-full bg-content2 items-center justify-center">
            <ChevronLeft size={20} className="text-foreground" />
          </View>
          <View className="items-center">
            <Text className="text-muted text-sm uppercase tracking-widest font-medium">Today</Text>
            <Text className="text-foreground text-xl font-cossette-bold">Oct 24, 2026</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-content2 items-center justify-center">
            <ChevronRight size={20} className="text-foreground" />
          </View>
        </View>

        {/* Weekly Calendar Strip Mockup */}
        <View className="flex-row justify-between mb-8">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <View key={i} className={`items-center justify-center w-11 h-16 rounded-full ${i === 3 ? 'bg-primary' : 'bg-content2'}`}>
              <Text className={`text-xs font-medium mb-1 ${i === 3 ? 'text-primary-foreground' : 'text-muted'}`}>{day}</Text>
              <Text className={`text-base font-bold ${i === 3 ? 'text-primary-foreground' : 'text-foreground'}`}>{21 + i}</Text>
            </View>
          ))}
        </View>

        {/* Macros Summary */}
        <Text className="text-foreground font-cossette-bold text-xl mb-4">Daily Summary</Text>
        <Card className="p-5 mb-8">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-4xl font-black text-foreground">1,840</Text>
              <Text className="text-muted text-sm">kcal consumed</Text>
            </View>
            <View className="w-16 h-16 rounded-full border-4 border-primary/20 items-center justify-center">
              <Text className="text-primary font-bold">65%</Text>
            </View>
          </View>
          
          <View className="flex-row justify-between">
            <View className="flex-1 mr-2">
              <Text className="text-muted text-xs mb-1">Protein</Text>
              <View className="h-2 w-full bg-content2 rounded-full overflow-hidden">
                <View className="h-full bg-success w-3/4" />
              </View>
              <Text className="text-foreground font-semibold mt-1 text-sm">120g <Text className="text-muted font-normal text-xs">/ 150g</Text></Text>
            </View>
            <View className="flex-1 mx-2">
              <Text className="text-muted text-xs mb-1">Carbs</Text>
              <View className="h-2 w-full bg-content2 rounded-full overflow-hidden">
                <View className="h-full bg-warning w-1/2" />
              </View>
              <Text className="text-foreground font-semibold mt-1 text-sm">180g <Text className="text-muted font-normal text-xs">/ 250g</Text></Text>
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-muted text-xs mb-1">Fats</Text>
              <View className="h-2 w-full bg-content2 rounded-full overflow-hidden">
                <View className="h-full bg-danger w-5/6" />
              </View>
              <Text className="text-foreground font-semibold mt-1 text-sm">65g <Text className="text-muted font-normal text-xs">/ 70g</Text></Text>
            </View>
          </View>
        </Card>

        {/* Meals */}
        <Text className="text-foreground font-bold text-xl mb-4">Meals</Text>
        <View className="gap-4">
          <Card className="p-4 flex-row items-center">
            <View className="w-12 h-12 bg-success/10 rounded-xl items-center justify-center mr-4">
              <Apple size={24} color={successColor} />
            </View>
            <View className="flex-1">
              <Text className="text-foreground font-bold text-lg">Breakfast</Text>
              <Text className="text-muted text-sm">Oatmeal & Berries</Text>
            </View>
            <View className="items-end">
              <Text className="text-foreground font-bold">420 kcal</Text>
            </View>
          </Card>
          
          <Card className="p-4 flex-row items-center">
            <View className="w-12 h-12 bg-danger/10 rounded-xl items-center justify-center mr-4">
              <Flame size={24} color={useThemeColor("danger")} />
            </View>
            <View className="flex-1">
              <Text className="text-foreground font-bold text-lg">Lunch</Text>
              <Text className="text-muted text-sm">Grilled Chicken Salad</Text>
            </View>
            <View className="items-end">
              <Text className="text-foreground font-bold">650 kcal</Text>
            </View>
          </Card>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
