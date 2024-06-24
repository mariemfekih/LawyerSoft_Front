import { Court } from "./court";

export class Trial {
    idTrial: number;
    title:string;
    description:string;
    judgement:string;
    idCourt?:number;
    courtInstance?:Court;
    

}