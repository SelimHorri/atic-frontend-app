
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { Reservation } from 'src/app/model/reservation';
import { ReservationStatus } from 'src/app/model/reservation-status';
import { Task } from 'src/app/model/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkerReservationService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/workers/reservations`;
  }
  
  public getAllPagedReservations(clientPageRequest: ClientPageRequest): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paged`, {
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
      payload?.responseBody?.content?.forEach((t: Task) => {
        t.taskDate = moment(t?.taskDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.startDate = moment(t?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.endDate = moment(t?.endDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.reservation.startDate = moment(t?.reservation?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.reservation.cancelDate = moment(t?.reservation?.cancelDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      });
      return payload;
    }));
  }
  
  public getAllReservations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload?.responseBody?.content?.forEach((t: Task) => {
        t.taskDate = moment(t?.taskDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.startDate = moment(t?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.endDate = moment(t?.endDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.reservation.startDate = moment(t?.reservation?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.reservation.cancelDate = moment(t?.reservation?.cancelDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      });
      return payload;
    }));
  }
  
  public getCompletedReservations(reservations: Reservation[]): Reservation[] {
    return reservations?.filter(r => r?.status === ReservationStatus.COMPLETED);
  }

  public getPendingReservations(reservations: Reservation[]): Reservation[] {
    return reservations?.filter(r => r?.status === ReservationStatus.NOT_STARTED
      || r?.status === ReservationStatus.IN_PROGRESS);
  }
  
  public getReservationDetails(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/details/${reservationId}`, {
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
  
  
  
}














