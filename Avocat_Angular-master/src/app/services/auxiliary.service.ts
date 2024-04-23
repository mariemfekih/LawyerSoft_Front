import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auxiliary } from '../models/auxiliary';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryService {

  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}

  getAuxiliaries(): Observable<Auxiliary[]> {
    console.log("getAuxiliaries called");
    return this.http.get<Auxiliary[]>(`${this.host}/Auxiliary`);
  }
  
  addAuxiliary(newAuxiliary: Auxiliary): Observable<Auxiliary> {
    console.log("addAuxiliary called with data:", newAuxiliary);
    const url = `${this.host}/Auxiliary`;
    return this.http.post<Auxiliary>(url, newAuxiliary);
  }
  

  deleteAuxiliary(idAuxiliary: number): Observable<void> {
    const url = `${this.host}/Auxiliary/${idAuxiliary}`;
    return this.http.delete<void>(url);
  }

  getAuxiliaryById(idAuxiliary: number): Observable<Auxiliary> {
    const url = `${this.host}/Auxiliary/${idAuxiliary}`;
    return this.http.get<Auxiliary>(url);
  }

  updateAuxiliary(idAuxiliary: number, updatedAuxiliary: Auxiliary): Observable<Auxiliary> {
    const url = `${this.host}/Auxiliary/${idAuxiliary}`; 
    return this.http.put<Auxiliary>(url, updatedAuxiliary);
  }}
