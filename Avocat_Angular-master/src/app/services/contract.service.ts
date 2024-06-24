import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StringResult } from '../models/dto/stringResult';
import { Report } from '../models/dto/report';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  constructor(private http: HttpClient) { }
  public host: string = environment.apiUrl;

  generatePdf(contractData: any): Observable<string> {
    return this.http.post(`${this.host}/Case/pdf`, contractData, { responseType: 'text' });
  }
  uploadPdf(formData: FormData) {
    return this.http.post<any>(`${this.host}/File/addContract`, formData);
  }
 
}
