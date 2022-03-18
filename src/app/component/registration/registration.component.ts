
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
  
  public randomImgUrl!: string;
  
  constructor(private registrationService: RegistrationService) {}
  
  ngOnInit(): void {
    this.randomImgUrl = this.generateRandomImageUrl();
  }
  
  public generateRandomImageUrl(): string {
    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
    let randomNumber: number = Math.floor(Math.random() * numbers.length);
    if (randomNumber === 0)
      ++randomNumber;
    return `https://bootdey.com/img/Content/avatar/avatar${randomNumber}.png`;
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









