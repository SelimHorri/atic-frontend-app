
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerCategoryService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/managers/categories`;
  }
  
  public getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      /*
      res?.responseBody?.map((c: Category) => {
        c.saloon.openingDate = moment(c?.saloon?.openingDate, DateBackendFormat.LOCAL_DATE).toDate();
      });
      */
      return res;
    }));
  }
  
  public getById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${categoryId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      // res.responseBody.saloon.openingDate = moment(res?.responseBody?.saloon?.openingDate, DateBackendFormat.LOCAL_DATE).toDate();
      return res;
    }));
  }
  
  public deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${categoryId}`, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    });
  }
  
  
  
}











