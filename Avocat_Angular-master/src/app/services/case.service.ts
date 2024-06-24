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
  addCase(newCase: Case, userId: number, customerId: number): Observable<Case> {
    const url = `${this.host}/Case/user/${userId}/customer/${customerId}`;
    return this.http.post<Case>(url, newCase);
  }
  

  updateCase(idCase: number, updatedCase: Case): Observable<Case> {
    const url = `${this.host}/Case/${idCase}`; 
    return this.http.put<Case>(url, updatedCase);
  }
  deleteCase(idCase: number): Observable<void> {
    const url = `${this.host}/Case/${idCase}`;
    return this.http.delete<void>(url);
  }

  getCases(): Observable<Case[]> {
    return this.http.get<Case[]>(`${this.host}/Case`);
  }
  getUserCases(id: number): Observable<Case[]> {
    return this.http.get<Case[]>(`${this.host}/Case/user/${id}`);
  }
  getUserCasesWithoutFolder(id: number): Observable<Case[]> {
    return this.http.get<Case[]>(`${this.host}/Case/user/${id}/without-folder`);
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
 

  getCaseById(idCase: number): Observable<Case> {
    const url = `${this.host}/Case/${idCase}`;
    return this.http.get<Case>(url);
  }

  getCasesWithoutFolders(): Observable<Case[]> {
    return this.http.get<Case[]>(`${this.host}/Case/withoutFolders`);
  } 




}
