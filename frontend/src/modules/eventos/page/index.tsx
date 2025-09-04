// app/eventos/page.tsx (your EventosPage component)
"use client";

import { PagesLayout } from "@/layouts/PagesLayout";
import { GoogleCalendarEvent, ProcessedEvent } from "@/types/events";
import { Button, Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { processGoogleCalendarEvents } from "../utils/processGoogleCalendarEvents";
import { EventsList } from "../components/event-list";
import Dialog from "@/components/Dialog";
import { useSession } from "next-auth/react";
import { useInfiniteCalendars } from "../hooks/useInfiniteCalendars";

export const EventosPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedEvent, setSelectedEvent] = useState<ProcessedEvent | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: session } = useSession();

  // FUTURE ONLY: from today, omit "to"
  const from = dayjs().startOf("day").format("YYYY-MM-DD");

  const {
    data,
    isFetching,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCalendars(session, {
    calendarId:
      "c_76ed14e36f31be4e047fabaa5032a1414ea13e2c5905f33f15f81353c92d5a26@group.calendar.google.com",
    timezone: "Europe/Lisbon",
    from, // only min bound
    // to: undefined, // omit to fetch all future
    maxResults: "2500",
  });

  // Flatten all pages
  const flatEvents = useMemo(() => {
    const pages = data?.pages ?? [];
    return pages.flatMap((p) => p.events ?? []);
  }, [data]);

  const timeZone = useMemo(() => {
    // Prefer the timeZone from the *first* page, fallback to Lisbon
    return data?.pages?.[0]?.timeZone || "Europe/Lisbon";
  }, [data]);

  // Adapt to GoogleCalendarEvent[]
  const googleEvents: GoogleCalendarEvent[] = useMemo(() => {
    const tz = timeZone || "UTC";
    return flatEvents.map((e: any): GoogleCalendarEvent => {
      const isAllDay = /^\d{4}-\d{2}-\d{2}$/.test(e.start);
      return {
        id: e.id,
        summary: e.summary ?? "",
        description: e.description ?? "",
        start: isAllDay
          ? { date: e.start, timeZone: tz }
          : { dateTime: e.start, timeZone: tz },
        end: isAllDay
          ? { date: e.end, timeZone: tz }
          : { dateTime: e.end, timeZone: tz },
        location: e.location,
        attendees: e.attendees ?? [],
        organizer: e.organizer,
        status: e.status,
        htmlLink: e.htmlLink,
        iCalUID: e.iCalUID ?? e.id,
        sequence: 0,
        created: e.created,
        updated: e.updated,
        extendedProperties: {
          shared: {
            maxAttendees: e.maxAttendees?.toString(),
            category: e.category,
            image: e.image,
          },
        },
      };
    });
  }, [flatEvents, timeZone]);

  const processedEvents = useMemo(() => {
    if (!googleEvents.length) return [];
    return processGoogleCalendarEvents(googleEvents);
  }, [googleEvents]);

  const nextEvents = useMemo(() => {
    const now = dayjs();
    const currentDateTime = now.format("YYYY-MM-DD HH:mm");

    return processedEvents
      .filter((event) => {
        if (event.isAllDay) {
          const eventDate = dayjs(event.date);
          return eventDate.isAfter(now, "day") || eventDate.isSame(now, "day");
        }
        const eventDateTime = `${event.date} ${event.startTime}`;
        return eventDateTime >= currentDateTime;
      })
      .sort((a, b) => {
        const dateComparison = a.date.localeCompare(b.date);
        if (dateComparison !== 0) return dateComparison;
        if (a.isAllDay && !b.isAllDay) return -1;
        if (!a.isAllDay && b.isAllDay) return 1;
        if (a.isAllDay && b.isAllDay) return 0;
        return a.startTime.localeCompare(b.startTime);
      })
      .slice(0, 1);
  }, [processedEvents]);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const onDateChange = (date: Dayjs) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  const handleSignUp = (event: ProcessedEvent) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  const eventDates = useMemo(() => {
    const dates = [...new Set(processedEvents.map((event) => event.date))];
    return dates.reduce((acc, date) => {
      acc[date] = processedEvents.filter((e) => e.date === date).length;
      return acc;
    }, {} as { [key: string]: number });
  }, [processedEvents]);

  return (
    <PagesLayout
      pageTitle="Eventos"
      pageDescription=""
      pageImage="/eventos/pexels-zhuhehuai-716276.jpg"
      pageImageAlt="alt"
      isEventsPage={true}
      events={{ nextEvents, handleSignUp }}
    >
      <>
        <div className="py-14 grid gap-10">
          <h2 className="text-4xl font-semibold">Calendário</h2>

          {(isLoading || isFetching) && <p>Loading events…</p>}
          {error && (
            <p className="text-red-500">
              Failed to load events: {(error as Error).message}
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Selecione uma data</h3>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <Calendar
                  fullscreen={false}
                  onChange={onDateChange}
                  onPanelChange={onPanelChange}
                  value={dayjs(selectedDate)}
                  cellRender={(date) => {
                    const dateStr = date.format("YYYY-MM-DD");
                    const eventCount = eventDates[dateStr];
                    return eventCount ? (
                      <div className="relative">
                        <div className="absolute z-10 -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                          {eventCount}
                        </div>
                      </div>
                    ) : null;
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <EventsList
                events={processedEvents}
                selectedDate={selectedDate}
                onSignUp={handleSignUp}
              />

              {/* Lazy load more events */}
              {hasNextPage && (
                <div className="flex justify-center">
                  <Button
                    size="large"
                    onClick={() => fetchNextPage()}
                    loading={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Loading…" : "Load more"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedEvent && (
          <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <div className="bg-white rounded-lg p-6 w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">
                Confirmar Inscrição
              </h3>
              <div className="space-y-3 mb-4">
                <p className="">
                  Deseja se inscrever no evento "{selectedEvent.title}"?
                </p>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Data:</strong>{" "}
                    {dayjs(selectedEvent.date).format("DD/MM/YYYY")}
                  </p>
                  {!selectedEvent.isAllDay && (
                    <p>
                      <strong>Horário:</strong> {selectedEvent.startTime} -{" "}
                      {selectedEvent.endTime}
                    </p>
                  )}
                  <p>
                    <strong>Local:</strong> {selectedEvent.location}
                  </p>
                  <p>
                    <strong>Organizador:</strong> {selectedEvent.organizer}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end items-center">
                <Button size="large" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button
                  size="large"
                  onClick={() => {
                    window.open(selectedEvent.htmlLink, "_blank");
                    handleCloseDialog();
                  }}
                >
                  Confirmar Inscrição
                </Button>
              </div>
            </div>
          </Dialog>
        )}
      </>
    </PagesLayout>
  );
};
