
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerReservationDetailService {
  
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/managers/reservations/details`;
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
  
  public getBeginEndTask(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${reservationId}/tasks/info/beginEnd`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.taskBegin.taskDate = moment(payload.responseBody?.taskBegin?.taskDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.taskBegin.startDate = moment(payload.responseBody?.taskBegin?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.taskBegin.endDate = moment(payload.responseBody?.taskBegin?.endDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.taskEnd.taskDate = moment(payload.responseBody?.taskEnd?.taskDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.taskEnd.startDate = moment(payload.responseBody?.taskEnd?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.taskEnd.endDate = moment(payload.responseBody?.taskEnd?.endDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      return payload;
    }));
  }
  
  
  
}
