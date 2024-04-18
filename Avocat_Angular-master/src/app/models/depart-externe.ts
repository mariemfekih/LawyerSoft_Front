import { User } from "./user";
import { File } from "./file";

export class DepartExterneDto {

  numeroCourrier: string;
  dateCourrier: string;
  typeCourrier: string;
  expediteur: string;
  destinataire: string;
  degre: string;
  sujet: string;
  reponse: string;
  etatAvancement: string;
  user: User;
  file: File ;

  constructor(numeroCourrier: string,
              dateCourrier: string,
              typeCourrier: string,
              expediteur: string,
              destinataire: string,
              degre: string,
              sujet: string,
              reponse: string,
              etatAvancement: string,
              file: File
    ) {

      if (!/^01\d{4}$/.test(numeroCourrier)) {
        throw new Error('Le numéro de courrier doit commencer par "01" et avoir 6 chiffres ou caractères.');
      }
      this.numeroCourrier = this.formatNumeroCourrier(numeroCourrier);
      this.dateCourrier = dateCourrier;
      this.typeCourrier = typeCourrier;
      this.expediteur = expediteur;
      this.destinataire = destinataire;
      this.degre = degre;
      this.sujet = sujet;
      this.reponse = reponse;
      this.etatAvancement = etatAvancement;
      this.file = file;
    }

    private formatNumeroCourrier(numeroCourrier: string): string {
      const longueurTotale = 6;
      return numeroCourrier.padStart(longueurTotale, '0');
    }


}








