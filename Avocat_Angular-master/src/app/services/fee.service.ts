import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fee } from '../models/fee';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getFees(): Observable<Fee[]> {
    console.log("getFees called");
    return this.http.get<Fee[]>(`${this.host}/Fee`);
  }
  addFee(fee: Fee, userId: number, customerId: number, actionIds: number[]): Observable<Fee> {
    if (!Array.isArray(actionIds)) {
      console.error('actionIds is not an array');
      return of(null);
    }
  
    const url = `${this.host}/Fee/${userId}/${customerId}`;
    const queryParams = actionIds.map(id => `actionIds=${id}`).join('&');
    const fullUrl = `${url}?${queryParams}`;
    return this.http.post<Fee>(fullUrl, fee );
  }
 /* addFee(newFee: Fee,userId:number,customerId: number, actionIds: number[]): Observable<Fee> {
    console.log("addFee called with data:", newFee);
    const url = `${this.host}/Fee/${userId}/${customerId}`;
    return this.http.post<Fee>(url, newFee);
  }*/

  deleteFee(idFee: number): Observable<void> {
    const url = `${this.host}/Fee/${idFee}`;
    return this.http.delete<void>(url);
  }

  getFeeyById(idFee: number): Observable<Fee> {
    const url = `${this.host}/Fee/${idFee}`;
    return this.http.get<Fee>(url);
  }

  updateFee(idFee: number, updatedFee: Fee): Observable<Fee> {
    const url = `${this.host}/Fee/${idFee}`; 
    return this.http.put<Fee>(url, updatedFee);
  }

  addAndAssignFeeToActions(fee: Fee, actionIds: number[]): Observable<Fee> {
    if (!Array.isArray(actionIds)) {
        console.error('actionIds is not an array');
        return of(null); 
    }

    const url = `${this.host}/Fee/assign-fee-to-actions`;
    const queryParams = actionIds.map(id => `actionIds=${id}`).join('&');
    const fullUrl = `${url}?${queryParams}`;
    return this.http.post<Fee>(fullUrl, fee);
}
}
