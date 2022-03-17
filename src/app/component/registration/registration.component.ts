
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterRequest } from 'src/app/model/request/register-request';
import { ApiPayloadDExceptionMsg } from 'src/app/model/response/api/api-payload-d-exception-msg';
import { ApiPayloadRegisterResponse } from 'src/app/model/response/api/api-payload-register-response';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  
  constructor(private registrationService: RegistrationService) {}
  
  ngOnInit(): void {
    
  }
  
  public onRegister(ngForm: NgForm): void {
    const registerRequest: RegisterRequest = ngForm.value;
    this.registrationService.register(registerRequest).subscribe({
      next: (payload: ApiPayloadRegisterResponse) => {
        alert(payload.responseBody.isSuccess + ": " + payload.responseBody.msg);
        ngForm.reset();
      },
      error: (errorResponse: HttpErrorResponse) => {
        const payload: ApiPayloadDExceptionMsg = new ApiPayloadDExceptionMsg(errorResponse?.error);
        console.log(JSON.stringify(payload));
        alert(payload?.responseBody?.errorMsg);
      }
    });
  }
  
  
  
}









