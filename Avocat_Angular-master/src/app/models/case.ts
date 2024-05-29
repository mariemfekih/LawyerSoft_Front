import { CaseType } from '../models/type/caseType';
import { Contributor } from './contributor';
import { Trial } from './trial';
import { CaseState } from './type/caseState';

export class Case {
    idCase: number;
    creationDate: Date;
    closingDate: Date;
    title: string;
    description: string;
    type: CaseType;
    reference:string;
    state:CaseState;
    trials: Trial[];
    //folders: Folder[];
    contributors: Contributor[];
   //users: User[];
}