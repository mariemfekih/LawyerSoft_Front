import { CaseType } from "../caseType";

export class CaseTypeTranslator {
  static translateFrType(type: CaseType): string {
    switch (type) {
      case CaseType.CIVIL:
        return 'Civil';
      case CaseType.CRIMINAL:
        return 'Criminel';
      case CaseType.COMMERCIAL:
        return 'Commercial';
      case CaseType.ADMINISTRATIVE:
        return 'Administratif';
      case CaseType.SOCIAL:
        return 'Social';
      case CaseType.LABOR:
        return 'Travail';
      case CaseType.FAMILY:
        return 'Famille';
      case CaseType.LAND:
        return 'Foncier';
      case CaseType.CONSTITUTIONAL:
        return 'Constitutionnel';
      case CaseType.MILITARY:
        return 'Militaire';
      default:
        return 'Type inconnu'; 
    }
  }
}
