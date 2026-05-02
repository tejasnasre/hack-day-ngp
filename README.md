# ScanBite 🍎

**ScanBite** is a modern, AI-powered nutrition companion designed to help you make smarter, healthier food choices in seconds. By bridging the gap between complex nutritional labels and actionable health insights, ScanBite empowers consumers to take control of their diet with the power of Generative AI.

## 🚀 Key Features

- **Instant Product Scanning**: Use your camera to scan food products and get immediate nutritional breakdowns.
- **Smart Health Grading**: Receive a comprehensive health score (0-100) and grade (A-F) for every item.
- **Personalized Insights**: Track your consumption patterns and receive AI-generated weekly summaries.
- **Additive Alert**: Automatically identifies and flags concerning additives like High Fructose Corn Syrup or excessive sodium.
- **History Log**: Keep a detailed record of what you've consumed to monitor your progress.

## 🤖 How We Used AI

ScanBite leverages the state-of-the-art **Google Gemini 1.5 Flash** model to provide deep, contextual nutritional analysis.

- **Intelligent Analysis**: Instead of just displaying raw numbers, Gemini analyzes the synergy between ingredients, macronutrients, and processing levels (NOVA groups).
- **Natural Language Recommendations**: The AI provides human-readable strengths, concerns, and actionable recommendations for every product scanned.
- **Pattern Recognition**: Our "Insights" engine uses Gemini to analyze your weekly log, identifying trends and suggesting improvements based on your actual consumption data.
- **Dynamic Formatting**: We use Gemini's JSON generation capabilities to power a rich, structured UI that updates in real-time.

## 🌍 Consumer Impact

ScanBite isn't just a calorie counter; it's a transparency tool for the modern consumer.

- **Democratizing Nutrition**: Complex ingredient lists are simplified into easy-to-understand health grades, making professional-grade nutrition advice accessible to everyone.
- **Behavioral Change**: By highlighting "strengths" and "concerns," users are encouraged to choose alternatives that better align with their health goals.
- **Reducing Processing Blindness**: The app helps users identify "ultra-processed" foods that often hide behind health-focused marketing.
- **Efficiency**: No more manual searching or reading tiny print. A quick scan provides all the context needed to make an informed purchase.

---

## 🛠️ Technical Setup

### Prerequisites

- [Bun](https://bun.sh) or Node.js
- Expo Go (for mobile testing)
- Google Gemini API Key
- Supabase Project (for Authentication and Database)

### Get Started

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Start the app**
   ```bash
   bun run android # or ios / web
   ```

## 🏗️ Tech Stack

- **Framework**: Expo (React Native)
- **AI Engine**: Google Gemini 1.5 Flash
- **Backend**: Supabase (Auth, DB, Storage)
- **UI Library**: HeroUI Native
- **Styling**: Uniwind (Tailwind CSS v4)
- **Icons**: Lucide React Native

---

Created with ❤️ during Hack Day.

