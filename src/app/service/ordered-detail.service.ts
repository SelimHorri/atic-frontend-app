
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateBackendFormat } from '../model/date-backend-format';
import { OrderedDetailId } from '../model/ordered-detail-id';
import { OrderedDetailRequest } from '../model/request/ordered-detail-request';

@Injectable({
  providedIn: 'root'
})
export class OrderedDetailService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/ordered-details`;
  }
  
  public deleteOrderedServiceDetail(orderedDetailId: OrderedDetailId): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}`, {
      body: orderedDetailId,
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  public save(orderDetailRequest: OrderedDetailRequest): Observable<any> {
    orderDetailRequest.orderedDate = moment(Date.now()).format(DateBackendFormat.LOCAL_DATE_TIME);
    // console.log(JSON.stringify(orderDetailRequest))
    return this.http.post<any>(`${this.apiUrl}`, orderDetailRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  public findById(orderedDetailId: OrderedDetailId): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservationId/${orderedDetailId?.reservationId}/serviceDetailId/${orderedDetailId?.serviceDetailId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}













