
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerProfileInfoRequest } from 'src/app/model/request/customer-profile-info-request';
import { CustomerProfileResponse } from 'src/app/model/response/customer-profile-response';
import { ToastrMsg } from 'src/app/model/toastr-msg';
import { CredentialService } from 'src/app/service/credential.service';
import { CustomerProfileService } from 'src/app/service/customer/customer-profile.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  public accountUrl!: string;
  public customerProfileResponse!: CustomerProfileResponse;
  
  constructor(private customerProfileService: CustomerProfileService,
    private credentialService: CredentialService,
    private notificationService: NotificationService,
    private router: Router,
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
  
  public onProfileUpdate(customerProfileInfoRequest: CustomerProfileInfoRequest): void {
    this.customerProfileService.updateProfileInfo(customerProfileInfoRequest).subscribe({
      next: (responsePayload: any) => {
        this.notificationService.showSuccess(new ToastrMsg(`Infos has been updated successfully..`, `Updated!`));
        alert(`Please login again to continue!`);
        this.router.navigateByUrl(`/logout`);
      },
      error: (errorResponse: HttpErrorResponse) =>
          this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  
  
}










