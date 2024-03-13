import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/anuwrap/backend/public/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token`, credentials, { responseType: "json" });
  }

  editUserInformation(userData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authInfo[0]}`
      });
      return this.http.post<any>(`${this.apiUrl}/user/${userId}`, userData, { headers: headers });
    } else {
      return throwError('Unauthorized access');
    }
  }

  getUserInformation(): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authInfo[0]}`
      });
      return this.http.get<any>(`${this.apiUrl}/user/${userId}`, { headers: headers });
    } else {
      return throwError('Unauthorized access');
    }
  }

  getWorkspaces(): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/workspaces/${userId}`, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError(() => 'Unauthorized access');
    }
  }

  getWorkspace(workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      console.log("Route", workspaceId);
      return this.http.get<any>(`${this.apiUrl}/workspace/${workspaceId}`, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError(() => 'Unauthorized access');
    }
  }

  createWorkspace(workspaceData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/workspace`, workspaceData, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  editWorkspace(workspaceData: any, workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/workspace/${workspaceId}`, workspaceData, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  deleteWorkspace(workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/workspace/${workspaceId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error deleting workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getUserWorkspace(workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/workspace/${workspaceId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error deleting workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getReports(workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/reports/${workspaceId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getReport(reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/report/${reportId}`, { headers: headers }).pipe(
        catchError((error: any) => {

          return throwError(() => 'Error fetching report');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  deleteReport(reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/report/${reportId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error deleting workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getReportType(): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/reporttype`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }
}