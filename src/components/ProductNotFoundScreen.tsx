import { Button, Card } from "heroui-native";
import { AlertCircle, ArrowLeft, Package, QrCode } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface ProductNotFoundScreenProps {
  barcode: string;
  onScanAgain: () => void;
  onClose: () => void;
}

export default function ProductNotFoundScreen({
  barcode,
  onScanAgain,
  onClose,
}: ProductNotFoundScreenProps) {
  return (
    <View className="flex-1 bg-background pt-safe">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
          <Pressable onPress={onClose} className="flex-row items-center">
            <ArrowLeft size={24} color="#2E7D32" />
            <Text className="ml-2 text-foreground font-semibold">Back</Text>
          </Pressable>
          <Text className="text-foreground font-cossette-bold text-lg">
            Scan Result
          </Text>
          <View className="w-6" />
        </View>

        {/* Content */}
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-20 h-20 bg-red-100 rounded-full items-center justify-center mb-6">
            <AlertCircle size={40} color="#DC2626" />
          </View>

          <Text className="text-foreground font-cossette-bold text-2xl text-center mb-2">
            Product Not Found
          </Text>

          <Text className="text-muted text-base text-center mb-6">
            We couldn&apos;t find this product in our database.
          </Text>

          {/* Barcode Info */}
          <Card className="w-full mb-6 p-4 bg-card border border-border">
            <View className="items-center">
              <QrCode size={24} color="#8F8A82" className="mb-2" />
              <Text className="text-muted text-xs font-semibold mb-1">
                Scanned Barcode
              </Text>
              <Text className="text-foreground font-mono text-lg wrap-break-word text-center">
                {barcode}
              </Text>
            </View>
          </Card>

          {/* Suggestion */}
          <Card className="w-full mb-6 p-4 bg-blue-50 border border-blue-200">
            <View className="flex-row items-start gap-3">
              <Package size={20} color="#2563EB" />
              <View className="flex-1">
                <Text className="text-foreground font-semibold text-sm mb-1">
                  Why Not Found?
                </Text>
                <Text className="text-foreground text-xs leading-5">
                  This product may be:
                  {"\n"}• Not available in the database yet
                  {"\n"}• A regional or new product
                  {"\n"}• An invalid or partially scanned barcode
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Action Buttons */}
        <View className="border-t border-border px-4 py-4 gap-3 pb-safe-offset-4">
          <Button size="lg" className="w-full bg-primary" onPress={onScanAgain}>
            <Text className="text-white font-semibold">Try Again</Text>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onPress={onClose}
          >
            <Text className="text-primary font-semibold">Back to Home</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
