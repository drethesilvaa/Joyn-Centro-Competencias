"use client"

import { ProcessedEvent } from "@/types/events"
import { CalendarXIcon, CaretCircleLeftIcon, CaretCircleRightIcon } from "@phosphor-icons/react/dist/ssr"
import dayjs from "dayjs"
import { useState } from "react"
import { EventCard } from "./event-card"


interface EventsListProps {
    events: ProcessedEvent[]
    selectedDate?: string
    onSignUp: (event: ProcessedEvent) => void
}

export const EventsList: React.FC<EventsListProps> = ({ events, selectedDate, onSignUp }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const eventsPerPage = 3

    // Filter events by selected date
    const filteredEvents = selectedDate ? events.filter(event => event.date === selectedDate) : events

    // Calculate pagination
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
    const startIndex = (currentPage - 1) * eventsPerPage
    const endIndex = startIndex + eventsPerPage
    const currentEvents = filteredEvents.slice(startIndex, endIndex)

    // Reset to first page when date changes
    useState(() => {
        setCurrentPage(1)
    }, [selectedDate])

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    if (filteredEvents.length === 0) {
        return (
            <div className="text-center py-8">
                <CalendarXIcon color="#56566C" size={64} className="mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Nenhum evento encontrado para esta data</p>
                <p className="text-gray-400 text-sm mt-2">Selecione uma data diferente para ver os eventos disponíveis</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                {selectedDate && <div className="flex items-center gap-3">
                    <CalendarXIcon color="#56566C" size={32} />
                    <h3 className="text-xl font-semibold">
                        Eventos para {dayjs(selectedDate).format('DD/MM/YYYY')}
                    </h3>
                </div>}
                {selectedDate &&
                    <div className="text-sm text-gray-500">
                        {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado{filteredEvents.length !== 1 ? 's' : ''}
                    </div>
                }
            </div>

            <div className="grid gap-4">
                {currentEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onSignUp={onSignUp}
                    />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-full transition-colors duration-200 ${currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                            }`}
                    >
                        <CaretCircleLeftIcon size={32} />
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                            Página {currentPage} de {totalPages}
                        </span>
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-full transition-colors duration-200 ${currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                            }`}
                    >
                        <CaretCircleRightIcon size={32} />
                    </button>
                </div>
            )}
        </div>
    )
}