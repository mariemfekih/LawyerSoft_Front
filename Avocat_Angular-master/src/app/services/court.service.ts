import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Court } from '../models/court';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourtService {
  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}

  getCourts(): Observable<Court[]> {
    return this.http.get<Court[]>(`${this.host}/Court`);
  }

  addCourt(newCourt: Court): Observable<Court> {
    const url = `${this.host}/Court`;
    return this.http.post<Court>(url, newCourt);
  }
  

  deleteCourt(idCourt: number): Observable<void> {
    const url = `${this.host}/Court/${idCourt}`;
    return this.http.delete<void>(url);
  }

  getCourtById(idCourt: number): Observable<Court> {
    const url = `${this.host}/Court/${idCourt}`;
    return this.http.get<Court>(url);
  }

  updateCourt(idCourt: number, updatedCourt: Court): Observable<Court> {
    const url = `${this.host}/Court/${idCourt}`; 
    return this.http.put<Court>(url, updatedCourt);
  }
}
