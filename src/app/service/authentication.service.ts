
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../model/request/login-request';
import { ApiPayloadLoginResponse } from '../model/response/api/api-payload-login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/authenticate`;
  }
  
  public authenticate(loginRequest: LoginRequest): Observable<ApiPayloadLoginResponse> {
    return this.http.post<ApiPayloadLoginResponse>(`${this.apiUrl}`, loginRequest);
  }
  
  public isLoggedIn(): boolean {
    return !(sessionStorage.getItem("jwtToken") === null);
  }

  public logout(): boolean {
    if (sessionStorage.getItem("jwtToken") !== null) {
      sessionStorage.clear();
      return true;
    }
    return false;
  }
  
  
  
}












