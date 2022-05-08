
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPayloadTaskList } from '../model/response/api/api-payload-task-list';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/tasks`;
  }
  
  public findAllByReservationId(reservationId: number): Observable<ApiPayloadTaskList> {
    return this.http.get<ApiPayloadTaskList>(`${this.apiUrl}/reservationId/${reservationId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}













