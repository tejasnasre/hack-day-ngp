import { Button, Card, PressableFeedback } from "heroui-native";
import { Camera, HelpCircle, ScanBarcode } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import BarcodeScannerComponent from "../../components/BarcodeScannerComponent";
import ProductDetailScreen from "../../components/ProductDetailScreen";
import ProductNotFoundScreen from "../../components/ProductNotFoundScreen";
import { fetchProductData, ProductData } from "../../lib/foodApi";

type ScreenState = "home" | "scanner" | "loading" | "product" | "not-found";

export default function ScanScreen() {
  const [screenState, setScreenState] = useState<ScreenState>("home");
  const [product, setProduct] = useState<ProductData | null>(null);
  const [scannedBarcode, setScannedBarcode] = useState<string>("");

  const handleScanPress = () => {
    setScreenState("scanner");
  };

  const handleBarcodeScanned = async (barcode: string) => {
    setScannedBarcode(barcode);
    setScreenState("loading");

    try {
      const data = await fetchProductData(barcode);
      if (data) {
        setProduct(data);
        setScreenState("product");
      } else {
        setScreenState("not-found");
      }
    } catch {
      setScreenState("not-found");
    }
  };

  const handleScanAgain = () => {
    setProduct(null);
    setScannedBarcode("");
    setScreenState("scanner");
  };

  const handleClose = () => {
    setProduct(null);
    setScannedBarcode("");
    setScreenState("home");
  };

  // Scanner screen
  if (screenState === "scanner") {
    return (
      <BarcodeScannerComponent
        onBarcodeScanned={handleBarcodeScanned}
        onClose={handleClose}
      />
    );
  }

  // Loading screen
  if (screenState === "loading") {
    return (
      <View className="flex-1 bg-background items-center justify-center px-6">
        <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center">
          <ActivityIndicator size="large" color="#2E7D32" />
        </View>
        <Text className="text-foreground text-lg font-semibold mt-4 text-center">
          Fetching product details...
        </Text>
        <Text className="text-muted text-sm mt-1 text-center">
          Hang tight, nutrition data is on the way.
        </Text>
      </View>
    );
  }

  // Product detail screen
  if (screenState === "product" && product) {
    return (
      <ProductDetailScreen
        product={product}
        onClose={handleClose}
        onScanAgain={handleScanAgain}
      />
    );
  }

  // Product not found screen
  if (screenState === "not-found") {
    return (
      <ProductNotFoundScreen
        barcode={scannedBarcode}
        onScanAgain={handleScanAgain}
        onClose={handleClose}
      />
    );
  }

  // Home screen
  return (
    <View className="flex-1 bg-background pt-safe pb-safe-offset-4">
      <ScrollView className="flex-1" contentContainerClassName="grow px-4 py-6">
        <View className="items-center mb-8 mt-4">
          <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-4">
            <Camera size={40} color="#2E7D32" />
          </View>
          <Text className="text-3xl font-cossette-bold text-foreground text-center">
            Scan Your Meal
          </Text>
          <Text className="text-muted text-base text-center mt-2 px-6">
            Instantly track macros and ingredients by scanning any food product.
          </Text>
        </View>

        <PressableFeedback onPress={handleScanPress} className="mb-6">
          <Card className="items-center border-dashed border-2 border-primary/30 bg-primary/5 py-10">
            <Card.Body className="items-center">
              <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-4">
                <ScanBarcode size={48} color="#2E7D32" />
              </View>
              <Card.Title className="text-primary font-cossette-bold text-xl text-center">
                Tap to Start Scanning
              </Card.Title>
              <Card.Description className="text-muted text-center mt-1">
                Align the barcode within the frame
              </Card.Description>
            </Card.Body>
          </Card>
        </PressableFeedback>

        <Card className="mb-6 border-none bg-blue-50/50">
          <Card.Body className="flex-row items-start gap-3">
            <HelpCircle size={20} color="#2563EB" className="mt-0.5" />
            <View className="flex-1">
              <Card.Title className="text-blue-900 font-semibold text-sm mb-1">
                How it works
              </Card.Title>
              <Card.Description className="text-blue-800 text-xs leading-5">
                Point your camera at a barcode. We&apos;ll automatically fetch
                its nutritional profile, ingredients, and potential allergens.
              </Card.Description>
            </View>
          </Card.Body>
        </Card>
      </ScrollView>

      <View className="px-4 pb-safe-offset-4">
        <Button
          size="lg"
          className="w-full shadow-lg shadow-primary/30 bg-primary"
          onPress={handleScanPress}
        >
          <Text className="text-white font-semibold text-lg">
            Launch Scanner
          </Text>
        </Button>
      </View>
    </View>
  );
}
