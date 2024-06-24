import { Injectable } from '@angular/core';
import { Contributor } from '../models/contributor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NewContributor } from '../models/dto/newContributor';
import { Auxiliary } from '../models/auxiliary';

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

  addContributorToCase(caseId: number, contributor: NewContributor): Observable<any> {
    return this.http.post<any>(`${this.host}/Case/${caseId}/addContributor`, contributor);
  }
  updateContributor(contributorId: number, contributor: Contributor): Observable<any> {
    const url = `${this.host}/Case/contributor/${contributorId}`;
    return this.http.put(url, contributor);
  }
  getContributorsByCaseId(caseId: number): Observable<any[]> {
    const url = `${this.host}/Case/${caseId}/contributors`; 
    return this.http.get<any[]>(url);
  }
  deleteContributor(caseId: number, contributorId: number): Observable<void> {
    const url = `${this.host}/Case/${caseId}/deleteContributor/${contributorId}`;
    return this.http.delete<void>(url);
  }
  
  getContributorById(idContributor: number): Observable<Contributor> {
    const url = `${this.host}/Case/contributor/${idContributor}`;
    return this.http.get<Contributor>(url);
  }
  getAuxiliaryByContributorId(contributorId: number): Observable<Auxiliary> {
    return this.http.get<Auxiliary>(`${this.host}/Auxiliary/contributor/${contributorId}`);
  }
}
