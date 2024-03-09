import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
        const token = response.token;
        if (token) {
          this.tokenService.setToken(token);
        }
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getUserById(userId: number): Observable<any> {
    const token = this.tokenService.getToken();
    if (!token) {
      return throwError('Token not found. Please login first.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getUserInformation(userId: number): Observable<any> {
    const token = this.tokenService.getToken();
    if (!token) {
      return throwError('Token not found. Please login first.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
  

  getUserIdFromToken(): number | null {
    const token = this.tokenService.getToken();
    if (token) {
      // Decode the token to extract user ID
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload && tokenPayload.user_id ? tokenPayload.user_id : null;
    }
    return null;
}

}