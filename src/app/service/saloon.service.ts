
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateBackendFormat } from '../model/date-backend-format';
import { ClientPageRequest } from '../model/request/client-page-request';
import { Saloon } from '../model/saloon';

@Injectable({
  providedIn: 'root'
})
export class SaloonService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/saloons`;
  }
  
  public findAll(clientPageRequest: ClientPageRequest): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      params: {
        offset: `${clientPageRequest.offset}`,
        size: `${clientPageRequest.size}`
      }
    })
    .pipe(map(payload => {
      payload?.responseBody?.content?.forEach((s: Saloon) => s.openingDate = moment(s?.openingDate, DateBackendFormat.LOCAL_DATE).toDate());
      return payload;
    }));
  }
  
  public findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
        .pipe(map(res => {
          res.responseBody.openingDate = moment(res?.responseBody?.openingDate, DateBackendFormat.LOCAL_DATE).toDate();
          return res;
    }));
  }
  
  public findAllByCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/code/${code}`)
        .pipe(map((res: any) => {
          res?.responseBody?.content?.forEach((s: Saloon) => s.openingDate = moment(s?.openingDate, DateBackendFormat.LOCAL_DATE).toDate());
          return res;
    }));
  }
  
  public findAllByLocationState(state: string, clientPageRequest: ClientPageRequest): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/locations/state/${state}`, {
      params: {
        offset: `${clientPageRequest?.offset}`,
        size: `${clientPageRequest?.size}`
      }
    });
  }
  
  
  
}













