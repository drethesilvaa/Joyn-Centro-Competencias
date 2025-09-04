// app/eventos/hooks/useInfiniteCalendars.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

type FetchCalendarsArgs = {
  calendarId: string;
  timezone?: string;
  // Prefer FUTURE events only: set just "from" and omit "to"
  from?: string; // YYYY-MM-DD or RFC3339
  to?: string;
  maxResults?: string; // e.g., "2500"
};

type PageArgs = FetchCalendarsArgs & { pageToken?: string };

const fetchCalendarsPage = async ({
  calendarId,
  timezone,
  from,
  to,
  maxResults = "2500",
  pageToken,
}: PageArgs) => {
  const params = new URLSearchParams();
  params.set("calendarId", calendarId);
  params.set("maxResults", maxResults);
  if (timezone) params.set("timezone", timezone);
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  if (pageToken) params.set("pageToken", pageToken);

  const res = await fetch(`/api/calendar/events?${params.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch calendar events");
  return res.json(); // { events, nextPageToken, timeZone }
};

export const useInfiniteCalendars = (
  session: Session | null,
  args: FetchCalendarsArgs
) =>
  useInfiniteQuery({
    queryKey: ["CalendarsInfinite", args],
    enabled: !!session && !!args.calendarId,
    queryFn: ({ pageParam }) =>
      fetchCalendarsPage({ ...args, pageToken: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    initialPageParam: undefined,
  });
