import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Button, useThemeColor } from "heroui-native";
import { Camera, ScanBarcode } from "lucide-react-native";

export default function ScanScreen() {
  const primaryColor = useThemeColor("primary");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 px-4 py-6 justify-center">
        
        <View className="items-center mb-10">
          <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-4">
            <Camera size={40} color={primaryColor} />
          </View>
          <Text className="text-3xl font-cossette-bold text-foreground text-center">Scan Your Meal</Text>
          <Text className="text-muted text-base text-center mt-2 px-6">
            Point your camera at any food or barcode to instantly track macros and ingredients.
          </Text>
        </View>

        <Card className="mb-6 p-6 items-center border-dashed border-2 border-border bg-card/50">
          <ScanBarcode size={48} color={primaryColor} className="opacity-50 mb-4" />
          <Text className="text-foreground font-cossette-bold text-lg mb-1">Camera Ready</Text>
          <Text className="text-muted text-sm text-center">
            Align item within the frame
          </Text>
        </Card>

        <Button colorClassName="accent-primary" size="lg" className="w-full shadow-lg shadow-primary/30">
          <Text className="text-white font-semibold text-lg">Tap to Scan</Text>
        </Button>

      </View>
    </SafeAreaView>
  );
}
