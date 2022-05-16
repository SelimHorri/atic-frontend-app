
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderedDetail } from '../model/ordered-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderedDetailService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/ordered-details`;
  }
  
  /*
  public deleteOrderedServiceDetail(orderedDetail: OrderedDetail): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  */
  
  
  
}













