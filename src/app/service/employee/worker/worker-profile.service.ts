
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { Task } from 'src/app/model/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkerProfileService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/workers/profile`;
  }
  
  public getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      res.responseBody.worker.birthdate = moment(res?.responseBody?.worker?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      res.responseBody.worker.hiredate = moment(res?.responseBody?.worker?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      res.responseBody.tasks.content?.map((t: Task) => {
        t.taskDate = moment(t?.taskDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.startDate = moment(t?.startDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
        t.endDate = moment(t?.endDate, DateBackendFormat.LOCAL_DATE_TIME).toDate();
      });
      return res;
    }));
  }
  
  
  
}












