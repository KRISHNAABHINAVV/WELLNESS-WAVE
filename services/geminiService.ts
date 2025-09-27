import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { WaterQualityReport, DiseaseCaseReport, RiskLevel } from "../types";

// FIX: Per @google/genai guidelines, initialize GoogleGenAI with process.env.API_KEY directly and assume it is set. This removes the need for runtime checks.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateRiskAnalysis = async (waterReports: WaterQualityReport[], diseaseReports: DiseaseCaseReport[]): Promise<string> => {
  const prompt = `
    Analyze the following water quality and disease case data from Northeast India. The region frequently sees outbreaks of typhoid, diarrhea, hepatitis, and cholera due to contaminated water and poor sanitation. Your analysis should:
    - Identify regions with the highest risk factors (high bacteria, high turbidity, high case counts of specific diseases like Cholera or Typhoid).
    - Detect any unusual spikes or anomalies in the data that could signal an impending outbreak.
    - Provide a concise risk assessment summary (2-3 sentences) specifically for Northeast India.
    - Suggest one key preventative action, considering the local context and mentioning the importance of surveillance initiatives like ICMR-FoodNet.

    Water Quality Data:
    ${JSON.stringify(waterReports.slice(0, 5), null, 2)}

    Disease Case Data:
    ${JSON.stringify(diseaseReports.slice(0, 5), null, 2)}

    Your analysis:
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating risk analysis:", error);
    return "An error occurred while analyzing the data. Please try again later.";
  }
};

export const analyzeWaterImage = async (base64Image: string, mimeType: string): Promise<string> => {
    const prompt = `
        Analyze this image of a water sample. Based purely on visual indicators like color, clarity, and visible particles, provide a brief, non-technical assessment.
        Is the water likely to be contaminated or safe for drinking?
        Do not provide medical advice. State that this is not a substitute for proper lab testing.
        Example response: "The water appears cloudy and contains visible particles, suggesting potential contamination. Laboratory testing is required for a definitive analysis."
    `;
    
    try {
        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: mimeType,
            },
        };
        const textPart = { text: prompt };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });
        return response.text;
    } catch (error) {
        console.error("Error analyzing water image:", error);
        return "An error occurred during image analysis. Please try again.";
    }
};

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
    const prompt = `Translate the following text to ${targetLanguage}: "${text}"`;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error translating text:", error);
        return text; // Fallback to original text
    }
}
