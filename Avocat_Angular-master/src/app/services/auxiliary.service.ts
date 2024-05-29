import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auxiliary } from '../models/auxiliary';
import { StringResult } from '../models/dto/stringResult';
import { Report } from '../models/dto/report';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryService {

  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}
  addAuxiliary(newAuxiliary: Auxiliary,id: number): Observable<Auxiliary> {
    console.log("addAuxiliary called with data:", newAuxiliary);
    const url = `${this.host}/Auxiliary/${id}`;
    return this.http.post<Auxiliary>(url, newAuxiliary);
  }

  deleteAuxiliary(idAuxiliary: number): Observable<void> {
    const url = `${this.host}/Auxiliary/${idAuxiliary}`;
    return this.http.delete<void>(url);
  }
  
  updateAuxiliary(idAuxiliary: number, updatedAuxiliary: Auxiliary): Observable<Auxiliary> {
    const url = `${this.host}/Auxiliary/${idAuxiliary}`; 
    return this.http.put<Auxiliary>(url, updatedAuxiliary);
  }
  getAuxiliaries(): Observable<Auxiliary[]> { //get tout les auxiliaires
    console.log("getAuxiliaries called");
    return this.http.get<Auxiliary[]>(`${this.host}/Auxiliary`);
  }
  getAuxiliariesByUserId(id: number): Observable<Auxiliary[]> { //get les auxiliaires d'un user
    return this.http.get<Auxiliary[]>(`${this.host}/Auxiliary/user/${id}`);
  }

  getAuxiliaryById(idAuxiliary: number): Observable<Auxiliary> {
    const url = `${this.host}/Auxiliary/${idAuxiliary}`;
    return this.http.get<Auxiliary>(url);
  }
  getTotalAuxiliariesByUser(id: number): Observable<number> {
    return this.http.get<number>(`${this.host}/Auxiliary/user/${id}/total`);
  }
printAuxiliary=(report:Report):Observable<StringResult>=>{
  const data = JSON.stringify(report);
  const url = `${this.host}/Auxiliary/printAuxiliary`;
  return this.http.post<StringResult>(url,data,{
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}
}
