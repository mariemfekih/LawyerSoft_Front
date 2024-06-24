import { Contributor } from "./contributor";

export class Auxiliary {
    idAuxiliary: number;
    firstName: string;
    lastName: string;
    cin?: string;
    email?: string;
    city?: string;
    phone?: string;
    birthDate?: Date;
    job?: string;
    gender?:boolean;

   // appointments: Appointment[];
    contributors?: Contributor[];
  }