import { CaseType } from '../models/type/caseType';
import { Contributor } from './contributor';
import { Trial } from './trial';

export class Case {
    idCase: number;
    creationDate: Date;
    closingDate: Date;
    title: string;
    description: string;
    type: CaseType;
    reference:string;
    trials: Trial[];
    //folders: Folder[];
    contributors: Contributor[];
   //users: User[];
}