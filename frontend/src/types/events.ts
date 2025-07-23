// Google Calendar API Event Interface
export interface GoogleCalendarEvent {
    id: string
    summary: string
    description?: string
    start: {
        dateTime?: string // For events with specific times
        date?: string     // For all-day events
        timeZone?: string
    }
    end: {
        dateTime?: string
        date?: string
        timeZone?: string
    }
    location?: string
    attendees?: Array<{
        email: string
        displayName?: string
        responseStatus: 'needsAction' | 'declined' | 'tentative' | 'accepted'
    }>
    conferenceData?: {
        conferenceSolution?: {
            name: string
            iconUri?: string
        }
        entryPoints?: Array<{
            entryPointType: 'video' | 'phone' | 'sip' | 'more'
            uri: string
            label?: string
        }>
    }
    creator?: {
        email: string
        displayName?: string
    }
    organizer?: {
        email: string
        displayName?: string
    }
    status: 'confirmed' | 'tentative' | 'cancelled'
    visibility?: 'default' | 'public' | 'private' | 'confidential'
    eventType?: 'default' | 'outOfOffice' | 'focusTime' | 'workingLocation'
    extendedProperties?: {
        private?: { [key: string]: string }
        shared?: { [key: string]: string }
    }
    attachments?: Array<{
        fileUrl: string
        title: string
        mimeType?: string
        iconLink?: string
    }>
    reminders?: {
        useDefault: boolean
        overrides?: Array<{
            method: 'email' | 'popup'
            minutes: number
        }>
    }
    colorId?: string
    htmlLink: string
    iCalUID: string
    sequence: number
    created: string
    updated: string
    recurringEventId?: string
    originalStartTime?: {
        dateTime?: string
        date?: string
        timeZone?: string
    }
}

// Processed Event Interface for internal use
export interface ProcessedEvent {
    id: string
    title: string
    description: string
    date: string
    startTime: string
    endTime: string
    location: string
    isAllDay: boolean
    attendeesCount: number
    maxAttendees?: number
    organizer: string
    status: 'confirmed' | 'tentative' | 'cancelled'
    hasVideoConference: boolean
    videoConferenceLink?: string
    category: string
    image: string
    htmlLink: string
    isRecurring: boolean
}