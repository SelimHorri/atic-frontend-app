
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateBackendFormat } from '../model/date-backend-format';
import { Reservation } from '../model/reservation';
import { ApiPayloadCustomerFavouriteResponse } from '../model/response/api/api-payload-customer-favourite-response';
import { ApiPayloadCustomerReservationResponse } from '../model/response/api/api-payload-customer-reservation-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/customers`;
  }
  
  public getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    })
    .pipe(
      map((res: any) => {
        res.responseBody.customer.birthdate = new Date(res?.responseBody?.customer?.birthdate);
        return res;
      })
    );
  }
  
  public getFavourites(): Observable<ApiPayloadCustomerFavouriteResponse> {
    return this.http.get<ApiPayloadCustomerFavouriteResponse>(`${this.apiUrl}/favourites`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    })
    .pipe(map(res => {
      res.responseBody.customer.birthdate = new Date(res?.responseBody?.customer?.birthdate);
      res?.responseBody?.favourites?.map(f => 
            f.favouriteDate = moment(f?.favouriteDate, DateBackendFormat.LOCAL_DATE_TIME).toDate());
      return res;
    }));
  }
  
  public getReservations(): Observable<ApiPayloadCustomerReservationResponse> {
    return this.http.get<ApiPayloadCustomerReservationResponse>(`${this.apiUrl}/reservations`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: ApiPayloadCustomerReservationResponse) => {
      payload.responseBody.customer.birthdate = new Date(payload?.responseBody?.customer?.birthdate);
      payload?.responseBody?.reservations?.map(r => {
        r.startDate = moment(r?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        r.cancelDate = moment(r?.cancelDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      });
      return payload;
    }));
  }
  
  public getRatings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ratings`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  public addReservation(reservationRequest: Reservation): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservations`, reservationRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  public deleteFavourite(saloonId: number): Observable<boolean> {
    return this.http.delete<any>(`${this.apiUrl}/favourites/${saloonId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}












