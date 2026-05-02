// API service for food product data

export interface ProductData {
  barcode: string;
  name: string;
  brand?: string;
  image?: string;
  category?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  saturatedFat?: number;
  fiber?: number;
  sugars?: number;
  sodium?: number;
  salt?: number;
  ingredients?: string;
  allergens?: string[];
  nutritionScore?: string; // Nutriscore grade (A-E)
  novaGroup?: number; // 1-4 scale
  completeness?: number; // Data completeness percentage
  ecoscore?: string; // Environmental score
  source: "openfoodfacts" | "fallback";
}

const OPENFOODFACTS_API = "https://world.openfoodfacts.net/api/v2/product";

// Fetch from Open Food Facts API
async function fetchFromOpenFoodFacts(
  barcode: string,
): Promise<ProductData | null> {
  try {
    const response = await fetch(`${OPENFOODFACTS_API}/${barcode}`);
    if (!response.ok) return null;

    const data = await response.json();

    if (!data.product) return null;

    const product = data.product;
    const nutrients = product.nutriments || {};

    // Extract category hierarchy
    let category = "Unknown";
    if (product.categories) {
      category = product.categories;
    } else if (product.categories_tags && product.categories_tags.length > 0) {
      category = product.categories_tags[0]
        .replace(/^en:/, "")
        .replace(/-/g, " ");
    }

    // Extract Nutriscore grade
    let nutritionScore = product.nutriscore_grade || product.nutrition_grade_fr;

    return {
      barcode,
      name: product.product_name || "Unknown Product",
      brand: product.brands || undefined,
      image: product.image_url || product.image_front_url || undefined,
      category,
      calories: nutrients["energy-kcal_100g"] || nutrients["energy_100g"],
      protein: nutrients["proteins_100g"],
      carbs: nutrients["carbohydrates_100g"],
      fat: nutrients["fat_100g"],
      saturatedFat: nutrients["saturated-fat_100g"],
      fiber: nutrients["fiber_100g"],
      sugars: nutrients["sugars_100g"],
      sodium: nutrients["sodium_100g"],
      salt: nutrients["salt_100g"],
      ingredients:
        product.ingredients_text || product.ingredients_text_en || undefined,
      allergens: product.allergens_tags || undefined,
      nutritionScore: nutritionScore?.toUpperCase(),
      novaGroup: product.nova_group,
      completeness: product.completeness,
      ecoscore: product.ecoscore_grade,
      source: "openfoodfacts",
    };
  } catch (error) {
    console.log("Open Food Facts API error:", error);
    return null;
  }
}

// Fallback: Try Nutritionix or other sources (mock implementation)
async function fetchFromFallback(barcode: string): Promise<ProductData | null> {
  // Note: This is a basic implementation. You can integrate actual APIs like:
  // - Nutritionix (requires API key)
  // - UPC Database (requires API key)
  // - iFoodData (requires API key)

  // For now, return null to indicate fallback is not configured
  // But the structure is ready for future integration
  return null;
}

// Main function to fetch product data with fallback
export async function fetchProductData(
  barcode: string,
): Promise<ProductData | null> {
  // Clean barcode - remove spaces and special characters
  const cleanBarcode = barcode.replace(/[^0-9]/g, "");

  if (!cleanBarcode || cleanBarcode.length < 8) {
    throw new Error("Invalid barcode format");
  }

  // Try Open Food Facts first
  let product = await fetchFromOpenFoodFacts(cleanBarcode);
  if (product) return product;

  // Try fallback APIs
  product = await fetchFromFallback(cleanBarcode);
  if (product) return product;

  // Product not found
  return null;
}

// Format macros for display
export function formatMacros(product: ProductData) {
  return {
    calories: product.calories ? Math.round(product.calories) : null,
    protein: product.protein ? product.protein.toFixed(1) : null,
    carbs: product.carbs ? product.carbs.toFixed(1) : null,
    fat: product.fat ? product.fat.toFixed(1) : null,
    saturatedFat: product.saturatedFat ? product.saturatedFat.toFixed(1) : null,
    fiber: product.fiber ? product.fiber.toFixed(1) : null,
    sugars: product.sugars ? product.sugars.toFixed(1) : null,
    sodium: product.sodium ? (product.sodium * 1000).toFixed(0) : null,
    salt: product.salt ? product.salt.toFixed(2) : null,
  };
}
