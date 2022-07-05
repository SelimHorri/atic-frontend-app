
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { CustomerProfileInfoRequest } from 'src/app/model/request/customer-profile-info-request';
import { Reservation } from 'src/app/model/reservation';
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
    clientPageRequest.sortBy?.push("createdAt");
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
        res.responseBody.customer.birthdate = moment(res?.responseBody?.customer?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
        res.responseBody.reservations.content?.map((r: Reservation) => {
          r.startDate = moment(r?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        });
        return res;
      })
    );
  }
  
  public updateProfileInfo(customerProfileInfoRequest: CustomerProfileInfoRequest): Observable<any> {
    
    customerProfileInfoRequest.authenticatedUsername = `${sessionStorage.getItem(`username`)}`;
    customerProfileInfoRequest.firstname = customerProfileInfoRequest?.firstname?.trim();
    customerProfileInfoRequest.lastname = customerProfileInfoRequest?.lastname?.trim();
    customerProfileInfoRequest.email = customerProfileInfoRequest?.email?.trim();
    customerProfileInfoRequest.phone = customerProfileInfoRequest?.phone?.trim();
    if (customerProfileInfoRequest?.birthdate !== null 
        && customerProfileInfoRequest?.birthdate !== undefined
        && customerProfileInfoRequest?.birthdate !== 'Invalid date')
      customerProfileInfoRequest.birthdate = moment(moment(customerProfileInfoRequest?.birthdate, 'yyyy-MM-DD').toDate())
          .format(DateBackendFormat.LOCAL_DATE);
    else
      customerProfileInfoRequest.birthdate = null;
    customerProfileInfoRequest.facebookUrl = customerProfileInfoRequest?.facebookUrl?.trim();
    customerProfileInfoRequest.instagramUrl = customerProfileInfoRequest?.instagramUrl?.trim();
    customerProfileInfoRequest.linkedinUrl = customerProfileInfoRequest?.linkedinUrl?.trim();
    customerProfileInfoRequest.username = customerProfileInfoRequest?.username?.trim();
    
    return this.http.put<any>(`${this.apiUrl}`, customerProfileInfoRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}
