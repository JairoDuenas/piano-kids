import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateNewSong(difficulty = "Easy") {
  const prompt = `Generate a new piano lesson for a child. 
  Difficulty: ${difficulty}. 
  Return a JSON object for a song with:
  - title: Name of the song
  - description: Short fun description
  - difficulty: ${difficulty}
  - steps: Array of objects with { note, duration }. 
    Notes should be like 'C4', 'D#4', 'E4', etc. 
    Durations like '4n', '8n', '2n'.
    Keep it between 10 and 20 steps.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  note: { type: Type.STRING },
                  duration: { type: Type.STRING },
                },
                required: ["note", "duration"],
              },
            },
          },
          required: ["title", "description", "difficulty", "steps"],
        },
      },
    });

    const songData = JSON.parse(response.text);
    return {
      ...songData,
      id: `gen-${Date.now()}`,
    };
  } catch (error) {
    console.error("Error generating song:", error);
    return null;
  }
}
