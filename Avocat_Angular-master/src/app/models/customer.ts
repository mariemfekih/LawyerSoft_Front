import { Case } from "./case";

export class Customer {
    idCustomer: number;
    firstName: string;
    lastName: string;
    cin: string;
    email: string;
    city: string;
    phone: string;
    birthDate: Date;
    job: string;
    gender:boolean;
    cases: Case[];}