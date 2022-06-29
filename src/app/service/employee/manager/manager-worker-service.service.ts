
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { Employee } from 'src/app/model/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerWorkerServiceService {
  
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/managers/workers`;
  }
  
  public getAllSubWorkers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.manager.birthdate = moment(payload?.responseBody?.manager?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.manager.hiredate = moment(payload?.responseBody?.manager?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.manager.saloon.openingDate = moment(payload?.responseBody?.manager?.saloon?.openingDate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.subWorkers?.content?.map((e: Employee) => {
        e.birthdate = moment(e?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
        e.hiredate = moment(e?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
        e.manager.birthdate = moment(e?.manager?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
        e.manager.hiredate = moment(e?.manager?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
        e.saloon.openingDate = moment(e?.saloon?.openingDate, DateBackendFormat.LOCAL_DATE).toDate();
      });
      return payload;
    }));;
  }
  
  public getWorkerInfo(workerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${workerId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.birthdate = moment(payload?.responseBody?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.hiredate = moment(payload?.responseBody?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.saloon.openingDate = moment(payload?.responseBody?.saloon?.openingDate, DateBackendFormat.LOCAL_DATE).toDate();
      return payload;
    }));
  }
  
  
  
}












