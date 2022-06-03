
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateBackendFormat } from '../model/date-backend-format';
import { ReservationDetailRequest } from '../model/request/reservation-detail-request';
import { Reservation } from '../model/reservation';
import { ReservationStatus } from '../model/reservation-status';

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
  
  public findAllBySaloonId(saloonId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/saloonId/${saloonId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    })
    .pipe(map((payload: any) => {
      payload?.responseBody?.content?.map((r: any) => {
        r.startDate = moment(r?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        r.cancelDate = moment(r?.cancelDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      });
      return payload;
    }));
  }
  
  
  
}














