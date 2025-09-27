
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { WaterQualityReport, DiseaseCaseReport, RiskLevel, AIRiskAnalysis } from "../types";

// FIX: Per @google/genai guidelines, initialize GoogleGenAI with process.env.API_KEY directly and assume it is set. This removes the need for runtime checks.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const riskAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        analysisText: {
            type: Type.STRING,
            description: "A concise risk assessment summary (2-3 sentences) for Northeast India, including one key preventative action.",
        },
        riskData: {
            type: Type.ARRAY,
            description: "A list of locations with their calculated risk levels and coordinates based on the input data.",
            items: {
                type: Type.OBJECT,
                properties: {
                    location: { type: Type.STRING, description: "Name of the location." },
                    lat: { type: Type.NUMBER, description: "Latitude of the location." },
                    lng: { type: Type.NUMBER, description: "Longitude of the location." },
                    riskLevel: { type: Type.STRING, enum: [RiskLevel.HIGH, RiskLevel.MEDIUM, RiskLevel.LOW], description: "Calculated risk level." },
                },
                required: ["location", "lat", "lng", "riskLevel"],
            },
        },
    },
    required: ["analysisText", "riskData"],
};


export const generateRiskAnalysis = async (waterReports: WaterQualityReport[], diseaseReports: DiseaseCaseReport[]): Promise<AIRiskAnalysis> => {
  const prompt = `
    Analyze the following water quality and disease case data from Northeast India. The region frequently sees outbreaks of typhoid, diarrhea, hepatitis, and cholera due to contaminated water and poor sanitation. Your analysis should:
    - Identify regions with the highest risk factors (high bacteria, high turbidity, high case counts).
    - Determine a risk level (high, medium, or low) for each location present in the data.
    - Provide a concise risk assessment summary and suggest one key preventative action.
    - Return the coordinates from the input data for each location.

    Water Quality Data:
    ${JSON.stringify(waterReports.slice(0, 5), null, 2)}

    Disease Case Data:
    ${JSON.stringify(diseaseReports.slice(0, 5), null, 2)}

    Based on this data, provide your full analysis in the specified JSON format.
  `;
  
  const defaultResponse: AIRiskAnalysis = {
      analysisText: "An error occurred while analyzing the data. Please try again later.",
      riskData: [],
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          responseMimeType: "application/json",
          responseSchema: riskAnalysisSchema,
      }
    });
    // The response is a string that needs to be parsed
    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as AIRiskAnalysis;
  } catch (error) {
    console.error("Error generating risk analysis:", error);
    return defaultResponse;
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