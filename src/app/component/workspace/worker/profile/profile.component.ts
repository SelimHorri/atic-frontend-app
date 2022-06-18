
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerProfileRequest } from 'src/app/model/request/worker-profile-request';
import { WorkerProfileResponse } from 'src/app/model/response/worker-profile-response';
import { ToastrMsg } from 'src/app/model/toastr-msg';
import { CredentialService } from 'src/app/service/credential.service';
import { WorkerProfileService } from 'src/app/service/employee/worker/worker-profile.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  public accountUrl!: string;
  public workerProfileResponse!: WorkerProfileResponse;
  
  constructor(private workerProfileService: WorkerProfileService,
    private credentialService: CredentialService,
    private router: Router,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getProfile();
  }
  
  private getProfile(): void {
    this.workerProfileService.getProfile().subscribe({
      next: (responsePayload: any) => this.workerProfileResponse = responsePayload?.responseBody,
      error: (errorResponse: HttpErrorResponse) =>
          this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onProfileUpdate(workerProfileRequest: WorkerProfileRequest): void {
    this.workerProfileService.updateProfileInfo(workerProfileRequest).subscribe({
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











