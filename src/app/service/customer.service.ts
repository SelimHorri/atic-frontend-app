
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private API_URL: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.API_URL = `${this.API_URL}/customers`;
  }
  
  public findByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/username/${username}`, {
      headers: {
        'Authorization': `${sessionStorage.getItem(`jwtToken`)}`
      }
    });
  }
  
  
  
}












