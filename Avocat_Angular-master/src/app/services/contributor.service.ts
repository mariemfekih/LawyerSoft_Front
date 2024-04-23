import { Injectable } from '@angular/core';
import { Contributor } from '../models/contributor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {
  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}
  /*
  addContributorToCase(caseId: number, contributor: Contributor): Observable<Contributor> {
    const url = `${this.host}/Case/${caseId}/addContributor`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Contributor>(url, contributor, { headers });
  }*/

  addContributorToCase(caseId: number, contributor: Contributor): Observable<any> {
    return this.http.post<any>(`${this.host}/Case/${caseId}/addContributor`, contributor);
  }

}
