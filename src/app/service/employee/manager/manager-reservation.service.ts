
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
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
  
  public getCompletedReservations(reservations: Reservation[]): Reservation[] {
    return reservations?.filter(r => r?.status === ReservationStatus.COMPLETED);
  }

  public getPendingReservations(reservations: Reservation[]): Reservation[] {
    return reservations?.filter(r => r?.status === ReservationStatus.NOT_STARTED
      || r?.status === ReservationStatus.IN_PROGRESS);
  }
  
  
  
}











