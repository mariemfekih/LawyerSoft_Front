import { Trial } from "./trial";
import { CourtType } from "./type/courtType";

export class Court {
    idCourt: number;
    governorate: string;
    municipality: string;
    adress: string;
    phone: string;
    type: CourtType;
    trials: Trial[];
  }