import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Honoraire } from '../models/honoraire';

@Injectable({
  providedIn: 'root'
})
export class HonoraireService {

  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}

  listHonoraire(): Observable<Honoraire[]> {
    return this.http.get<Honoraire[]>(`${this.host}/Honoraire/retrieve-all-honoraires`);
  }

  addHonoraire(honoraire: Honoraire): Observable<Honoraire> {
    const url = `${this.host}/Honoraire/add-honoraire`;
    return this.http.post<Honoraire>(url, honoraire);
  }

  removeHonoraire(idHonoraire: number): Observable<void> {
    const url = `${this.host}/Honoraire/remove-honoraire/${idHonoraire}`;
    return this.http.delete<void>(url);
  }

  retrieveHonoraire(idHonoraire: number): Observable<Honoraire> {
    const url = `${this.host}/Honoraire/retrieve-honoraire/${idHonoraire}`;
    return this.http.get<Honoraire>(url);
  }

  updateHonoraire(honoraire: Honoraire): Observable<Honoraire> {
    const url = `${this.host}/Honoraire/update-honoraire`;
    return this.http.put<Honoraire>(url, honoraire);
  }

  generateQRCode(idHonoraire: number): Observable<any> {
    return this.http.get('http://localhost:8091/Honoraire/generateQRCodeForHonoraire/' + idHonoraire, { responseType: 'blob' });
  }

  addHonoraireAndAffectToAffaire(honoraire: Honoraire, affaireId: number): Observable<void> {
    const url = `${this.host}/Honoraire/addHonnoraireAndAffectToAffaire/${affaireId}`;
    return this.http.post<void>(url, honoraire);
  }

}
