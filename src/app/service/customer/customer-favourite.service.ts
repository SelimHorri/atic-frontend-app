
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerFavouriteService {
  
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/customers/favourites`;
  }
  
  public getFavourites(clientPageRequest: ClientPageRequest): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
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
  
  public deleteFavourite(saloonId: number): Observable<boolean> {
    return this.http.delete<any>(`${this.apiUrl}/${saloonId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}
