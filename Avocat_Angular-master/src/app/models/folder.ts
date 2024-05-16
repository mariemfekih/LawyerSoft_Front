import { Case } from "./case";
import { FolderStatus } from "./type/folderStatus";

export class Folder {
    idFolder?: number;
    name: string;
    creationDate?: Date;
    status?: FolderStatus;
    caseInstance?: Case;

  }