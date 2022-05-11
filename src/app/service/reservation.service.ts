
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../model/reservation';
import { ReservationStatus } from '../model/reservation-status';
import { ApiPayloadReservation } from '../model/response/api/api-payload-reservation';
import { ApiPayloadReservationContainerResponse } from '../model/response/api/api-payload-reservation-container-response';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/reservations`;
  }
  
  public findById(id: number): Observable<ApiPayloadReservation> {
    return this.http.get<ApiPayloadReservation>(`${this.apiUrl}/${id}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  public findByCode(code: string): Observable<ApiPayloadReservation> {
    return this.http.get<ApiPayloadReservation>(`${this.apiUrl}/code/${code}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  public getCompletedReservations(reservations: Reservation[]): Reservation[] {
    return reservations?.filter(r => r?.status === ReservationStatus.COMPLETED);
  }

  public getPendingReservations(reservations: Reservation[]): Reservation[] {
    return reservations?.filter(r => r?.status === ReservationStatus.NOT_STARTED 
        || r?.status === ReservationStatus.IN_PROGRESS);
  }
  
  public search(key: string): Reservation[] {
    return [];
  }
  
  public getReservationDetails(reservationId: number): Observable<ApiPayloadReservationContainerResponse> {
    return this.http.get<ApiPayloadReservationContainerResponse>(`${this.apiUrl}/details/${reservationId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}














