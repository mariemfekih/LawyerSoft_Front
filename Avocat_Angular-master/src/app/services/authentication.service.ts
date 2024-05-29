import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, catchError, map, tap, throwError} from 'rxjs';
import {User} from '../models/user';
import { RegisterResponse } from '../models/dto/RegisterResponse';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private currentUser: User;
  private useSubject = new BehaviorSubject<User | undefined>(undefined);

  private token: string;
  private tokenSubject = new BehaviorSubject<string | undefined>(undefined);

  public host: string = environment.apiUrl;
  
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.check();
  }

  public getCurrentUser(): Observable<User | undefined> {
    return this.useSubject.asObservable();
  }

  public check() {

    const storedToken: string | undefined = localStorage.getItem('jwt_token');
    const storedUser: User | undefined = JSON.parse(localStorage.getItem('current_user'));

    if(storedToken && storedUser) {
      this.currentUser = storedUser;
      this.useSubject.next(this.currentUser);
      this.token= storedToken;
      this.tokenSubject.next(this.token);
    }

  }


  public login(user: User): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.host}/user/login`, user, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.body) {
          this.currentUser = response.body!.user;
          this.useSubject.next(this.currentUser);
          this.token= response.body!.token;
          this.tokenSubject.next(this.token);
          localStorage.setItem('email', this.currentUser.email);
          localStorage.setItem('id', JSON.stringify(this.currentUser.id));
          localStorage.setItem('jwt_token', this.token);
          localStorage.setItem('current_user', JSON.stringify(this.currentUser));
        }
      })
    );
  }

 /* public register(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<{user: User, token: string}>(`${this.host}/user/register`, user).pipe(
      map(response => {
        // Extract user ID and token from the response
        const id = response.user.id;
        const email=response.user.email;
        const token = response.token;
        
        // Save them in local storage
        localStorage.setItem('id', id.toString());
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
        
        // Return the user part of the response
        return response.user;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle the error here if necessary
        return throwError(error);
      })
    );
  }*/

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
