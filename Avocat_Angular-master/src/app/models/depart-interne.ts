import { User } from "./user";
import { File } from "./file";
import { Dossier } from "./dossier";

export class DepartInterneDto {

  numeroCourrier: string;
  dateCourrier: string;
  typeCourrier: string;
  reponse: string;
  parVoie: string;
  destinataire: string;
  degre: string;
  reponseExigee: boolean;
  sujet: string;
  etatAvancement: string;
  user: User;
  file: File ;
  dossier: Dossier;

  constructor(numeroCourrier: string,
              dateCourrier: string,
              typeCourrier: string,
              reponse: string,
              parVoie: string,
              destinataire: string,
              degre: string,
              reponseExigee: boolean,
              sujet: string,
              etatAvancement: string,
              file: File
    ) {

      if (!/^02\d{4}$/.test(numeroCourrier)) {
        throw new Error('Le numéro de courrier doit commencer par "02" et avoir 6 chiffres ou caractères.');
      }
      this.numeroCourrier = this.formatNumeroCourrier(numeroCourrier);
      this.dateCourrier = dateCourrier;
      this.typeCourrier = typeCourrier;
      this.reponse = reponse;
      this.parVoie = parVoie;
      this.destinataire = destinataire;
      this.degre = degre;
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








