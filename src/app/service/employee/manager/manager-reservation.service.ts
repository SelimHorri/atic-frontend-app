
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { Employee } from 'src/app/model/employee';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { Reservation } from 'src/app/model/reservation';
import { ReservationStatus } from 'src/app/model/reservation-status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerReservationService {
  
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/managers/reservations`;
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
      payload.responseBody.manager.birthdate = moment(payload?.responseBody?.manager?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.manager.hiredate = moment(payload?.responseBody?.manager?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.reservations?.content?.map((r: Reservation) => {
        r.startDate = moment(r?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        r.cancelDate = moment(r?.cancelDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
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
      payload.responseBody.manager.birthdate = moment(payload?.responseBody?.manager?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.manager.hiredate = moment(payload?.responseBody?.manager?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.reservations?.content?.map((r: Reservation) => {
        r.startDate = moment(r?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        r.cancelDate = moment(r?.cancelDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      });
      return payload;
    }));
  }
  
  public searchAllByKey(key: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/${key.toLowerCase()}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.manager.birthdate = moment(payload?.responseBody?.manager?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.manager.hiredate = moment(payload?.responseBody?.manager?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.reservations?.content?.map((r: Reservation) => {
        r.startDate = moment(r?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        r.cancelDate = moment(r?.cancelDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
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
  
  public cancelReservation(reservationId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cancel/${reservationId}`, null, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.startDate = moment(payload?.responseBody?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.cancelDate = moment(payload?.responseBody?.cancelDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
    }));
  }
  
  public getAllUnassignedSubWorkers(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${reservationId}/unassigned`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.reservation.startDate = moment(payload?.responseBody?.reservation?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.reservation.cancelDate = moment(payload?.responseBody?.reservation?.cancelDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      payload.responseBody.reservation.customer.birthdate = moment(payload?.responseBody?.reservation?.customer?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.reservation.saloon.openingDate = moment(payload?.responseBody?.reservation?.saloon?.openingDate, DateBackendFormat.LOCAL_DATE).toDate();
      payload.responseBody.subWorkers?.content?.map((e: Employee) => {
        e.birthdate = moment(e?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
        e.hiredate = moment(e?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
        e.manager.birthdate = moment(e?.manager?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
        e.manager.hiredate = moment(e?.manager?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
        e.saloon.openingDate = moment(e?.saloon?.openingDate, DateBackendFormat.LOCAL_DATE).toDate();
      });
      return payload;
    }));
  }
  
  
  
}












