import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trial } from '../models/trial';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrialService {
  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}

  addTrialToCase(caseId: number, idCourt:number ,trial: Trial): Observable<any> {
    return this.http.post(`${this.host}/Trial/${caseId}/addTrial/${idCourt}`, trial);
  }

  updateTrial(idTrial: number, updatedTrial: Trial): Observable<Trial> {
    const url = `${this.host}/Trial/${idTrial}`; 
    return this.http.put<Trial>(url, updatedTrial);
  }
  deleteTrial(caseId: number, trialId: number): Observable<void> {
    const url = `${this.host}/Trial/${caseId}/deleteTrial/${trialId}`;
    return this.http.delete<void>(url);
  }
  getTrialsByCaseId(caseId: number): Observable<any[]> {
    const url = `${this.host}/Trial/${caseId}/getTrials`; 
    return this.http.get<any[]>(url);
  }
  
  getTrialById(idTrial: number): Observable<Trial> {
    const url = `${this.host}/Trial/${idTrial}`;
    return this.http.get<Trial>(url);
  }


}
