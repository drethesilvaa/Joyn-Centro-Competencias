import { GoogleCalendarEvent, ProcessedEvent } from "@/types/events"
import dayjs from "dayjs"
import { inferCategory } from "./inferCategory"
import { getDefaultImage } from "./getDefaultImage"

export const processGoogleCalendarEvents = (events: GoogleCalendarEvent[]): ProcessedEvent[] => {
    return events
        .filter(event => event.status !== 'cancelled') // Filter out cancelled events
        .map(event => {
            const isAllDay = !event.start.dateTime && !!event.start.date
            const startDateTime = event.start.dateTime || event.start.date
            const endDateTime = event.end.dateTime || event.end.date
            
            // Parse dates
            const startMoment = dayjs(startDateTime)
            const endMoment = dayjs(endDateTime)
            
            // Get attendees info
            const attendeesCount = event.attendees?.filter(a => a.responseStatus === 'accepted').length || 0
            const maxAttendees = event.extendedProperties?.shared?.maxAttendees 
                ? parseInt(event.extendedProperties.shared.maxAttendees) 
                : undefined
            
            // Check for video conference
            const hasVideoConference = !!event.conferenceData?.entryPoints?.length
            const videoConferenceLink = event.conferenceData?.entryPoints?.find(ep => ep.entryPointType === 'video')?.uri
            
            // Get category and image from extended properties or infer from summary
            const category = event.extendedProperties?.shared?.category || inferCategory(event.summary)
            const image = event.extendedProperties?.shared?.image || getDefaultImage(category)
            
            return {
                id: event.id,
                title: event.summary,
                description: event.description?.replace(/\\n/g, '\n') || '',
                date: startMoment.format('YYYY-MM-DD'),
                startTime: isAllDay ? '' : startMoment.format('HH:mm'),
                endTime: isAllDay ? '' : endMoment.format('HH:mm'),
                location: event.location || (hasVideoConference ? 'Online' : 'Local não especificado'),
                isAllDay,
                attendeesCount,
                maxAttendees,
                organizer: event.organizer?.displayName || event.organizer?.email || 'Organizador não especificado',
                status: event.status,
                hasVideoConference,
                videoConferenceLink,
                category,
                image,
                htmlLink: event.htmlLink,
                isRecurring: !!event.recurringEventId
            }
        })
        .sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`))
}