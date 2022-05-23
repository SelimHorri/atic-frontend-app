
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Saloon } from '../model/saloon';

@Injectable({
  providedIn: 'root'
})
export class SaloonService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/saloons`;
  }
  
  public findAllWithOffset(offset: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/offset/${offset}`)
        .pipe(map(payload => {
          payload?.responseBody?.forEach((s: Saloon) => s.openingDate = new Date(s?.openingDate));
          return payload;
        }));
  }
  
  public findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
        .pipe(map(res => {
          res.responseBody.openingDate = new Date(res?.responseBody?.openingDate);
          return res;
    }));
  }
  
  public findAllByCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/code/${code}`)
        .pipe(map((res: any) => {
          res?.responseBody?.forEach((s: Saloon) => s.openingDate = new Date(s?.openingDate));
          return res;
    }));
  }
  
  public findAllByLocationState(state: string, offset: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/locations/state/${state}?offset=${offset}`);
  }
  
  
  
}













