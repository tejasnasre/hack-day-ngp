import { PressableFeedback } from "heroui-native";
import {
  Apple,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  Cookie,
  Droplet,
  Egg,
  Flame,
  Sandwich,
  Utensils,
  Wind,
  Wine,
  type LucideProps,
} from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

const meals = [
  {
    id: 1,
    name: "Breakfast",
    time: "8:30 AM",
    description: "Oatmeal & Berries",
    calories: 420,
    icon: "apple",
    color: "#10B981",
  },
  {
    id: 2,
    name: "Mid-Morning Snack",
    time: "10:45 AM",
    description: "Greek Yogurt & Honey",
    calories: 150,
    icon: "egg",
    color: "#F59E0B",
  },
  {
    id: 3,
    name: "Lunch",
    time: "1:15 PM",
    description: "Grilled Chicken Salad",
    calories: 650,
    icon: "flame",
    color: "#F59E0B",
  },
  {
    id: 4,
    name: "Afternoon Snack",
    time: "3:45 PM",
    description: "Protein Bar & Almonds",
    calories: 180,
    icon: "coffee",
    color: "#8B5CF6",
  },
  {
    id: 5,
    name: "Pre-Workout",
    time: "5:00 PM",
    description: "Banana & Peanut Butter",
    calories: 220,
    icon: "wind",
    color: "#3B82F6",
  },
  {
    id: 6,
    name: "Dinner",
    time: "7:00 PM",
    description: "Baked Salmon & Veggies",
    calories: 590,
    icon: "utensils",
    color: "#EC4899",
  },
  {
    id: 7,
    name: "Post-Workout",
    time: "7:30 PM",
    description: "Whey Protein Shake",
    calories: 130,
    icon: "droplet",
    color: "#06B6D4",
  },
  {
    id: 8,
    name: "Evening Snack",
    time: "9:00 PM",
    description: "Mixed Berries",
    calories: 80,
    icon: "cookie",
    color: "#F43F5E",
  },
  {
    id: 9,
    name: "Dessert",
    time: "9:30 PM",
    description: "Dark Chocolate & Almonds",
    calories: 150,
    icon: "wine",
    color: "#A855F7",
  },
  {
    id: 10,
    name: "Night Snack",
    time: "10:15 PM",
    description: "Cottage Cheese",
    calories: 110,
    icon: "sandwich",
    color: "#6366F1",
  },
];

const iconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  apple: Apple,
  flame: Flame,
  coffee: Coffee,
  utensils: Utensils,
  egg: Egg,
  sandwich: Sandwich,
  wind: Wind,
  droplet: Droplet,
  cookie: Cookie,
  wine: Wine,
};

