import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DepartExterneDto } from '../models/depart-externe';
import { Observable } from 'rxjs';
import { DepartInterneDto } from '../models/depart-interne';
import { ArriveeExterneDto } from '../models/arrivee-externe';
import { ArriveeAeroportDto } from '../models/arrivee-aeroport';
import { AppelOffreDto } from '../models/appel-offre';


@Injectable({
  providedIn: 'root'
})
export class CourrierService {

  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /* ALL */

  deleteCourrier(numeroCourrier: string): Observable<void> {
    return this.http.delete<void>(`${this.host}/delete-courrier/${numeroCourrier}`);
  }

  getCourrierByNumero(numeroCourrier: string): Observable<any> {
    return this.http.get(`${this.host}/get-courrier-by-numero/${numeroCourrier}`);
  }

  savePdf(pdfFile: File, numeroCourrier: string): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('pdfFile', pdfFile, pdfFile.name);

    return this.http.post<boolean>(`${this.host}/upload-pdf/${numeroCourrier}`, formData);
  }
  /* SERVICES DEPART EXTERNE */

  listDepartExterne(): Observable<DepartExterneDto[]> {
    return this.http.get<DepartExterneDto[]>(`${this.host}/list-courrier-depart-externe`);
  }

  addDepartExterne(departExterne: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('departExterneDto', JSON.stringify(departExterne));

    if (file) {
      formData.append('file', file);
    }
    const headers = new HttpHeaders();
    return this.http.post(`${this.host}/ajouter-courrier-depart-externe`, formData, { headers });
  }

  updateDepartExterne(numeroCourrier: string, departExterne: any, file: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('departExterneDto', JSON.stringify(departExterne));

    if (file) {
      formData.append('file', file);
    }

    const headers = new HttpHeaders();
    return this.http.put(`${this.host}/modifier-courrier-depart-externe/${numeroCourrier}`, formData, { headers });
  }

  /* SERVICES DEPART INTERNE */

  addDepartInterne(departInterne: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('departInterneDto', JSON.stringify(departInterne));

    if (file) {
      formData.append('file', file);
    }
    const headers = new HttpHeaders();
    return this.http.post(`${this.host}/ajouter-courrier-depart-interne`, formData, { headers });
  }

  listDepartInterne(): Observable<DepartInterneDto[]> {
    return this.http.get<DepartInterneDto[]>(`${this.host}/list-courrier-depart-interne`);
  }

  updateDepartInterne(numeroCourrier: string, departInterne: any, file: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('departInterneDto', JSON.stringify(departInterne));

    if (file) {
      formData.append('file', file);
    }

    const headers = new HttpHeaders();
    return this.http.put(`${this.host}/modifier-courrier-depart-interne/${numeroCourrier}`, formData, { headers });
  }

    /* SERVICES ARRIVEE EXTERNE */

    addArriveeExterne(arriveeExterne: any, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('arriveeExterneDto', JSON.stringify(arriveeExterne));

      if (file) {
        formData.append('file', file);
      }
      const headers = new HttpHeaders();
      return this.http.post(`${this.host}/ajouter-courrier-arrivee-externe`, formData, { headers });
    }

    listArriveeExterne(): Observable<ArriveeExterneDto[]> {
      return this.http.get<ArriveeExterneDto[]>(`${this.host}/list-courrier-arrivee-externe`);
    }

    updateArriveeExterne(numeroCourrier: string, arriveeExterne: any, file: File | null): Observable<any> {
      const formData = new FormData();
      formData.append('arriveeExterneDto', JSON.stringify(arriveeExterne));

      if (file) {
        formData.append('file', file);
      }

      const headers = new HttpHeaders();
      return this.http.put(`${this.host}/modifier-courrier-arrivee-externe/${numeroCourrier}`, formData, { headers });
    }

    /* SERVICES ARRIVEE AEROPORT */

    addArriveeAeroport(arriveeAeroport: any, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('arriveeAeroportDto', JSON.stringify(arriveeAeroport));

        if (file) {
          formData.append('file', file);
        }
        const headers = new HttpHeaders();
        return this.http.post(`${this.host}/ajouter-courrier-arrivee-aeroport`, formData, { headers });
   }

    listArriveeAeroport(): Observable<ArriveeAeroportDto[]> {
        return this.http.get<ArriveeAeroportDto[]>(`${this.host}/list-courrier-arrivee-aeroport`);
    }

    UpdateArriveeAeroport(numeroCourrier: string, arriveeAeroport: any, file: File | null): Observable<any> {
        const formData = new FormData();
        formData.append('arriveeAeroportDto', JSON.stringify(arriveeAeroport));

        if (file) {
          formData.append('file', file);
        }

        const headers = new HttpHeaders();
        return this.http.put(`${this.host}/modifier-courrier-arrivee-aeroport/${numeroCourrier}`, formData, { headers });
    }

     /* SERVICES APPEL D'OFFRE */

    addAppelOffre(appelOffreDto: AppelOffreDto): Observable<void> {
      return this.http.post<void>(`${this.host}/ajouter-appel-offre`, appelOffreDto);
    }

    listAppelOffre(): Observable<AppelOffreDto[]> {
      return this.http.get<AppelOffreDto[]>(`${this.host}/list-appel-offre`);
    }

    updateAppelOffre(numeroCourrier: string, appelOffreDto: AppelOffreDto): Observable<void> {
      return this.http.put<void>(`${this.host}/modifier-appel-offre/${numeroCourrier}`, appelOffreDto);
    }


   
}
