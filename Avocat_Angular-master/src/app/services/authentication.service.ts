import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private currentUser: User;
  public host: string = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}
  public login(user: User): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.host}/user/login`, user, { observe: 'response' }).pipe(
      tap((response: HttpResponse<User>) => {
        if (response.body) {
          this.currentUser = response.body;
          localStorage.setItem('email', this.currentUser.email);
        }
      })
    );
  }


  public register(user:User): Observable<User | HttpErrorResponse> {
    return this.http.post<User| HttpErrorResponse>
    (`${this.host}/user/register`, user);
  }

  public logout(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    localStorage.removeItem('username');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  /*public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      if (decodedToken.sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = decodedToken.sub;

          // Vérifiez si l'utilisateur a le rôle 'admin'
          if (decodedToken.roles && decodedToken.roles.includes('admin')) {
            return true;
          }
        }
      }
    }

    this.logout();
    return false;
  }*/

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || ''){
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }else {
      this.logout();
      return false;
    }
  }

  refreshUserData(userId: number): Observable<any> {
    const userUrl = `${this.host}/user/getUserById2/${userId}`;
    return this.http.get(userUrl);
  }



}