export default function LogScreen() {
  return (
    <View className="flex-1 bg-background pt-safe">
      {/* Header & Date Navigation */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <PressableFeedback className="p-1">
          <ChevronLeft size={20} color="#6B7280" />
        </PressableFeedback>
        <Text className="text-foreground text-base font-bold">
          Today, Oct 24
        </Text>
        <PressableFeedback className="p-1">
          <ChevronRight size={20} color="#6B7280" />
        </PressableFeedback>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-24">
        {/* Calendar Header */}
        <View className="px-4 py-4 border-b border-gray-100">
          <Text className="text-muted text-[9px] font-bold uppercase tracking-wider mb-4">
            October 2024
          </Text>

          {/* Day headers */}
          <View className="flex-row justify-between mb-3">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <View key={day} className="flex-1 items-center">
                <Text className="text-[9px] font-semibold text-muted uppercase">
                  {day.slice(0, 1)}
                </Text>
              </View>
            ))}
          </View>

          {/* Calendar grid */}
          <View>
            {/* Week 1 */}
            <View className="flex-row justify-between mb-2 gap-1.5">
              {[null, null, 1, 2, 3, 4, 5].map((date, i) => (
                <View
                  key={i}
                  className="flex-1 aspect-square items-center justify-center bg-gray-50 rounded-lg border border-gray-100"
                >
                  {date && (
                    <Text className="text-xs font-medium text-gray-400">
                      {date}
                    </Text>
                  )}
                </View>
              ))}
            </View>

            {/* Week 2 */}
            <View className="flex-row justify-between mb-2 gap-1.5">
              {[6, 7, 8, 9, 10, 11, 12].map((date) => (
                <View
                  key={date}
                  className="flex-1 aspect-square items-center justify-center bg-gray-50 rounded-lg border border-gray-100"
                >
                  <Text className="text-xs font-medium text-gray-400">
                    {date}
                  </Text>
                </View>
              ))}
            </View>

            {/* Week 3 */}
            <View className="flex-row justify-between mb-2 gap-1.5">
              {[13, 14, 15, 16, 17, 18, 19].map((date) => (
                <View
                  key={date}
                  className="flex-1 aspect-square items-center justify-center bg-gray-50 rounded-lg border border-gray-100"
                >
                  <Text className="text-xs font-medium text-gray-400">
                    {date}
                  </Text>
                </View>
              ))}
            </View>

            {/* Week 4 */}
            <View className="flex-row justify-between mb-2 gap-1.5">
              {[20, 21, 22, 23, 24, 25, 26].map((date) => (
                <View
                  key={date}
                  className={`flex-1 aspect-square items-center justify-center rounded-lg ${
                    date === 24
                      ? "bg-green-500"
                      : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      date === 24 ? "text-white" : "text-foreground"
                    }`}
                  >
                    {date}
                  </Text>
                </View>
              ))}
            </View>

            {/* Week 5 */}
            <View className="flex-row justify-between gap-1.5">
              {[27, 28, 29, 30, 31, null, null].map((date, i) => (
                <View
                  key={i}
                  className="flex-1 aspect-square items-center justify-center bg-gray-50 rounded-lg border border-gray-100"
                >
                  {date && (
                    <Text className="text-xs font-medium text-gray-400">
                      {date}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Daily Summary */}
        <View className="px-4 py-6 border-b border-gray-100">
          <Text className="text-muted text-[9px] font-bold uppercase tracking-wider mb-3">
            Daily Budget
          </Text>
          <View className="flex-row items-end mb-6">
            <Text className="text-4xl font-bold text-foreground">1,840</Text>
            <Text className="text-muted text-sm font-medium ml-2 mb-0.5">
              / 2,400 kcal
            </Text>
          </View>

          <View className="gap-4">
            <View>
              <View className="flex-row justify-between mb-1.5">
                <Text className="text-xs font-semibold text-foreground">
                  Protein
                </Text>
                <Text className="text-xs font-semibold text-foreground">
                  120g <Text className="text-muted font-normal">/ 150g</Text>
                </Text>
              </View>
              <View className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <View className="h-full bg-primary w-[80%]" />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-1.5">
                <Text className="text-xs font-semibold text-foreground">
                  Carbs
                </Text>
                <Text className="text-xs font-semibold text-foreground">
                  180g <Text className="text-muted font-normal">/ 250g</Text>
                </Text>
              </View>
              <View className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <View className="h-full bg-orange-400 w-[72%]" />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-1.5">
                <Text className="text-xs font-semibold text-foreground">
                  Fats
                </Text>
                <Text className="text-xs font-semibold text-foreground">
                  65g <Text className="text-muted font-normal">/ 70g</Text>
                </Text>
              </View>
              <View className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <View className="h-full bg-blue-400 w-[92%]" />
              </View>
            </View>
          </View>
        </View>

        {/* Meal Logs */}
        <View className="px-4 py-6">
          <Text className="text-muted text-[9px] font-bold uppercase tracking-wider mb-4">
            Recent Meals
          </Text>

          <View className="gap-4">
            {meals.map((meal, index) => {
              const IconComponent = iconMap[meal.icon];
              const isLast = index === meals.length - 1;
              return (
                <View
                  key={meal.id}
                  className={`flex-row items-center gap-3 ${!isLast ? "pb-4 border-b border-gray-100" : ""}`}
                >
                  <View className="w-10 h-10 bg-gray-50 rounded-lg items-center justify-center">
                    {IconComponent && (
                      <IconComponent size={20} color={meal.color} />
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="text-foreground font-semibold text-sm">
                      {meal.name}
                    </Text>
                    <View className="flex-row items-center mt-0.5 gap-1">
                      <Clock size={11} color="#9CA3AF" />
                      <Text className="text-muted text-xs">
                        {meal.time} • {meal.description}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-foreground font-bold text-sm">
                    {meal.calories} kcal
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Add Button */}
      <View className="absolute bottom-6 left-4 right-4">
        <PressableFeedback className="bg-primary h-12 rounded-lg items-center justify-center">
          <Text className="text-white font-bold text-sm uppercase tracking-wider">
            Add Meal
          </Text>
        </PressableFeedback>
      </View>
    </View>
  );
}
