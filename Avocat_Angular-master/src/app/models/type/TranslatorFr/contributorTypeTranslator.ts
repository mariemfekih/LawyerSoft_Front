import { ContributorType } from "../contributorType";

export class ContributorTypeTranslator {
    static translateFrType(type: ContributorType): string {
      switch (type) {
        case ContributorType.CUSTOMER:
          return 'Client';
        case ContributorType.JUDGE:
          return 'Juge';
        case ContributorType.JUDICIAL_OFFICER:
          return 'Officier judiciaire';
        case ContributorType.LEGAL_EXPERT:
          return 'Expert juridique';
        case ContributorType.DEFENDANT:
          return 'Défendeur';
        case ContributorType.PLAIGNANT:
          return 'Plaignant';
        case ContributorType.WITNESS:
          return 'Témoin';
        case ContributorType.REPORTER:
          return 'Rapporteur';
        case ContributorType.LEGAL_COUNSEL:
          return 'Conseiller juridique';
        case ContributorType.INVESTIGATING_JUDGE:
          return 'Juge d\'instruction';
        case ContributorType.LAWYER:
          return 'Avocat';
        default:
          return 'Type inconnu';
      }
    }
  }
  