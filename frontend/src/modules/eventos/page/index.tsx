"use client"

import { PagesLayout } from "@/layouts/PagesLayout"
import { GoogleCalendarEvent, ProcessedEvent } from "@/types/events"
import { Button, Calendar, CalendarProps } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { CalendarX, CaretCircleLeft, CaretCircleRight } from "phosphor-react"
import { useMemo, useState } from "react"
import { processGoogleCalendarEvents } from "../utils/processGoogleCalendarEvents"
import { EventsList } from "../components/event-list"
import Dialog from "@/components/Dialog"

const pageEventos = {
    pageTitle: "Eventos",
    pageDescription: "O gamification tem como objetivo aumentar o envolvimento e a motivação dos colaboradores, tornando as tarefas mais interativas e gratificantes. Através da aplicação de  pontos, incentiva-se a produtividade, o trabalho em equipa e o desenvolvimento contínuo no ambiente de trabalho",
    videoUrl: "https://www.youtube.com/watch?v=example-video-id",
    imageToSwapForVideo: "/eventos/pexels-zhuhehuai-716276.jpg",
    imageAlt: "alt"
}

const eventos = [{
    title: "",
    image: "",
    alt: "",
    date: "",

}]

// Mock Google Calendar API response for demonstration
const mockGoogleCalendarEvents: GoogleCalendarEvent[] = [
    {
        id: "event1_20250707T140000Z",
        summary: "Workshop de Produtividade",
        description: "Aprenda técnicas avançadas para aumentar sua produtividade no trabalho\\n\\nTópicos abordados:\\n- Gestão de tempo\\n- Ferramentas de automação\\n- Técnicas de foco",
        start: {
            dateTime: "2025-07-07T14:00:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        end: {
            dateTime: "2025-07-07T16:00:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        location: "Sala de Conferências A, Edifício Principal",
        attendees: [
            { email: "user1@company.com", displayName: "João Silva", responseStatus: "accepted" },
            { email: "user2@company.com", displayName: "Maria Santos", responseStatus: "accepted" },
            { email: "user3@company.com", displayName: "Pedro Costa", responseStatus: "tentative" }
        ],
        organizer: {
            email: "hr@company.com",
            displayName: "Recursos Humanos"
        },
        status: "confirmed",
        htmlLink: "https://calendar.google.com/event?eid=example1",
        iCalUID: "event1@google.com",
        sequence: 0,
        created: "2025-07-01T10:00:00Z",
        updated: "2025-07-01T10:00:00Z",
        extendedProperties: {
            shared: {
                "maxAttendees": "25",
                "category": "Workshop",
                "image": "/eventos/workshop-productivity.jpg"
            }
        }
    },
    {
        id: "event2_20250707T163000Z",
        summary: "Sessão de Team Building",
        description: "Atividades colaborativas para fortalecer as relações da equipe",
        start: {
            dateTime: "2025-07-07T16:30:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        end: {
            dateTime: "2025-07-07T18:00:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        location: "Espaço Recreativo",
        attendees: Array.from({ length: 32 }, (_, i) => ({
            email: `user${i + 1}@company.com`,
            displayName: `User ${i + 1}`,
            responseStatus: "accepted" as const
        })),
        organizer: {
            email: "events@company.com",
            displayName: "Equipe de Eventos"
        },
        status: "confirmed",
        htmlLink: "https://calendar.google.com/event?eid=example2",
        iCalUID: "event2@google.com",
        sequence: 0,
        created: "2025-07-01T10:00:00Z",
        updated: "2025-07-01T10:00:00Z",
        extendedProperties: {
            shared: {
                "maxAttendees": "40",
                "category": "Team Building",
                "image": "/eventos/team-building.jpg"
            }
        }
    },
    {
        id: "event3_20250708T100000Z",
        summary: "Palestra sobre Inovação",
        description: "Tendências tecnológicas e como aplicá-las no ambiente corporativo",
        start: {
            dateTime: "2025-07-08T10:00:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        end: {
            dateTime: "2025-07-08T12:00:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        location: "Auditório Principal",
        conferenceData: {
            conferenceSolution: {
                name: "Google Meet"
            },
            entryPoints: [
                {
                    entryPointType: "video",
                    uri: "https://meet.google.com/abc-defg-hij"
                }
            ]
        },
        attendees: Array.from({ length: 75 }, (_, i) => ({
            email: `user${i + 1}@company.com`,
            displayName: `User ${i + 1}`,
            responseStatus: "accepted" as const
        })),
        organizer: {
            email: "innovation@company.com",
            displayName: "Equipe de Inovação"
        },
        status: "confirmed",
        htmlLink: "https://calendar.google.com/event?eid=example3",
        iCalUID: "event3@google.com",
        sequence: 0,
        created: "2025-07-01T10:00:00Z",
        updated: "2025-07-01T10:00:00Z",
        extendedProperties: {
            shared: {
                "maxAttendees": "100",
                "category": "Palestra",
                "image": "/eventos/innovation-talk.jpg"
            }
        }
    },
    {
        id: "event4_20250708T090000Z",
        summary: "Curso de Liderança",
        description: "Desenvolva suas habilidades de liderança com especialistas",
        start: {
            dateTime: "2025-07-08T09:00:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        end: {
            dateTime: "2025-07-08T17:00:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        location: "Sala de Treinamento B",
        attendees: Array.from({ length: 15 }, (_, i) => ({
            email: `user${i + 1}@company.com`,
            displayName: `User ${i + 1}`,
            responseStatus: "accepted" as const
        })),
        organizer: {
            email: "training@company.com",
            displayName: "Equipe de Treinamento"
        },
        status: "confirmed",
        htmlLink: "https://calendar.google.com/event?eid=example4",
        iCalUID: "event4@google.com",
        sequence: 0,
        created: "2025-07-01T10:00:00Z",
        updated: "2025-07-01T10:00:00Z",
        extendedProperties: {
            shared: {
                "maxAttendees": "20",
                "category": "Curso",
                "image": "/eventos/leadership-course.jpg"
            }
        }
    },
    {
        id: "event5_20250709T150000Z",
        summary: "Networking Coffee",
        description: "Momento informal para conectar com colegas de outras áreas",
        start: {
            dateTime: "2025-07-09T15:00:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        end: {
            dateTime: "2025-07-09T16:30:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        location: "Café Central",
        attendees: Array.from({ length: 35 }, (_, i) => ({
            email: `user${i + 1}@company.com`,
            displayName: `User ${i + 1}`,
            responseStatus: "accepted" as const
        })),
        organizer: {
            email: "social@company.com",
            displayName: "Equipe Social"
        },
        status: "confirmed",
        htmlLink: "https://calendar.google.com/event?eid=example5",
        iCalUID: "event5@google.com",
        sequence: 0,
        created: "2025-07-01T10:00:00Z",
        updated: "2025-07-01T10:00:00Z",
        extendedProperties: {
            shared: {
                "maxAttendees": "50",
                "category": "Networking",
                "image": "/eventos/networking-coffee.jpg"
            }
        }
    },
    {
        id: "event6_20250710T110000Z",
        summary: "Webinar sobre Sustentabilidade",
        description: "Práticas sustentáveis no ambiente de trabalho",
        start: {
            dateTime: "2025-07-10T11:00:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        end: {
            dateTime: "2025-07-10T12:30:00+01:00",
            timeZone: "Europe/Lisbon"
        },
        location: "Online",
        conferenceData: {
            conferenceSolution: {
                name: "Zoom"
            },
            entryPoints: [
                {
                    entryPointType: "video",
                    uri: "https://zoom.us/j/1234567890"
                }
            ]
        },
        attendees: Array.from({ length: 150 }, (_, i) => ({
            email: `user${i + 1}@company.com`,
            displayName: `User ${i + 1}`,
            responseStatus: "accepted" as const
        })),
        organizer: {
            email: "sustainability@company.com",
            displayName: "Equipe de Sustentabilidade"
        },
        status: "confirmed",
        htmlLink: "https://calendar.google.com/event?eid=example6",
        iCalUID: "event6@google.com",
        sequence: 0,
        created: "2025-07-01T10:00:00Z",
        updated: "2025-07-01T10:00:00Z",
        extendedProperties: {
            shared: {
                "maxAttendees": "200",
                "category": "Webinar",
                "image": "/eventos/sustainability-webinar.jpg"
            }
        }
    }
]


export const EventosPage = () => {
    const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
    const [selectedEvent, setSelectedEvent] = useState<ProcessedEvent | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Process Google Calendar events
    const processedEvents = useMemo(() => {
        return processGoogleCalendarEvents(mockGoogleCalendarEvents)
    }, [])

    const nextEvents = useMemo(() => {
        const now = dayjs()
        const currentDateTime = now.format('YYYY-MM-DD HH:mm')

        return processedEvents
            .filter(event => {
                // For all-day events, compare only the date
                if (event.isAllDay) {
                    const eventDate = dayjs(event.date)
                    return eventDate.isAfter(now, 'day') || eventDate.isSame(now, 'day')
                }
                // For timed events, compare date and time
                const eventDateTime = `${event.date} ${event.startTime}`
                return eventDateTime >= currentDateTime
            })
            .sort((a, b) => {
                // Sort by date first, then by time
                const dateComparison = a.date.localeCompare(b.date)
                if (dateComparison !== 0) return dateComparison

                // If all-day events, they come first for the same date
                if (a.isAllDay && !b.isAllDay) return -1
                if (!a.isAllDay && b.isAllDay) return 1
                if (a.isAllDay && b.isAllDay) return 0

                // Compare start times
                return a.startTime.localeCompare(b.startTime)
            })
            .slice(0, 1)
    }, [processedEvents])

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode)
    }

    const onDateChange = (date: Dayjs) => {
        const formattedDate = date.format('YYYY-MM-DD')
        setSelectedDate(formattedDate)
        console.log('Selected date:', formattedDate)
    }

    const handleSignUp = (event: ProcessedEvent) => {
        setSelectedEvent(event)
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        setSelectedEvent(null)
    }

    // Get events with dates that have events for calendar highlighting
    const eventDates = useMemo(() => {
        const dates = [...new Set(processedEvents.map(event => event.date))]
        return dates.reduce((acc, date) => {
            acc[date] = processedEvents.filter(e => e.date === date).length
            return acc
        }, {} as { [key: string]: number })
    }, [processedEvents])

    return (
        <PagesLayout
            pageTitle={pageEventos?.pageTitle || ""}
            pageDescription={""}
            pageImage={pageEventos?.imageToSwapForVideo || ""}
            pageImageAlt={pageEventos?.imageAlt || ""}
            events={{ nextEvents, handleSignUp }}
        >
            <>
                <div className="py-14 grid gap-10">
                    <h2 className="text-4xl font-semibold">Calendário</h2>
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
                                        const dateStr = date.format('YYYY-MM-DD')
                                        const eventCount = eventDates[dateStr]

                                        return eventCount ? (
                                            <div className="relative">
                                                <div className="absolute z-10 -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                                                    {eventCount}
                                                </div>
                                            </div>
                                        ) : null
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
                        </div>
                    </div>
                </div>

                {/* Dialog Component - Replace with your actual Dialog component */}
                {selectedEvent && (
                    <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                        <div className="bg-white rounded-lg p-6 w-full mx-4">
                            <h3 className="text-xl font-semibold mb-4">Confirmar Inscrição</h3>
                            <div className="space-y-3 mb-4">
                                <p className="">
                                    Deseja se inscrever no evento "{selectedEvent.title}"?
                                </p>
                                <div className="text-sm space-y-1">
                                    <p><strong>Data:</strong> {dayjs(selectedEvent.date).format('DD/MM/YYYY')}</p>
                                    {!selectedEvent.isAllDay && (
                                        <p><strong>Horário:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
                                    )}
                                    <p><strong>Local:</strong> {selectedEvent.location}</p>
                                    <p><strong>Organizador:</strong> {selectedEvent.organizer}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end items-center">
                                <Button size="large" color="default" variant="text" onClick={handleCloseDialog}>
                                    Cancelar
                                </Button>
                                <Button size="large" variant="solid" color="primary" onClick={() => {
                                    console.log('Inscrito no evento:', selectedEvent.title)
                                    // Here you would typically make an API call to add the user to the event
                                    // You could also open the Google Calendar link to add to their personal calendar
                                    window.open(selectedEvent.htmlLink, '_blank')
                                    handleCloseDialog()
                                }}>
                                    Confirmar Inscrição
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                )}
            </>
        </PagesLayout>
    )
}