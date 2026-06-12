import { NextRequest, NextResponse } from "next/server";
import { scalekit } from "@/lib/scalekit";

export async function GET(req: NextRequest) {
  try {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
    const url = scalekit.getAuthorizationUrl(redirectUri);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Failed to initiate login' },
      { status: 500 }
    );
  }
}