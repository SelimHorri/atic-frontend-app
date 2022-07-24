
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/service-details`;
  }
  
  public fetchOrderedServiceDetails(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservationId/${reservationId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  public findAllByCategorySaloonId(saloonId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/saloonId/${saloonId}`);
  }
  
  
  
}













