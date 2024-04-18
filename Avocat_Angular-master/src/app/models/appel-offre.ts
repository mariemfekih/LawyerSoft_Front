import { User } from "./user";

export class AppelOffreDto {

  numeroCourrier: string;
  dateCourrier: string;
  typeCourrier: string;
  parVoie: string;
  expediteur: string;
  numeroAO_CS: number;
  finDepot: string;
  degre: string;
  consultation: boolean;
  AO_International: boolean;
  sujet: string;
  etatAvancement: string;
  user: User;

  constructor(
    numeroCourrier: string,
    dateCourrier: string,
    typeCourrier: string,
    parVoie: string,
    expediteur: string,
    numeroAO_CS: number,
    finDepot: string,
    degre: string,
    consultation: boolean,
    AO_International: boolean,
    sujet: string,
    etatAvancement: string

  ) {
    if (!/^05\d{4}$/.test(numeroCourrier)) {
      throw new Error('Le numéro de courrier doit commencer par "05" et avoir 6 chiffres ou caractères.');
    }
    this.numeroCourrier = this.formatNumeroCourrier(numeroCourrier);
    this.dateCourrier = dateCourrier;
    this.typeCourrier = typeCourrier;
    this.parVoie = parVoie;
    this.expediteur = expediteur;
    this.numeroAO_CS = numeroAO_CS;
    this.finDepot = finDepot;
    this.degre = degre;
    this.consultation = consultation;
    this.AO_International = AO_International;
    this.sujet = sujet;
    this.etatAvancement = etatAvancement;
  }

  private formatNumeroCourrier(numeroCourrier: string): string {
    const longueurTotale = 6;
    return numeroCourrier.padStart(longueurTotale, '0');
  }

}
