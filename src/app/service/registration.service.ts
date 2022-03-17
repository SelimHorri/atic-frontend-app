
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from '../model/request/register-request';
import { ApiPayloadRegisterResponse } from '../model/response/api/api-payload-register-response';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/register`;
  }
  
  public register(registerRequest: RegisterRequest): Observable<ApiPayloadRegisterResponse> {
    return this.http.post<ApiPayloadRegisterResponse>(`${this.apiUrl}`, registerRequest);
  }
  
  
  
}










