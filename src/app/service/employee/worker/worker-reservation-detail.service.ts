
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { TaskBeginEndRequest } from 'src/app/model/request/task-begin-end-request';
import { TaskUpdateDescriptionRequest } from 'src/app/model/request/task-update-description-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkerReservationDetailService {
  
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/workers/reservations/details`;
  }
  
  public getReservationDetails(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${reservationId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map(payload => {
      payload?.responseBody?.orderedDetails?.content?.map((o: any) =>
        o.orderedDate = moment(o?.orderedDate, DateBackendFormat.LOCAL_DATE_TIME).toDate());
      payload.responseBody.reservation.startDate = moment(payload?.responseBody?.reservation?.startDate,
        DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.reservation.cancelDate = moment(payload?.responseBody?.reservation?.cancelDate,
        DateBackendFormat.LOCAL_DATE_TIME).toDate();
      return payload;
    }));
  }
  
  public getAssignedTask(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/${reservationId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.taskDate = moment(payload.responseBody?.taskDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.startDate = moment(payload.responseBody?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.endDate = moment(payload.responseBody?.endDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      return payload;
    }));
  }
  
  public updateDescription(reservationId: number, workerDescription: string | null | undefined): Observable<any> {
    const taskUpdateDescriptionRequest: TaskUpdateDescriptionRequest =
        new TaskBeginEndRequest(`${sessionStorage.getItem(`username`)}`, reservationId, workerDescription);
    taskUpdateDescriptionRequest.workerDescription = taskUpdateDescriptionRequest?.workerDescription?.trim();
    return this.http.put<any>(`${this.apiUrl}/tasks/describe`, taskUpdateDescriptionRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.taskDate = moment(payload.responseBody?.taskDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.startDate = moment(payload.responseBody?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.endDate = moment(payload.responseBody?.endDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      return payload;
    }));
  }
  
  public beginTask(reservationId: number, workerDescription: string | null | undefined): Observable<any> {
    const taskBeginRequest: TaskBeginEndRequest =
        new TaskBeginEndRequest(`${sessionStorage.getItem(`username`)}`, reservationId, workerDescription);
    taskBeginRequest.workerDescription = taskBeginRequest?.workerDescription?.trim();
    return this.http.put<any>(`${this.apiUrl}/tasks/begin`, taskBeginRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.taskDate = moment(payload.responseBody?.taskDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.startDate = moment(payload.responseBody?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.endDate = moment(payload.responseBody?.endDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      return payload;
    }));
  }
  
  public endTask(reservationId: number, workerDescription: string | null | undefined): Observable<any> {
    const taskEndRequest: TaskBeginEndRequest =
        new TaskBeginEndRequest(`${sessionStorage.getItem(`username`)}`, reservationId, workerDescription);
    taskEndRequest.workerDescription = taskEndRequest?.workerDescription?.trim();
    return this.http.put<any>(`${this.apiUrl}/tasks/end`, taskEndRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.taskDate = moment(payload.responseBody?.taskDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.startDate = moment(payload.responseBody?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.endDate = moment(payload.responseBody?.endDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      return payload;
    }));
  }
  
  
  
}














