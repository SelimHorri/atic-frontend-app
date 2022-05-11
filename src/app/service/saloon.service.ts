
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPayloadSaloonList } from '../model/response/api/api-payload-saloon-list';

@Injectable({
  providedIn: 'root'
})
export class SaloonService {
  
  private API_URL: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.API_URL = `${this.API_URL}/saloons`;
  }
  
  public findAllWithOffset(offset: number): Observable<ApiPayloadSaloonList> {
    return this.http.get<ApiPayloadSaloonList>(`${this.API_URL}/offset/${offset}`);
  }
  
  
  
}













