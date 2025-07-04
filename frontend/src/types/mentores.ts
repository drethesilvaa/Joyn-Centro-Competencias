
interface Stack {
  name: string;
  percent: number;
}

interface Person {
  name: string;
  email: string;
  stack: Stack[];
  photo: string;
  description: string;
}

interface Leader extends Person {
  stack: [];
}

interface Mentor extends Person {
  stack: Stack[];
}

interface Centro {
  title: string;
  lider: Leader;
  mentores: Mentor[];
}

interface MentoresData {
  centros: Centro[];
}

interface CentroLeader {
  name: string;
  email: string;
  stack: []; 
  photo: string;
  description: string;
}

interface CentroMentor {
  name: string;
  email: string;
  stack: Stack[];
  photo: string;
  description: string;
}

interface CentroDeCompetencia {
  title: string;
  lider: CentroLeader;
  mentores: CentroMentor[];
}

interface CentrosDeCompetenciaData {
  centros: CentroDeCompetencia[];
}

export type {
  CentrosDeCompetenciaData,
};
