
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { Reservation } from 'src/app/model/reservation';
import { Task } from 'src/app/model/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerWorkerAssignmentService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/managers/workers/assignments`;
  }
  
  public getAllWorkerTasks(workerId: number, clientPageRequest: ClientPageRequest): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${workerId}`, {
      params: {
        offset: `${clientPageRequest?.offset}`,
        size: `${clientPageRequest?.size}`,
        sortDirection: `${clientPageRequest?.sortDirection}`,
        sortBy: `${clientPageRequest?.sortBy}`
      },
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.manager.birthdate = moment(payload?.responseBody?.manager?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.manager.hiredate = moment(payload?.responseBody?.manager?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.manager.saloon.openingDate = moment(payload?.responseBody?.manager?.saloon?.openingDate, DateBackendFormat.LOCAL_DATE).toDate();
      payload?.responseBody?.tasks?.content?.map((t: Task) => {
        t.taskDate = moment(t?.taskDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.startDate = moment(t?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.endDate = moment(t?.endDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.worker.birthdate = moment(t?.worker?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
        t.worker.hiredate = moment(t?.worker?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
        t.reservation.startDate = moment(t?.reservation?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.reservation.cancelDate = (!t?.reservation?.cancelDate) ? 
          t?.reservation?.cancelDate : moment(t?.reservation?.cancelDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      });
      return payload;
    }));
  }
  
  
  
}













