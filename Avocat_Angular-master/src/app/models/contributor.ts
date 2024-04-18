import { Auxiliary } from "./auxiliary";
import { Case } from "./case";
import { ContributorType } from "./type/contributorType";


export class Contributor {
  idContributor?: number; // Le ? indique que l'ID est facultatif, car il sera généré par le serveur
  type: ContributorType; 
  case: Case; //esmha cases and its not many cases
  auxiliary: Auxiliary;
  selectedAuxiliaryId?: number; 
}
