import { AppointmentType } from "./type/AppointmentType";
import { LocationType } from "./type/LocationType";

export class Appointment {
    idAppointment: number;
    title: string;
    description: string;
    startTime: string; // "HH:mm:ss"
    endTime: string; // "HH:mm:ss"
    date: string; // "yyyy-MM-dd"
    type: AppointmentType;
    linkHangout: string;
    location: LocationType;

}
