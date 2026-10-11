
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in .env.local");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export const ACTIVE_MODEL = "gemini-3.5-flash-lite";

export const geminiModel = genAI.getGenerativeModel({
  model: ACTIVE_MODEL,
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.3,
    maxOutputTokens: 2048,
  },
});