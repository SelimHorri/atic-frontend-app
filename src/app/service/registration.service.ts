
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateBackendFormat } from '../model/date-backend-format';
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
    if (registerRequest?.birthdate !== undefined && registerRequest?.birthdate !== null && registerRequest?.birthdate !== '')
      registerRequest.birthdate = moment(registerRequest.birthdate).format(DateBackendFormat.LOCAL_DATE);
    return this.http.post<any>(`${this.apiUrl}`, registerRequest);
  }
  
  
  
}










