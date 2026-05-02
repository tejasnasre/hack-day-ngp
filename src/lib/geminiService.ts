import { GoogleGenAI } from "@google/genai";
import { ProductData } from "./foodApi";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export interface HealthInsight {
  healthScore: number; // 0-100
  healthGrade: "A" | "B" | "C" | "D" | "F";
  summary: string;
  strengths: string[];
  concerns: string[];
  recommendations: string[];
  category: string;
  nutritionAnalysis: string;
}

async function getHealthInsights(product: ProductData): Promise<HealthInsight> {
  try {
    const nutritionPrompt = `Analyze this food product for health and nutrition:

Product: ${product.name}
Brand: ${product.brand || "Unknown"}
Category: ${product.category || "Not specified"}

Nutrition per 100g:
- Calories: ${product.calories || "N/A"} kcal
- Protein: ${product.protein || "N/A"}g
- Carbs: ${product.carbs || "N/A"}g
- Fat: ${product.fat || "N/A"}g
- Saturated Fat: ${product.saturatedFat || "N/A"}g
- Fiber: ${product.fiber || "N/A"}g
- Sugar: ${product.sugars || "N/A"}g
- Sodium: ${product.sodium || "N/A"}g
- Salt: ${product.salt || "N/A"}g

Ingredients: ${product.ingredients || "Not provided"}
Allergens: ${product.allergens?.join(", ") || "None listed"}
Nutrition Score: ${product.nutritionScore || "Unknown"}
Nova Group: ${product.novaGroup || "Unknown"}

Please provide a detailed health analysis in JSON format with:
1. healthScore (0-100, where 100 is perfectly healthy)
2. healthGrade (A=excellent, B=good, C=average, D=poor, F=very poor)
3. summary (2-3 sentences about the product's health value)
4. strengths (array of 2-3 positive aspects)
5. concerns (array of 2-3 potential health concerns)
6. recommendations (array of 2-3 actionable recommendations for consumption)
7. category (what category this product falls into for health)
8. nutritionAnalysis (detailed paragraph about nutritional composition and health implications)

Return ONLY valid JSON, no markdown formatting.`;

    const response = await client.models.generateContent({
      model: "gemini-1.5-flash",
      contents: nutritionPrompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("No response text from Gemini");
    }

    // Clean the response - remove markdown code blocks if present
    let cleanText = text;
    if (text.includes("```json")) {
      cleanText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (text.includes("```")) {
      cleanText = text.replace(/```\n?/g, "");
    }

    const insight = JSON.parse(cleanText.trim()) as HealthInsight;
    return insight;
  } catch (error) {
    console.error("Error getting health insights:", error);
    // Return a default insight if API call fails
    return getDefaultInsight(product);
  }
}

function getDefaultInsight(product: ProductData): HealthInsight {
  // Calculate a basic health score based on available data
  let score = 70;

  if (product.calories) {
    // Penalize high calorie products
    if (product.calories > 300) score -= 10;
    if (product.calories > 400) score -= 10;
  }

  if (product.sugars) {
    // Penalize high sugar
    if (product.sugars > 10) score -= 15;
    if (product.sugars > 20) score -= 10;
  }

  if (product.sodium) {
    // Penalize high sodium
    if (product.sodium > 500) score -= 10;
    if (product.sodium > 800) score -= 10;
  }

  if (product.protein) {
    // Reward good protein
    if (product.protein > 10) score += 5;
    if (product.protein > 20) score += 5;
  }

  if (product.fiber) {
    // Reward fiber
    if (product.fiber > 3) score += 10;
  }

  score = Math.max(0, Math.min(100, score));

  const grade =
    score >= 80
      ? "A"
      : score >= 65
        ? "B"
        : score >= 50
          ? "C"
          : score >= 35
            ? "D"
            : "F";

  return {
    healthScore: score,
    healthGrade: grade,
    summary: `${product.name} is a ${product.novaGroup === 1 ? "minimally processed" : product.novaGroup === 2 ? "processed" : product.novaGroup === 3 ? "ultra-processed" : "general"} food product. Review the nutritional details for dietary fit.`,
    strengths: product.fiber
      ? ["Good fiber content for digestive health"]
      : ["No major nutritional red flags"],
    concerns:
      product.sugars && product.sugars > 15 ? ["High sugar content"] : [],
    recommendations: [
      "Check serving size on the package",
      "Consider balanced meals with vegetables",
    ],
    category: product.category || "General Food",
    nutritionAnalysis: `This product contains ${product.calories || "unknown"} calories per 100g. The nutritional profile shows ${product.protein || 0}g protein, ${product.carbs || 0}g carbs, and ${product.fat || 0}g fat.`,
  };
}

export async function analyzeProduct(
  product: ProductData,
): Promise<HealthInsight> {
  return getHealthInsights(product);
}
