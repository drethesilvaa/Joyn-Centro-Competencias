export interface Topic {
  iconName: string;
  description: string;
}

export interface ChartValue {
  name: string;
  value: number;
}

export interface Chart {
  title: string;
  chartType: 'pie' | 'bar';
  values: ChartValue[];
}

export interface TopicDetail {
  iconName: string;
  description: string;
  url: string;
}

export interface LearningTopic {
  topicTitle: string;
  topicDetails: TopicDetail[];
}

export interface Learning {
  title: string;
  description: string;
  topics?: LearningTopic[];
}

export interface FeedbackTopic {
  iconName: string;
  title: string;
}

export interface Feedback {
  description: string;
  topics: FeedbackTopic[];
}

export interface Incentivos {
  description: string;
  topics: FeedbackTopic[];
}

export interface CentroDeCompetencia {
  title: string;
  description: string;
  charts: Chart[];
  learning: Learning[];
  feedback?: Feedback;
  incentivos?: Incentivos;
}

export interface Header {
  title: string;
  description: string;
  videoUrl: string;
  imageToSwapForVideo: string;
}

export interface Objectives {
  topics: Topic[];
}

export interface CompetenciasData {
  header: Header;
  objectives: Objectives;
  centrosDeCompetencia: CentroDeCompetencia[];
}