import connectDb from '@/lib/db'
import Conversation from '@/model/conversation.model'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const ownerId = req.nextUrl.searchParams.get('ownerId');
    if (!ownerId) {
      return NextResponse.json(
        { message: 'ownerId is required' },
        { status: 400 }
      );
    }

    await connectDb();
    const conversation = await Conversation.findOne({ ownerId });
    if (!conversation) {
      return NextResponse.json(
        { messages: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(conversation);
  } catch (err) {
    console.error('Conversations GET error:', err);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
