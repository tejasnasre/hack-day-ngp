import { View, Text, ScrollView } from "react-native";
import { PressableFeedback } from "heroui-native";
import { ChevronLeft, ChevronRight, Apple, Flame, Clock } from "lucide-react-native";

export default function LogScreen() {
  return (
    <View className="flex-1 bg-white pt-safe">
      {/* Header & Date Navigation */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
        <PressableFeedback className="p-2">
          <ChevronLeft size={20} color="#374151" />
        </PressableFeedback>
        <View className="items-center">
          <Text className="text-foreground text-lg font-bold">Today, Oct 24</Text>
        </View>
        <PressableFeedback className="p-2">
          <ChevronRight size={20} color="#374151" />
        </PressableFeedback>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-24">
        {/* Weekly strip */}
        <View className="flex-row justify-between px-6 py-6 border-b border-gray-100 bg-gray-50/30">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <View key={i} className="items-center">
              <Text className="text-[10px] font-bold text-muted uppercase mb-2">{day}</Text>
              <View className={`w-10 h-10 rounded-lg items-center justify-center ${i === 3 ? 'bg-primary' : 'bg-white border border-gray-200'}`}>
                <Text className={`text-sm font-bold ${i === 3 ? 'text-white' : 'text-foreground'}`}>{21 + i}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Daily Summary */}
        <View className="px-6 py-8 border-b border-gray-100">
          <Text className="text-muted text-[10px] font-bold uppercase tracking-widest mb-2">Daily Budget</Text>
          <View className="flex-row items-end mb-8">
            <Text className="text-5xl font-bold text-foreground">1,840</Text>
            <Text className="text-muted text-lg font-medium ml-2 mb-1">/ 2,400 kcal</Text>
          </View>
          
          <View className="gap-6">
            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm font-bold text-foreground">Protein</Text>
                <Text className="text-sm font-bold text-foreground">120g <Text className="text-muted font-medium">/ 150g</Text></Text>
              </View>
              <View className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <View className="h-full bg-primary w-[80%]" />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm font-bold text-foreground">Carbs</Text>
                <Text className="text-sm font-bold text-foreground">180g <Text className="text-muted font-medium">/ 250g</Text></Text>
              </View>
              <View className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <View className="h-full bg-orange-400 w-[72%]" />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm font-bold text-foreground">Fats</Text>
                <Text className="text-sm font-bold text-foreground">65g <Text className="text-muted font-medium">/ 70g</Text></Text>
              </View>
              <View className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <View className="h-full bg-blue-400 w-[92%]" />
              </View>
            </View>
          </View>
        </View>

        {/* Meal Logs */}
        <View className="px-6 py-8">
          <Text className="text-muted text-[10px] font-bold uppercase tracking-widest mb-6">Recent Meals</Text>
          
          <View className="gap-8">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl items-center justify-center mr-4">
                <Apple size={24} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-foreground font-bold text-base">Breakfast</Text>
                <View className="flex-row items-center mt-1">
                  <Clock size={12} color="#9CA3AF" />
                  <Text className="text-muted text-xs ml-1">8:30 AM • Oatmeal & Berries</Text>
                </View>
              </View>
              <Text className="text-foreground font-bold">420 kcal</Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl items-center justify-center mr-4">
                <Flame size={24} color="#F59E0B" />
              </View>
              <View className="flex-1">
                <Text className="text-foreground font-bold text-base">Lunch</Text>
                <View className="flex-row items-center mt-1">
                  <Clock size={12} color="#9CA3AF" />
                  <Text className="text-muted text-xs ml-1">1:15 PM • Grilled Chicken Salad</Text>
                </View>
              </View>
              <Text className="text-foreground font-bold">650 kcal</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Button */}
      <View className="absolute bottom-6 left-6 right-6">
        <PressableFeedback className="bg-foreground h-14 rounded-2xl items-center justify-center shadow-none border border-foreground">
          <Text className="text-white font-bold text-sm uppercase tracking-widest">Add Custom Meal</Text>
        </PressableFeedback>
      </View>
    </View>
  );
}
