
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ServiceDetail } from 'src/app/model/service-detail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerServiceDetailService {
  
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/managers/service-details`;
  }
  
  public getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      return res;
    }));
  }
  
  public getById(serviceDetailId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${serviceDetailId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      return res;
    }));
  }
  
  
  
}











