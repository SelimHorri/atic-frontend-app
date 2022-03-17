
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
  
  public onLogin(ngForm: NgForm): void {
    const loginRequest: LoginRequest = ngForm.value;
    this.authenticationService.authenticate(loginRequest).subscribe({
      next: (apiPayloadLoginResponse: ApiPayloadLoginResponse) => {
        alert(apiPayloadLoginResponse.responseBody.username + ": " + apiPayloadLoginResponse.responseBody.jwtToken);
        ngForm.reset();
      },
      error: (errorResponse: HttpErrorResponse) => {
        const apiPayloadDExceptionMsg: ApiPayloadDExceptionMsg = new ApiPayloadDExceptionMsg(errorResponse?.error);
        console.log(JSON.stringify(apiPayloadDExceptionMsg));
        alert(apiPayloadDExceptionMsg?.responseBody?.errorMsg);
      }
    });
  }
  
  
  
}








