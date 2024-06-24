import { AppointmentType } from "../AppointmentType";

export class AppointmentTypeTranslator {
    static translateFrAppointment(app: AppointmentType): string {
        switch (app) {
            case AppointmentType.CONSULTATION:
                return 'Consultation';
            case AppointmentType.MEETING:
                return 'Réunion';
            case AppointmentType.TRIAL:
                return 'Audience';
            case AppointmentType.CONFERENCE:
                return 'Conference';
            case AppointmentType.PRISON_VISIT:
                return 'Visite en Prison';
            default:
                return 'État inconnu';
        }
    }
}
