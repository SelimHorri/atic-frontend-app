
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPayloadServiceDetailsReservationContainerResponse } from '../model/response/api/api-payload-service-details-reservation-container-response';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/service-details`;
  }
  
  public getOrderedServiceDetailsByReservationId(reservationId: number): Observable<ApiPayloadServiceDetailsReservationContainerResponse> {
    return this.http.get<ApiPayloadServiceDetailsReservationContainerResponse>(`${this.apiUrl}/reservationId/${reservationId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}













