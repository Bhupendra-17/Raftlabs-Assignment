import { GoogleGenAI, Type, Schema } from "@google/genai";
import { User } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = "gemini-2.5-flash";

export const generateMockUsers = async (count: number): Promise<User[]> => {
  try {
    const userSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        name: { type: Type.STRING },
        email: { type: Type.STRING },
        role: { type: Type.STRING, enum: ['admin', 'editor', 'viewer'] },
        status: { type: Type.STRING, enum: ['active', 'inactive'] },
        lastLogin: { type: Type.STRING, description: "ISO 8601 Date string" },
      },
      required: ["id", "name", "email", "role", "status", "lastLogin"]
    };

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Generate ${count} realistic mock user profiles for a SaaS dashboard.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: userSchema
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as User[];
    }
    return [];
  } catch (error) {
    console.error("Gemini Data Gen Error:", error);
    return [];
  }
};

export const analyzeCode = async (code: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Review the following JavaScript/TypeScript code. 
      Identify potential bugs, security risks (especially for cloud functions), and suggest performance improvements.
      Keep it concise and actionable.
      
      Code:
      ${code}`,
      config: {
        systemInstruction: "You are a senior cloud engineer reviewing code.",
      }
    });
    return response.text || "No analysis generated.";
  } catch (error) {
    return "Error analyzing code. Please check your API key.";
  }
};

export const askAssistant = async (history: {role: 'user' | 'model', content: string}[], message: string) => {
    // In a real app we'd maintain chat history properly.
    // Here we just do a single turn for simplicity or reconstruction.
    try {
        const response = await ai.models.generateContent({
            model: modelId,
            contents: message,
            config: {
                systemInstruction: "You are a helpful assistant embedded in a cloud developer dashboard called Nebula Studio. You help users manage resources, write database queries, and debug."
            }
        });
        return response.text || "I'm thinking...";
    } catch(e) {
        console.error(e);
        return "I encountered an error.";
    }
}