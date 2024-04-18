import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dossier } from '../models/dossier';

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /* SERVICES DOSSIERS */

  listDossiers(): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(`${this.host}/list-dossiers`);
  }

  ajouterDossier(dossier: Dossier): Observable<void> {
    return this.http.post<void>(`${this.host}/ajouter-dossier`, dossier);
  }

  retrieveDossier(idDossier: number): Observable<Dossier> {
    return this.http.get<Dossier>(`${this.host}/retrieve-dossier/${idDossier}`);
  }

  getNomsDossiers(): Observable<string[]> {
    return this.http.get<string[]>(`${this.host}/get-noms-dossiers`);
  }

  getDossierById(idDossier: number) {
    return this.http.get(`${this.host}/getDossierById/${idDossier}`);
  }

  updateDossier(idDossier: number, dossier: any): Observable<any> {
    return this.http.put(`${this.host}/update-dossier/${idDossier}`, dossier);
  }

  deleteDossier(idDossier: number): Observable<void> {
    return this.http.delete<void>(`${this.host}/delete-dossier/${idDossier}`);
  }

  /*affecterDossierACourrier(nomDossier: string, numeroCourrier: string): Observable<void> {
    return this.http.put<void>(`${this.host}/affect-dossier-courrier/${nomDossier}/${numeroCourrier}`, null);
  }*/

  getPdfsByDossierId(idDossier: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/getPdfs/${idDossier}`);
  }

  getMiniaturesByDossierId(idDossier: number): Observable<string[]> {
    const url = `${this.host}/miniatures/${idDossier}`;
    return this.http.get<string[]>(url);
  }

  affecterDossierACourrier(nomDossier: string, numeroCourrier: string): Observable<void> {
    return this.http.put<void>(`${this.host}/affect-dossier-courrier/${nomDossier}/${numeroCourrier}`, null);
  }

  getThumbnail(filename: string): Observable<ArrayBuffer> {
    return this.http.get(`${this.host}/getThumbnail/${filename}`, { responseType: 'arraybuffer' });
  }
  


}
