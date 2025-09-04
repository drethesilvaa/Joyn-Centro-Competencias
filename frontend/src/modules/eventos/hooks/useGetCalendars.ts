import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

type FetchCalendarsArgs = {
  calendarId: string;
  timezone?: string;
  from?: string;
  to?: string;
};

const fetchCalendars = async ({
  calendarId,
  timezone,
  from,
  to,
}: FetchCalendarsArgs) => {
  const params = new URLSearchParams();
  if (calendarId) params.set("calendarId", calendarId);
  if (timezone) params.set("timezone", timezone);
  if (from) params.set("from", from);
  if (to) params.set("to", to);

  const res = await fetch(`/api/calendar/events?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch calendar events");

  return res.json();
};

export const useGetCalendars = (
  session: Session | null,
  args: FetchCalendarsArgs
) =>
  useQuery({
    queryKey: ["Calendars", args], 
    queryFn: () => fetchCalendars(args),
    enabled: !!session && !!args.calendarId,
  });
