
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { ReservationDetailRequest } from 'src/app/model/request/reservation-detail-request';
import { Reservation } from 'src/app/model/reservation';
import { ReservationStatus } from 'src/app/model/reservation-status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerReservationDetailService {
  
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/customers/reservations/details`;
  }
  
  public getReservationDetails(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${reservationId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    })
      .pipe(map(payload => {
        payload?.responseBody?.orderedDetails?.content?.map((o: any) =>
          o.orderedDate = moment(o?.orderedDate, DateBackendFormat.LOCAL_DATE_TIME).toDate());
        payload.responseBody.reservation.startDate = moment(payload?.responseBody?.reservation?.startDate,
          DateBackendFormat.LOCAL_DATE_TIME).toDate();
        payload.responseBody.reservation.cancelDate = moment(payload?.responseBody?.reservation?.cancelDate,
          DateBackendFormat.LOCAL_DATE_TIME).toDate();
        return payload;
      }));
  }

  public updateReservationDetails(reservationDetailRequest: ReservationDetailRequest): Observable<any> {
    reservationDetailRequest.description = reservationDetailRequest.description?.trim();
    return this.http.put<any>(`${this.apiUrl}`, reservationDetailRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}














