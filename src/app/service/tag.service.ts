
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/tags/offset`;
  }
  
  public findAll(offset: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${offset}`);
  }
  
  
  
}











