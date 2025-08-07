import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { google } from "googleapis";
import { authOptions } from "@/lib/authOptions";

const calendar = google.calendar("v3");

export async function GET(request: NextRequest) {
  try {
    // Get session from NextAuth
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    // Set credentials from NextAuth session
    oauth2Client.setCredentials({
      access_token: session.accessToken as string,
    });

    // Set auth for calendar API
    google.options({ auth: oauth2Client });

    // Fetch calendar list
    const response = await calendar.calendarList.list({
      maxResults: 100,
      showHidden: false,
    });

    const calendars =
      response.data.items?.map((cal) => ({
        id: cal.id,
        summary: cal.summary,
        description: cal.description,
        primary: cal.primary,
        accessRole: cal.accessRole,
        backgroundColor: cal.backgroundColor,
        foregroundColor: cal.foregroundColor,
      })) || [];

    return NextResponse.json({
      success: true,
      calendars,
      total: calendars.length,
    });
  } catch (error: any) {
    console.error("Calendar API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch calendars",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
