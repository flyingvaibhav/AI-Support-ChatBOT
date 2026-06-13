import Settings from "@/model/settings.model";
import Conversation from "@/model/conversation.model";
import connectDb from "@/lib/db";
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

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    await connectDb()

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
  // extract text safely
  const aiText = (response as any).text ?? JSON.stringify(response);

  // save messages to conversation
  try {
    let conversation = await Conversation.findOne({ ownerId })
    if (!conversation) {
      conversation = await Conversation.create({ ownerId, messages: [] })
    }

    conversation.messages.push({ role: 'user', text: message })
    conversation.messages.push({ role: 'assistant', text: aiText })
    await conversation.save()

    return NextResponse.json({ answer: aiText });
  } catch (err) {
    console.error('Conversation save error:', err);
    return NextResponse.json({ answer: aiText });
  }

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { message: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}