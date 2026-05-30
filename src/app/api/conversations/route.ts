import connectDb from '@/lib/db'
import Conversation from '@/model/conversation.model'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const ownerId = req.nextUrl.searchParams.get('ownerId')
    if (!ownerId) {
      return NextResponse.json({ message: 'ownerId is required' }, { status: 400 })
    }

    await connectDb()
    const conversation = await Conversation.findOne({ ownerId })
    if (!conversation) {
      return NextResponse.json({ message: 'no conversation found', ownerId }, { status: 404 })
    }

    return NextResponse.json(conversation)
  } catch (err) {
    console.log('conversations GET error', err)
    return NextResponse.json({ message: 'server error' }, { status: 500 })
  }
}
