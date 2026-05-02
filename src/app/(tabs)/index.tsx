import { Button, PressableFeedback } from "heroui-native";
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
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View className="w-24 h-24 rounded-[40px] bg-white shadow-xl items-center justify-center mb-6 border border-white">
          <ActivityIndicator size="large" color="#2E7D32" />
        </View>
        <Text className="text-foreground text-2xl font-cossette-bold text-center tracking-tight">
          Fetching Nutrition...
        </Text>
        <Text className="text-muted text-sm mt-2 text-center font-medium px-4">
          Our AI is analyzing the product data for you.
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
    <View className="flex-1 bg-background pt-safe">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-12"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-12">
          <View className="w-24 h-24 bg-white rounded-[40px] shadow-xl items-center justify-center mb-6 border border-white">
            <Camera size={40} color="#2E7D32" />
          </View>
          <Text className="text-4xl font-cossette-bold text-foreground text-center tracking-tighter leading-none mb-3">
            Scan & Track
          </Text>
          <Text className="text-muted text-base text-center px-4 font-medium leading-6">
            Instantly reveal the nutritional truth behind every product.
          </Text>
        </View>

        <PressableFeedback onPress={handleScanPress} className="mb-8">
          <View className="bg-white rounded-[48px] border-2 border-dashed border-primary/20 bg-primary/5 py-12 px-6 items-center shadow-sm">
            <View className="w-20 h-20 bg-white rounded-full items-center justify-center mb-4 shadow-md border border-primary/10">
              <ScanBarcode size={40} color="#2E7D32" />
            </View>
            <Text className="text-primary font-cossette-bold text-xl text-center">
              Tap to Scan
            </Text>
            <Text className="text-muted text-xs text-center mt-2 font-medium">
              Point your camera at any food barcode
            </Text>
          </View>
        </PressableFeedback>

        <View className="bg-white/60 rounded-[32px] p-2 border border-white shadow-sm flex-row items-center">
          <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mr-4">
            <HelpCircle size={20} color="#2563EB" />
          </View>
          <View className="flex-1">
            <Text className="text-foreground font-cossette-bold text-sm mb-1">
              How it works
            </Text>
            <Text className="text-muted text-[11px] leading-4 font-medium">
              We use Open Food Facts & Gemini AI to analyze ingredients and
              macros instantly.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="p-6">
        <Button
          size="lg"
          className="w-full h-14 rounded-full"
          onPress={handleScanPress}
        >
          <View className="flex-row items-center">
            <ScanBarcode size={20} color="white" />
            <Text className="text-white font-cossette-bold ml-2 text-sm">
              Launch Scanner
            </Text>
          </View>
        </Button>
      </View>
    </View>
  );
}
