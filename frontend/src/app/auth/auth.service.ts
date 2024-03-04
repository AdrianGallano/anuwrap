import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl ='http://localhost/anuwrap/backend/public/api';
  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    // Send a POST request to your backend API to register the user
    return this.http.post<any>(`${this.apiUrl}/user`, FormData);
  }
  
  login(credentials: { email: string, password: string }): Observable<any> {
    // Send a POST request to your backend API to authenticate the user
    return this.http.post<any>('${this.apiUrl}/token', credentials);
  }
}
