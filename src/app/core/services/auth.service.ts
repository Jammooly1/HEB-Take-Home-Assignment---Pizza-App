// Service to handle user authentication API calls
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Angular HTTP client for API requests
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // 👈 Import environment

const API_BASE = environment.apiBaseUrl; // 👈 Use API base URL from env

@Injectable({ providedIn: 'root' }) // Automatically provides service app-wide
export class AuthService {
  constructor(private http: HttpClient) {}

  // Sends login credentials to API endpoint /auth
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${API_BASE}/auth`, credentials); // POST request to authenticate user
  }
}
