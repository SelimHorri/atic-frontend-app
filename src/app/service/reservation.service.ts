
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateBackendFormat } from '../model/date-backend-format';
import { ReservationDetailRequest } from '../model/request/reservation-detail-request';
import { Reservation } from '../model/reservation';
import { ReservationStatus } from '../model/reservation-status';
import { ReservationContainerResponse } from '../model/response/reservation-container-response';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/reservations`;
  }
  
  public findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  public findByCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/code/${code}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  public getCompletedReservations(reservations: Reservation[]): Reservation[] {
    return reservations?.filter(r => r?.status === ReservationStatus.COMPLETED);
  }

  public getPendingReservations(reservations: Reservation[]): Reservation[] {
    return reservations?.filter(r => r?.status === ReservationStatus.NOT_STARTED 
        || r?.status === ReservationStatus.IN_PROGRESS);
  }
  
  public search(key: string): Reservation[] {
    return [];
  }
  
  public getReservationDetails(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/details/${reservationId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    })
    .pipe(map(payload => {
      payload?.responseBody?.orderedDetails?.map((o: any) => 
            o.orderedDate = moment(o?.orderedDate, DateBackendFormat.LOCAL_DATE_TIME).toDate());
      payload.responseBody.reservation.startDate = moment(payload?.responseBody?.reservation?.startDate, 
            DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.reservation.cancelDate = moment(payload?.responseBody?.reservation?.cancelDate,
            DateBackendFormat.LOCAL_DATE_TIME).toDate();
      return payload;
    }));
  }
  
  public updateReservationDetails(reservationDetailRequest: ReservationDetailRequest): Observable<any> {
    console.log(JSON.stringify(reservationDetailRequest));
    return this.http.put<any>(`${this.apiUrl}/details`, reservationDetailRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  public cancelReservation(reservation: Reservation): Observable<any> {
    
    reservation.startDate = moment(reservation?.startDate).format(DateBackendFormat.LOCAL_DATE_TIME);
    reservation.cancelDate = moment(Date.now()).format(DateBackendFormat.LOCAL_DATE_TIME);
    reservation.status = ReservationStatus.CANCELLED;
    
    return this.http.put<any>(`${this.apiUrl}/cancel`, reservation, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    })
    .pipe(map((payload: any) => {
      payload.responseBody.startDate = moment(payload?.responseBody?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.cancelDate = moment(payload?.responseBody?.cancelDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
    }));
  }
  
  
  
}














