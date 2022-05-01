
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPayloadCredential } from 'src/app/model/response/api/api-payload-credential';
import { ApiPayloadDExceptionMsg } from 'src/app/model/response/api/api-payload-d-exception-msg';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CredentialService } from 'src/app/service/credential.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  public accountUrl!: string;
  
  constructor(private authenticationService: AuthenticationService,
    private credentialService: CredentialService) {}
  
  ngOnInit(): void {
    this.getAccountUrl();
  }
  
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  
  public logout(): boolean {
    return this.authenticationService.logout();
  }
  
  private getAccountUrl(): void {
    
    if (this.authenticationService.isLoggedIn()) { // this check prevent jwt irrelevant exception on backend
      const username: string = `${sessionStorage.getItem("username")}`;

      this.credentialService.findByUsername(username).subscribe({
        next: (credentialPayload: ApiPayloadCredential) =>
          this.accountUrl = this.credentialService
            .getUserRole(credentialPayload.responseBody.userRoleBasedAuthority),
        error: (errorResponse: HttpErrorResponse) => {
          const errorCredentialPayload: ApiPayloadDExceptionMsg = new ApiPayloadDExceptionMsg(errorResponse?.error);
          console.log(JSON.stringify(errorCredentialPayload));
        }
      });
    }
    
  }
  
  
  
}











