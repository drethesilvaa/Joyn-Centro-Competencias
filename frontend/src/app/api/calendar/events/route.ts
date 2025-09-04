// app/api/calendar/events/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

type Query = {
  calendarId?: string; // default: primary or provide a public calendar id
  from?: string; // YYYY-MM-DD or RFC3339
  to?: string; // YYYY-MM-DD or RFC3339
  maxResults?: string;
  pageToken?: string;
  timezone?: string; // e.g., "Europe/Lisbon"
};

function isoToRfc3339(d?: string) {
  if (!d) return undefined;
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(d);
  return isDateOnly
    ? new Date(`${d}T00:00:00Z`).toISOString()
    : new Date(d).toISOString();
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken as string | undefined;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q: Query = {
    calendarId: searchParams.get("calendarId") || undefined,
    from: searchParams.get("from") || undefined,
    to: searchParams.get("to") || undefined,
    maxResults: searchParams.get("maxResults") || undefined,
    pageToken: searchParams.get("pageToken") || undefined,
    timezone: searchParams.get("timezone") || undefined,
  };

  // For a public calendar, pass the public id, e.g.: your_calendar_id@group.calendar.google.com
  const calendarId = q.calendarId ?? "primary";

  const params = new URLSearchParams({
    singleEvents: "true",
    orderBy: "startTime",
  });
  if (q.from) params.set("timeMin", isoToRfc3339(q.from)!);
  if (q.to) params.set("timeMax", isoToRfc3339(q.to)!);
  if (q.maxResults) params.set("maxResults", q.maxResults);
  else params.set("maxResults", "2500");
  if (q.pageToken) params.set("pageToken", q.pageToken);
  if (q.timezone) params.set("timeZone", q.timezone);

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId
  )}/events?${params.toString()}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json(
      { error: "Google Calendar API error", status: res.status, body },
      { status: res.status }
    );
  }

  const data = await res.json();

  const events = (data.items || []).map((e: any) => ({
    id: e.id,
    summary: e.summary,
    description: e.description,
    location: e.location,
    htmlLink: e.htmlLink,
    start: e.start?.dateTime || e.start?.date,
    end: e.end?.dateTime || e.end?.date,
    created: e.created,
    updated: e.updated,
    status: e.status,
    organizer: e.organizer,
    creator: e.creator,
  }));

  return NextResponse.json({
    events,
    nextPageToken: data.nextPageToken ?? null,
    timeZone: data.timeZone ?? q.timezone ?? null,
  });
}
