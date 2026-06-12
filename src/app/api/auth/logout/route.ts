import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
  }
}