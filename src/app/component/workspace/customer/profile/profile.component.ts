
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerProfileResponse } from 'src/app/model/response/customer-profile-response';
import { CredentialService } from 'src/app/service/credential.service';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerProfileService } from 'src/app/service/customer/customer-profile.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  public accountUrl!: string;
  public customerProfileResponse!: CustomerProfileResponse;
  
  constructor(private customerProfileService: CustomerProfileService,
    private credentialService: CredentialService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.getProfile();
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem(`userRole`)}`);
  }
  
  public getProfile(): void {
    this.customerProfileService.getProfile().subscribe({
      next: (responsePayload: any) => {
        this.customerProfileResponse = responsePayload?.responseBody;
        console.log(JSON.stringify(this.customerProfileResponse));
      },
      error: (errorResponse: HttpErrorResponse) => 
          this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  
  
}










