
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryRequest } from 'src/app/model/request/category-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerCategoryService {
  
  private apiUrl: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${this.apiUrl}/employees/managers/categories`;
  }
  
  public fetchAll(): Observable<any> {
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
  
  public fetchById(categoryId: number): Observable<any> {
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
  
  public saveCategory(categoryRequest: CategoryRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, categoryRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
      return res;
    }));
  }
  
  public updateCategory(categoryRequest: CategoryRequest): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, categoryRequest, {
      headers: {
        UsernameAuth: `${sessionStorage.getItem(`username`)}`,
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`,
      }
    }).pipe(map((res: any) => {
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











