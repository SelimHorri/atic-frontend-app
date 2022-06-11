
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerProfileResponse } from 'src/app/model/response/customer-profile-response';
import { CredentialService } from 'src/app/service/credential.service';
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
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem(`userRole`)}`);
    this.getProfile();
  }
  
  public getProfile(): void {
    this.customerProfileService.getProfile().subscribe({
      next: (responsePayload: any) => {
        this.customerProfileResponse = responsePayload?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) => 
          this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  
  
}










