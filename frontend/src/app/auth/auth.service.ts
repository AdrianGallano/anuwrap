import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/anuwrap/backend/public/api';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, user);
  }
  
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token`, credentials).pipe(
      map(response => {
        this.tokenService.setToken(response.data.token);
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getUser(): Observable<any> {
    const token = this.tokenService.getToken();
    if (!token) {
      return throwError('Token not found. Please login first.');
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/user`, { headers });
  }
}
