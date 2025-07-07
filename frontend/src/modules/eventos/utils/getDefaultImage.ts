export const getDefaultImage = (category: string): string => {
    const imageMap: { [key: string]: string } = {
        'Workshop': '/eventos/workshop-default.jpg',
        'Team Building': '/eventos/team-building-default.jpg',
        'Palestra': '/eventos/presentation-default.jpg',
        'Curso': '/eventos/course-default.jpg',
        'Networking': '/eventos/networking-default.jpg',
        'Webinar': '/eventos/webinar-default.jpg',
        'Reunião': '/eventos/meeting-default.jpg'
    }
    return imageMap[category] || '/eventos/pexels-zhuhehuai-716276.jpg'
}