import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { message } = await req.json();

    if (!message || !message.trim()) {
      return Response.json(
        { reply: "Please type a question first." },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-4-hydrogen",
      contents: message,
      config: {
        systemInstruction:
          "You are ROPLONG AI, a helpful, clear, and friendly assistant created by Kumzak Roplong Abiadun. Explain topics like education, economics, development, coding, and everyday questions clearly with practical examples."
      }
    });

    return Response.json({ reply: response.text });
  } catch (error) {
    console.error("AI Function Error:", error);
    return Response.json(
      { reply: "Sorry, ROPLONG AI had trouble answering right now. Please try again in a moment." },
      { status: 500 }
    );
  }
};
      
