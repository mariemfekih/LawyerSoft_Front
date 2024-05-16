import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Case } from '../models/case';
import { NgForm } from '@angular/forms';
import { LocalDate,DateTimeFormatter } from 'js-joda';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}

  getCases(): Observable<Case[]> {
    return this.http.get<Case[]>(`${this.host}/Case`);
  }
  getUserCases(id: number): Observable<Case[]> {
    return this.http.get<Case[]>(`${this.host}/Case/user/${id}`);
  }
  getTotalCasesByUser(id: number): Observable<number> {
    return this.http.get<number>(`${this.host}/Case/user/${id}/total`);
  }
  getTotalCasesByUserMonth(id: number): Observable<number> {
    return this.http.get<number>(`${this.host}/Case/user/${id}/total-month`);
  }

  getPercentageChangeInTotalCasesByUser(userId: number): Observable<number> {
    const url = `${this.host}/Case/user/${userId}/percentage-change`;
    return this.http.get<number>(url);
  }
  addCase(newCase: Case ,id: number): Observable<Case> {
    const url = `${this.host}/Case/${id}`;
    return this.http.post<Case>(url, newCase);
  }
  

  deleteCase(idCase: number): Observable<void> {
    const url = `${this.host}/Case/${idCase}`;
    return this.http.delete<void>(url);
  }

  getCaseById(idCase: number): Observable<Case> {
    const url = `${this.host}/Case/${idCase}`;
    return this.http.get<Case>(url);
  }

  updateCase(idCase: number, updatedCase: Case): Observable<Case> {
    const url = `${this.host}/Case/${idCase}`; 
    return this.http.put<Case>(url, updatedCase);
  }
  getCasesWithoutFolders(): Observable<Case[]> {
    return this.http.get<Case[]>(`${this.host}/Case/withoutFolders`);
  } 




}
