
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { WorkerProfileRequest } from 'src/app/model/request/worker-profile-request';
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
  
  public fetchProfile(): Observable<any> {
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
  
  public updateProfileInfo(workerProfileRequest: WorkerProfileRequest): Observable<any> {
    workerProfileRequest.authenticatedUsername = `${sessionStorage.getItem(`username`)}`;
    workerProfileRequest.firstname = workerProfileRequest?.firstname?.trim();
    workerProfileRequest.lastname = workerProfileRequest?.lastname?.trim();
    workerProfileRequest.email = workerProfileRequest?.email?.trim();
    workerProfileRequest.phone = workerProfileRequest?.phone?.trim();
    if (workerProfileRequest?.birthdate !== null
      && workerProfileRequest?.birthdate !== undefined
      && workerProfileRequest?.birthdate !== 'Invalid date')
      workerProfileRequest.birthdate = moment(moment(workerProfileRequest?.birthdate, 'yyyy-MM-DD').toDate())
        .format(DateBackendFormat.LOCAL_DATE);
    else
      workerProfileRequest.birthdate = null;
    if (workerProfileRequest?.hiredate !== null
      && workerProfileRequest?.hiredate !== undefined
      && workerProfileRequest?.hiredate !== 'Invalid date')
      workerProfileRequest.hiredate = moment(moment(workerProfileRequest?.hiredate, 'yyyy-MM-DD').toDate())
        .format(DateBackendFormat.LOCAL_DATE);
    else
      workerProfileRequest.hiredate = null;
    workerProfileRequest.username = workerProfileRequest?.username?.trim();
    return this.http.put<any>(`${this.apiUrl}`, workerProfileRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}












