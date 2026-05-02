import { CameraView, useCameraPermissions } from "expo-camera";
import { PressableFeedback } from "heroui-native";
import { ChevronLeft, Flashlight, FlashlightOff } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface BarcodeScannerComponentProps {
  onBarcodeScanned: (barcode: string) => void;
  onClose: () => void;
}

export default function BarcodeScannerComponent({
  onBarcodeScanned,
  onClose,
}: BarcodeScannerComponentProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);
  const [torchOn, setTorchOn] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const scannedBarcodes = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarcodeScanned = (data: any) => {
    if (!isScanning) return;

    const barcode = data.data;
    if (!barcode) return;

    // Prevent scanning the same barcode multiple times
    if (scannedBarcodes.current.has(barcode)) {
      return;
    }

    scannedBarcodes.current.add(barcode);
    setIsScanning(false);

    // Trigger callback
    onBarcodeScanned(barcode);
  };

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-background pt-safe pb-safe-offset-4 px-4 items-center justify-center">
        <Text className="text-foreground text-lg font-semibold mb-4 text-center">
          Camera Permission Required
        </Text>
        <Text className="text-muted text-base text-center mb-6">
          Please grant camera access to scan barcodes
        </Text>
        <PressableFeedback
          onPress={requestPermission}
          className="bg-primary px-8 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Grant Permission</Text>
        </PressableFeedback>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <View className="flex-1 relative">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={"back"}
          barcodeScannerEnabled={true}
          barcodeScannerSettings={{
            barcodeTypes: [
              "ean8",
              "ean13",
              "upc_a",
              "upc_e",
              "code128",
              "code39",
              "qr",
            ],
          }}
          onBarcodeScanned={handleBarcodeScanned}
          enableTorch={torchOn}
        />

        {/* Header */}
        <View className="absolute top-0 left-0 right-0 flex-row justify-between items-center p-4 z-10 pt-safe">
          <PressableFeedback
            onPress={onClose}
            className="w-10 h-10 bg-black/40 rounded-full items-center justify-center"
          >
            <ChevronLeft size={24} color="white" />
          </PressableFeedback>

          <Text className="text-white font-semibold text-lg">Scan Barcode</Text>

          <PressableFeedback
            onPress={() => setTorchOn(!torchOn)}
            className="w-10 h-10 bg-black/40 rounded-full items-center justify-center"
          >
            {torchOn ? (
              <Flashlight size={20} color="white" />
            ) : (
              <FlashlightOff size={20} color="white" />
            )}
          </PressableFeedback>
        </View>

        {/* Scanner Frame */}
        <View
          className="absolute inset-0 items-center justify-center z-5"
          pointerEvents="none"
        >
          <View
            className="border-2 border-primary/50 bg-primary/10"
            style={{
              width: 280,
              height: 100,
              borderRadius: 20,
            }}
          />
        </View>

        {/* Instructions */}
        <View className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/50 to-transparent p-6 pb-safe-offset-2">
          <Text className="text-white text-center font-semibold text-lg mb-2">
            {isScanning ? "Scanning..." : "Processing..."}
          </Text>
          <Text className="text-white/70 text-center text-sm">
            Point the camera at a barcode to scan
          </Text>
        </View>
      </View>
    </View>
  );
}
