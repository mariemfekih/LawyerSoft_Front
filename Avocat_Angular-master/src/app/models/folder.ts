import { Case } from "./case";
import { Customer } from "./customer";
import { FolderStatus } from "./type/folderStatus";

export class Folder {
    idFolder?: number;
    name: string;
    path?:string;
    creationDate?: Date;
    status?: FolderStatus;
    caseInstance?: Case;
    customerInstance?: Customer;
    parentFolder?: Folder;
  }