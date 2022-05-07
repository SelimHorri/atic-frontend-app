
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPayloadCustomerProfileResponse } from '../model/response/api/api-payload-customer-profile-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private API_URL: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.API_URL = `${this.API_URL}/customers`;
  }
  
  public getProfile(): Observable<ApiPayloadCustomerProfileResponse> {
    return this.http.get<ApiPayloadCustomerProfileResponse>(`${this.API_URL}/profile`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    })
    .pipe(
      map((res: ApiPayloadCustomerProfileResponse) => {
        res.responseBody.customer.birthdate = new Date(res?.responseBody?.customer?.birthdate);
        /*
        res.responseBody.reservations?.map((r) => 
            r.startDate = new Date(formatDate(r.startDate, "dd-MM-yyyy__HH:mm:ss:SSSSSS", "en-US")));
        */
        return res;
      })
    );
  }
  
  public getFavourites(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/favourites`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}












