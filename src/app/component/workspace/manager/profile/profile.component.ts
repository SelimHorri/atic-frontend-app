
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerProfileRequest } from 'src/app/model/request/manager-profile-request';
import { ManagerProfileResponse } from 'src/app/model/response/manager-profile-response';
import { ToastrMsg } from 'src/app/model/toastr-msg';
import { CredentialService } from 'src/app/service/credential.service';
import { ManagerProfileService } from 'src/app/service/employee/manager/manager-profile.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  public accountUrl!: string;
  public managerProfileResponse!: ManagerProfileResponse;

  constructor(private managerProfileService: ManagerProfileService,
    private credentialService: CredentialService,
    private router: Router,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.fetchProfile();
  }

  private fetchProfile(): void {
    this.managerProfileService.fetchProfile().subscribe({
      next: (responsePayload: any) => this.managerProfileResponse = responsePayload?.responseBody,
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }

  public onProfileUpdate(managerProfileRequest: ManagerProfileRequest): void {
    this.managerProfileService.updateProfileInfo(managerProfileRequest).subscribe({
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











