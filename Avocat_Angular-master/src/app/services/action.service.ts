import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Action } from '../models/action';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}

  getActions(): Observable<Action[]> {
    console.log("getActions called");
    return this.http.get<Action[]>(`${this.host}/Action`);
  }
  
  addAction(newAction: Action): Observable<Action> {
    console.log("addAction called with data:", newAction);
    const url = `${this.host}/Action`;
    return this.http.post<Action>(url, newAction);
  }
  

  deleteAction(idAction: number): Observable<void> {
    const url = `${this.host}/Action/${idAction}`;
    return this.http.delete<void>(url);
  }

  getActionyById(idAction: number): Observable<Action> {
    const url = `${this.host}/Action/${idAction}`;
    return this.http.get<Action>(url);
  }

  updateAction(idAction: number, updatedAction: Action): Observable<Action> {
    const url = `${this.host}/Action/${idAction}`; 
    return this.http.put<Action>(url, updatedAction);
  }
}
