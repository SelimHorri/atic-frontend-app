
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
export class CustomerProfileService {

  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/customers/profile`;
  }

  public getProfile(): Observable<any> {
    const clientPageRequest = new ClientPageRequest();
    clientPageRequest.sortBy?.push("startDate");
    clientPageRequest.sortDirection = "desc";
    return this.http.get<any>(`${this.apiUrl}`, {
      params: {
        offset: `${clientPageRequest?.offset}`,
        size: `${clientPageRequest?.size}`,
        sortBy: `${clientPageRequest?.sortBy?.join(`,`)}`,
        sortDirection: `${clientPageRequest?.sortDirection}`
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
  
  
  
}
