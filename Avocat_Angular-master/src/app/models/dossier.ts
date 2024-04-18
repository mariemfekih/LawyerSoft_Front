import { Courrier } from "./courrier";

export class Dossier {
    idDossier: number;
    nomDossier: string;
    etatDossier: string;
    courriers: Courrier[];
    courriersCount: number;
  }
