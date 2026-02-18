import Settings from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, ownerId } = await req.json();
    
    if (!message || !ownerId) {
      return NextResponse.json(
        { message: "message and owner id is required" },
        { status: 400 }
      );
    }

    const setting = await Settings.findOne({ ownerId });
    if (!setting) {
        return NextResponse.json(
            { message: "Settings not found for the owner" },
            { status: 404 }
          );
    }

const KNOWLEDGE =`
business name: ${setting.businessName || "No information provided."}
support email: ${setting.supportEmail || "No information provided."}
knowledge:  ${setting.knowledge || "No information provided."}
`;


const prompt = `
You are a professional customer support assistant for this business.

Use ONLY the information provided below to answer the customer's question.
You may rephrase, summarize, or interpret the information if needed.
Do NOT invent new policies, prices, or promises.

If the customer's question is completely unrelated to the information,
or cannot be reasonably answered from it, reply exactly with:
"Please contact support."

-----------------------
BUSINESS INFORMATION
-----------------------
${KNOWLEDGE}

-----------------------
CUSTOMER QUESTION
-----------------------
${message}

-----------------------
 ANSWER
-----------------------
`
;

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});
 const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview",
    contents: prompt,
  });
  console.log(response.text);

return NextResponse.json(response);

  } catch (error) {
    // Error handling logic
        return NextResponse.json(
            { message: `chat error ${error}` },
            { status: 500 }
          );


  }
}