//import { Action } from "./Action";

import { Customer } from "./customer";
import { FeeType } from "./type/feeType";


export class Fee {
    idFee: number;
    reference: string;
    amount: number;
    date: string;  
   // type: FeeType;
    remain: string;
    userInstance?: any; 
    customer?:Customer; 
    idCustomer?:number;
   // fees: Action[];
  }