import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Case } from '../models/case';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}

  getCases(): Observable<Case[]> {
    return this.http.get<Case[]>(`${this.host}/Case/getCases`);
  }

  addCase(newCase: Case): Observable<Case> {
    const url = `${this.host}/Case/addCase`;
    return this.http.post<Case>(url, newCase);
  }
  

  deleteCase(idCase: number): Observable<void> {
    const url = `${this.host}/Case/deleteCase/${idCase}`;
    return this.http.delete<void>(url);
  }

  getCaseById(idCase: number): Observable<Case> {
    const url = `${this.host}/Case/getCaseById/${idCase}`;
    return this.http.get<Case>(url);
  }

  updateCase(idCase: number, updatedCase: Case): Observable<Case> {
    const url = `${this.host}/Case/updateCase/${idCase}`; // Include idCase in the URL
    return this.http.put<Case>(url, updatedCase);
  }
  




}
