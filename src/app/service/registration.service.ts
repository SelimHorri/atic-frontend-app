
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from '../model/request/register-request';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/register`;
  }
  
  public register(registerRequest: RegisterRequest): Observable<any> {
    if (registerRequest.birthdate !== null && registerRequest.birthdate !== '')
      registerRequest.birthdate = formatDate(registerRequest?.birthdate, 'dd-MM-yyyy', 'en-US');
    return this.http.post<any>(`${this.apiUrl}`, registerRequest);
  }
  
  
  
}










