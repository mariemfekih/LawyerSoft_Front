import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addAppointment(id: number, newAppointment: Appointment): Observable<Appointment> {
    const url = `${this.host}/CalendarApp/${id}`;
    return this.http.post<Appointment>(url, newAppointment);
  }

  deleteAppointment(idAppointment: number): Observable<void> {
    const url = `${this.host}/CalendarApp/${idAppointment}`;
    return this.http.delete<void>(url);
  }

  updateAppointment(idAppointment: number, updatedAppointment: Appointment): Observable<Appointment> {
    const url = `${this.host}/CalendarApp/${idAppointment}`;
    return this.http.put<Appointment>(url, updatedAppointment);
  }

  getAppointmentById(idAppointment: number): Observable<Appointment> {
    const url = `${this.host}/CalendarApp/${idAppointment}`;
    return this.http.get<Appointment>(url);
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.host}/CalendarApp`);
  }
}
