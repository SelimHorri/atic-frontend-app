
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/categories`;
  }
  
  public findAllBySaloonId(saloonId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${saloonId}`);
  }
  
  
  
}










