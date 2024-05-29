import { CaseState } from "../caseState";

export class CaseStateTranslator {
    static translateFrState(state: CaseState): string {
        switch (state) {
            case CaseState.INITIATED:
                return 'Initié';
            case CaseState.IN_PROGRESS:
                return 'En cours';
            case CaseState.FINISHED:
                return 'Fini';
            case CaseState.CLOSED:
                return 'Clôturé';
            default:
                return 'État inconnu';
        }
    }
}
