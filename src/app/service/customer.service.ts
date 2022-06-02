
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateBackendFormat } from '../model/date-backend-format';
import { ClientPageRequest } from '../model/request/client-page-request';
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
    const clientPageRequest = new ClientPageRequest();
    return this.http.get<any>(`${this.apiUrl}/profile`, {
      params: {
        offset: `${clientPageRequest?.offset}`,
        size: `${clientPageRequest?.size}`
      },
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    })
    .pipe(
      map((res: any) => {
        res.responseBody.customer.birthdate = moment(res?.responseBody?.customer?.birthdate, 
              DateBackendFormat.LOCAL_DATE).toDate();
        return res;
      })
    );
  }
  
  public getFavourites(clientPageRequest: ClientPageRequest): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/favourites`, {
      params: {
        offset: `${clientPageRequest?.offset}`,
        size: `${clientPageRequest?.size}`
      },
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
  
  public getRatings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ratings`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  /*
  public addReservation(reservationRequest: Reservation): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservations`, reservationRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  */
  
  public deleteFavourite(saloonId: number): Observable<boolean> {
    return this.http.delete<any>(`${this.apiUrl}/favourites/${saloonId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}












