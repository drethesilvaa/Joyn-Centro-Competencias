export interface HomeSection {
  title: string;
  subtitle: string;
  ctaText: string;
  card1: string;
  card2: string;
  card3: string;
  card4: string;
}

export interface CentrosSection {
  text: string;
  ctaText: string;
  quote: string;
}

export interface JoynAcademyTopic {
  iconName: string;
  text: string;
}

export interface JoynAcademySection {
  text: string;
  ctaText: string;
  topics: JoynAcademyTopic[];
}

export interface Mentor {
  image: string;
  text: string;
  subtitle: string;
}

export interface MentoresSection {
  text: string;
  ctaText: string;
  mentors: Mentor[];
}

export interface EventImage {
  src: string;
  alt: string;
}

export interface EventosSection {
  text: string;
  ctaText: string;
  images: EventImage[];
}

export interface HomepageData {
  home: HomeSection;
  centros: CentrosSection;
  joynAcademy: JoynAcademySection;
  mentores: MentoresSection;
  eventos: EventosSection;
}
