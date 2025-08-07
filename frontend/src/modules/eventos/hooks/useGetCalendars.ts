import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

const fetchCalendars = async () => {
  try {
    const response = await fetch("/api/calendars");
    console.log(response)
    const data = await response.json();

    if (data.success) {
      console.log("Calendars:", data.calendars);
    }
  } catch (error) {
    console.error("Error fetching calendars:", error);
  }
};

export const useGetCalendars = (session: Session | null) =>
  useQuery({
    queryKey: ["Calendars"],
    queryFn: fetchCalendars,
    enabled: !!session,
  });
