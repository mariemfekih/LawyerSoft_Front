import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}

  addCustomer(newCustomer: Customer,id: number): Observable<Customer> {
    console.log("addCustomer called with data:", newCustomer);
    const url = `${this.host}/Customer/${id}`;
    return this.http.post<Customer>(url, newCustomer);
  }

  deleteCustomer(idCustomer: number): Observable<void> {
    const url = `${this.host}/Customer/${idCustomer}`;
    return this.http.delete<void>(url);
  }
  
  updateCustomer(idCustomer: number, updatedCustomer: Customer): Observable<Customer> {
    const url = `${this.host}/Customer/${idCustomer}`; 
    return this.http.put<Customer>(url, updatedCustomer);
  }
  getCustomers(): Observable<Customer[]> { 
    console.log("getCustomers called");
    return this.http.get<Customer[]>(`${this.host}/Customer`);
  }
  getUserCustomers(id: number): Observable<Customer[]>{ 
    console.log("getCustomers called");
    return this.http.get<Customer[]>(`${this.host}/Customer/user/${id}`);  }

  getCustomerById(idCustomer: number): Observable<Customer> {
    const url = `${this.host}/Customer/${idCustomer}`;
    return this.http.get<Customer>(url);
  } 
  getCustomersWithoutFolders(id: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.host}/Customer/users/${id}/customers-without-folders`);
  } 
}
