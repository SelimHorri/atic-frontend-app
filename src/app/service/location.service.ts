
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/locations`;
  }
  
  public findAll(offset: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}`);
  }
  
  public findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  /*
  public findAllByCity(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${city}`);
  }
  */
  
  
  
}













