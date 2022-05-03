
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  
  public findByUsername(username: string): Observable<ApiPayloadCustomerProfileResponse> {
    return this.http.get<ApiPayloadCustomerProfileResponse>(`${this.API_URL}/profile/username/${username}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`
      }
    });
  }
  
  
  
}












