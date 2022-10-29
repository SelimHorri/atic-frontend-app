
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateBackendFormat } from '../model/date-backend-format';
import { Employee } from '../model/employee';
import { UserRoleBasedAuthority } from '../model/user-role-based-authority';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees`;
  }
  
  public findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.birthdate = moment(payload?.responseBody?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      if (payload?.credential?.role !== UserRoleBasedAuthority.CUSTOMER)
        payload.responseBody.hiredate = moment(payload?.responseBody?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      return payload;
    }));
  }
  
  public findByIdentifier(identifier: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/identifier/${identifier}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.birthdate = moment(payload?.responseBody?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      if (payload?.credential?.role !== UserRoleBasedAuthority.CUSTOMER)
        payload.responseBody.hiredate = moment(payload?.responseBody?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      return payload;
    }));
  }
  
  public findByCredentialUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/username/${username}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.birthdate = moment(payload?.responseBody?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      if (payload?.credential?.role !== UserRoleBasedAuthority.CUSTOMER)
        payload.responseBody.hiredate = moment(payload?.responseBody?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      return payload;
    }));
  }
  
  public findAllBySsn(ssn: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ssn/${ssn}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.map((e: Employee) => {
        e.birthdate = moment(e?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
        if (e?.credential?.role !== UserRoleBasedAuthority.CUSTOMER)
          e.hiredate = moment(e?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      });
      return payload;
    }));
  }
  
  
  
}











