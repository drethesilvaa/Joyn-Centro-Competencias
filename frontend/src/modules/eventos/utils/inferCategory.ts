export const inferCategory = (title: string): string => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('workshop')) return 'Workshop'
    if (titleLower.includes('team building')) return 'Team Building'
    if (titleLower.includes('palestra') || titleLower.includes('apresentação')) return 'Palestra'
    if (titleLower.includes('curso') || titleLower.includes('treinamento')) return 'Curso'
    if (titleLower.includes('networking') || titleLower.includes('coffee')) return 'Networking'
    if (titleLower.includes('webinar') || titleLower.includes('online')) return 'Webinar'
    if (titleLower.includes('reunião') || titleLower.includes('meeting')) return 'Reunião'
    return 'Evento'
}