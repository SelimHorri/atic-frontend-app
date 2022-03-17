
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginRequest } from 'src/app/model/request/login-request';
import { ApiPayloadDExceptionMsg } from 'src/app/model/response/api/api-payload-d-exception-msg';
import { ApiPayloadLoginResponse } from 'src/app/model/response/api/api-payload-login-response';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  
  constructor(private authenticationService: AuthenticationService) {}
  
  ngOnInit(): void {
  }
  
  public onLogin(loginRequest: LoginRequest): void {
    this.authenticationService.authenticate(loginRequest).subscribe({
      next: (payload: ApiPayloadLoginResponse) => {
        alert(payload.responseBody.username + ": " + payload.responseBody.jwtToken);
      },
      error: (errorResponse: HttpErrorResponse) => {
        const payload: ApiPayloadDExceptionMsg = new ApiPayloadDExceptionMsg(errorResponse?.error);
        console.log(JSON.stringify(payload));
        alert(payload?.responseBody?.errorMsg);
      }
    });
  }
  
  
  
}








