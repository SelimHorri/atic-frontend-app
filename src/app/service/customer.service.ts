
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateBackendFormat } from '../model/date-backend-format';
import { Reservation } from '../model/reservation';

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
  
  public getFavourites(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/favourites`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    })
    .pipe(map(res => {
      res.responseBody.customer.birthdate = new Date(res?.responseBody?.customer?.birthdate);
      res?.responseBody?.favourites?.content?.map((f: any) => 
            f.favouriteDate = moment(f?.favouriteDate, DateBackendFormat.LOCAL_DATE_TIME).toDate());
      return res;
    }));
  }
  
  public getReservations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservations`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((payload: any) => {
      payload.responseBody.customer.birthdate = new Date(payload?.responseBody?.customer?.birthdate);
      payload?.responseBody?.reservations?.content?.map((r: any) => {
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












