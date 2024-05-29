import { CourtType } from "../courtType";

export class CourtTypeTranslator {
    static translateFrType(type: CourtType): string {
      switch (type) {
        case CourtType.FIRST_INSTANCE:
          return 'Première Instance';
        case CourtType.REAL_ESTATE:
          return 'Immobilier';
        case CourtType.DISTRICT:
          return 'District';
        case CourtType.APPELLATE:
          return 'Cour d appel ';
        case CourtType.CASSATION:
          return 'Cour de Cassation';
        default:
          return 'Type inconnu';
      }
    }
  }
  