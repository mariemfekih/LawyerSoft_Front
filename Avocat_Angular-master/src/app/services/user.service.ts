import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { CustomHttpRespone } from '../models/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /*//Afficher liste des users
  public getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.host}/user/listUsers`);
  }*/

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/getUsers`);
  }

  addUser(newUser: User): Observable<User> {
    const url = `${this.host}/user/addUser`;
    return this.http.post<User>(url, newUser);
  }
  

  deleteUserByEmail(email: string): Observable<void> {
    const url = `${this.host}/user/deleteUser/${email}`;
    return this.http.delete<void>(url);
  }
  deleteUser(id: number): Observable<void> {
    const url = `${this.host}/user/deleteUser/${id}`;
    return this.http.delete<void>(url);
  }

  getUserById(idUser: number): Observable<User> {
    const url = `${this.host}/user/getUserById/${idUser}`;
    return this.http.get<User>(url);
  }

  updateUser(idUser: number, updatedUser: User): Observable<User> {
    const url = `${this.host}/user/updateUser/${idUser}`; // Include idUser in the URL
    return this.http.put<User>(url, updatedUser);
  }

  public resetPassword(email: string): Observable<any | HttpErrorResponse> {
    return this.http.get(`${this.host}/user/resetPassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,
    {reportProgress: true,
      observe: 'events'
    });
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[]  {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }

  findUserById(id: any):Observable<User> {
    return this.http.get<User>(`${this.host}/user/getUserById/${id}`)
  }

  public createUserFormData(loggedInUsername: string, user: User, profileImage: File): FormData  {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;

  }

}
