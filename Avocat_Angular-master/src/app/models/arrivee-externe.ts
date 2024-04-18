import { User } from "./user";
import { File } from "./file";

export class ArriveeExterneDto {

  numeroCourrier: string;
  dateCourrier: string;
  typeCourrier: string;
  parVoie: string;
  lien: string;
  expediteur: string;
  numOrigine: number;
  dateOrigine: string;
  degre: string;
  reponse: string;
  reponseExigee: boolean;
  sujet: string;
  etatAvancement: string;
  user: User;
  file: File ;

  constructor(numeroCourrier: string,
              dateCourrier: string,
              typeCourrier: string,
              parVoie: string,
              lien: string,
              expediteur: string,
              numOrigine: number,
              dateOrigine: string,
              degre: string,
              reponse: string,
              reponseExigee: boolean,
              sujet: string,
              etatAvancement: string,
              file: File
    ) {

      if (!/^03\d{4}$/.test(numeroCourrier)) {
        throw new Error('Le numéro de courrier doit commencer par "03" et avoir 6 chiffres ou caractères.');
      }
      this.numeroCourrier = this.formatNumeroCourrier(numeroCourrier);
      this.dateCourrier = dateCourrier;
      this.typeCourrier = typeCourrier;
      this.parVoie = parVoie;
      this.lien = lien;
      this.expediteur = expediteur;
      this.numOrigine = numOrigine;
      this.dateOrigine = dateOrigine;
      this.degre = degre;
      this.reponse = reponse;
      this.reponseExigee = reponseExigee;
      this.sujet = sujet;
      this.etatAvancement = etatAvancement;
      this.file = file;

    }

    private formatNumeroCourrier(numeroCourrier: string): string {
      const longueurTotale = 6;
      return numeroCourrier.padStart(longueurTotale, '0');
    }


}
