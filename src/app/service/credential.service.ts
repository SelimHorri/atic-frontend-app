
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPayloadCredential } from '../model/response/api/api-payload-credential';
import { UserRoleBasedAuthority } from '../model/user-role-based-authority';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  
  private API_URL: string = environment.API_URL;
  
  constructor(private http: HttpClient) {
    this.API_URL = `${this.API_URL}/credentials/username`;
  }
  
  public findByUsername(username: string): Observable<ApiPayloadCredential> {
    return this.http.get<ApiPayloadCredential>(`${this.API_URL}/${username}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(`jwtToken`)}`
      }
    });
  }
  
  public getUserRole(userRole: string): string {
    if (userRole === UserRoleBasedAuthority.CUSTOMER)
      return userRole.trim().toLowerCase();
    else if (userRole === UserRoleBasedAuthority.WORKER)
      return userRole.trim().toLowerCase();
    else if (userRole === UserRoleBasedAuthority.MANAGER)
      return userRole.trim().toLowerCase();
    else if (userRole === UserRoleBasedAuthority.OWNER)
      return userRole.trim().toLowerCase();
    else 
      return "NONE";
  }
  
  
  
}










