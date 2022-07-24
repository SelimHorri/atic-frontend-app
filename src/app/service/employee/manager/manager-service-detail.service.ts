
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ServiceDetailRequest } from 'src/app/model/request/service-detail-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerServiceDetailService {
  
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/managers/service-details`;
  }
  
  public fetchAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      return res;
    }));
  }
  
  public fetchById(serviceDetailId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${serviceDetailId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      return res;
    }));
  }
  
  public saveServiceDetail(serviceDetailRequest: ServiceDetailRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, serviceDetailRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      return res;
    }));
  }
  
  public updateServiceDetail(serviceDetailRequest: ServiceDetailRequest): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, serviceDetailRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      return res;
    }));
  }
  
  public deleteServiceDetail(serviceDetailId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${serviceDetailId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      return res;
    }));
  }
  
  
  
}











