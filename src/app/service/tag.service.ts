
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientPageRequest } from '../model/request/client-page-request';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/tags`;
  }
  
  public findAll(clientPageRequest: ClientPageRequest): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      params: {
        offset: `${clientPageRequest.offset}`,
        size: `${clientPageRequest.size}`
      }
    });
  }
  
  
  
}











