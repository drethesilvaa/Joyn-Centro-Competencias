interface Medalha {
  icon: string;
  title: string;
}

interface Reconhece {
  email: string;
  passos: string[];
  regras: string[];
}

export interface Gamification {
  pontos: string[];
  reconhece: Reconhece;
  medalhas: Medalha[];
}
