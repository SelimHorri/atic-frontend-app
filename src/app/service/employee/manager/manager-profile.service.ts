
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { ManagerProfileRequest } from 'src/app/model/request/manager-profile-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerProfileService {
  
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/managers/profile`;
  }

  public getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      res.responseBody.manager.birthdate = moment(res?.responseBody?.manager?.birthdate, DateBackendFormat.LOCAL_DATE).toDate();
      res.responseBody.manager.hiredate = moment(res?.responseBody?.manager?.hiredate, DateBackendFormat.LOCAL_DATE).toDate();
      return res;
    }));
  }

  public updateProfileInfo(managerProfileRequest: ManagerProfileRequest): Observable<any> {
    managerProfileRequest.authenticatedUsername = `${sessionStorage.getItem(`username`)}`;
    managerProfileRequest.firstname = managerProfileRequest?.firstname?.trim();
    managerProfileRequest.lastname = managerProfileRequest?.lastname?.trim();
    managerProfileRequest.email = managerProfileRequest?.email?.trim();
    managerProfileRequest.phone = managerProfileRequest?.phone?.trim();
    if (managerProfileRequest?.birthdate !== null
      && managerProfileRequest?.birthdate !== undefined
      && managerProfileRequest?.birthdate !== 'Invalid date')
      managerProfileRequest.birthdate = moment(moment(managerProfileRequest?.birthdate, 'yyyy-MM-DD').toDate())
        .format(DateBackendFormat.LOCAL_DATE);
    else
      managerProfileRequest.birthdate = null;
    if (managerProfileRequest?.hiredate !== null
      && managerProfileRequest?.hiredate !== undefined
      && managerProfileRequest?.hiredate !== 'Invalid date')
      managerProfileRequest.hiredate = moment(moment(managerProfileRequest?.hiredate, 'yyyy-MM-DD').toDate())
        .format(DateBackendFormat.LOCAL_DATE);
    else
      managerProfileRequest.hiredate = null;
    managerProfileRequest.username = managerProfileRequest?.username?.trim();
    return this.http.put<any>(`${this.apiUrl}`, managerProfileRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}
