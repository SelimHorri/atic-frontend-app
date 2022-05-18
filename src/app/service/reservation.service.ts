
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateBackendFormat } from '../model/date-backend-format';
import { Reservation } from '../model/reservation';
import { ReservationStatus } from '../model/reservation-status';
import { ApiPayloadReservation } from '../model/response/api/api-payload-reservation';
import { ApiPayloadReservationContainerResponse } from '../model/response/api/api-payload-reservation-container-response';
import { ReservationContainerResponse } from '../model/response/reservation-container-response';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/reservations`;
  }
  
  public findById(id: number): Observable<ApiPayloadReservation> {
    return this.http.get<ApiPayloadReservation>(`${this.apiUrl}/${id}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  public findByCode(code: string): Observable<ApiPayloadReservation> {
    return this.http.get<ApiPayloadReservation>(`${this.apiUrl}/code/${code}`, {
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
  
  public getReservationDetails(reservationId: number): Observable<ApiPayloadReservationContainerResponse> {
    return this.http.get<ApiPayloadReservationContainerResponse>(`${this.apiUrl}/details/${reservationId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    })
    .pipe(map(payload => {
      payload?.responseBody?.orderedDetails?.map(o => 
            o.orderedDate = moment(o?.orderedDate, DateBackendFormat.LOCAL_DATE_TIME).toDate());
      payload.responseBody.reservation.startDate = moment(payload?.responseBody?.reservation?.startDate, 
            DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.reservation.cancelDate = moment(payload?.responseBody?.reservation?.cancelDate,
            DateBackendFormat.LOCAL_DATE_TIME).toDate();
      return payload;
    }));
  }
  
  public updateReservationDetails(reservationDetailRequest: ReservationContainerResponse): Observable<any> {
    reservationDetailRequest.reservation.startDate = 
        formatDate(reservationDetailRequest?.reservation?.startDate, DateBackendFormat.LOCAL_DATE_TIME, "en-US");
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














