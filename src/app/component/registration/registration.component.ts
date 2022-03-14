
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  
  constructor(private registrationService: RegistrationService) { }
  
  ngOnInit(): void {
    this.register(new RegisterRequest(
      "selliiiiiim",
      "hoooooooooorrii",
      "cita.team.mail@gmail.com",
      "22125144",
      new Date("09-01-1995"),
      "seliimhorrii000000",
      "0000",
      "0000",
      "CUSTOMER"
    ));
  }
  
  public register(registerRequest: RegisterRequest): void {
    this.registrationService.register(registerRequest)
        .subscribe(
          (payload: ApiPayloadRegisterResponse) => {
            alert(payload.responseBody.isSuccess + ": " + payload.responseBody.msg);
          },
          (errorResponse: HttpErrorResponse) => {
            const apiPayloadDExceptionMsg: ApiPayloadDExceptionMsg = new ApiPayloadDExceptionMsg(errorResponse?.error);
            console.log(JSON.stringify(apiPayloadDExceptionMsg));
            alert(apiPayloadDExceptionMsg?.responseBody?.errorMsg);
          }
    );
  }
  
  
  
}










