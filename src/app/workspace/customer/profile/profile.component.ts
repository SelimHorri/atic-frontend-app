
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPayloadCustomerProfileResponse } from 'src/app/model/response/api/api-payload-customer-profile-response';
import { ApiPayloadDExceptionMsg } from 'src/app/model/response/api/api-payload-d-exception-msg';
import { CustomerProfileResponse } from 'src/app/model/response/customer-profile-response';
import { CustomerService } from 'src/app/service/customer.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  public customerProfileResponse!: CustomerProfileResponse;
  
  constructor(private customerService: CustomerService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.findByUsername(`${sessionStorage.getItem(`username`)}`);
  }
  
  public findByUsername(username: string): void {
    this.customerService.findByUsername(username).subscribe({
      next: (responsePayload: ApiPayloadCustomerProfileResponse) => {
        this.customerProfileResponse = responsePayload?.responseBody;
        console.log(JSON.stringify(this.customerProfileResponse));
      },
      error: (errorResponse: HttpErrorResponse) => 
          this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  
  
}










