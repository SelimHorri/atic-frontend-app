
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WorkerProfileResponse } from 'src/app/model/response/worker-profile-response';
import { CredentialService } from 'src/app/service/credential.service';
import { WorkerProfileService } from 'src/app/service/employee/worker/worker-profile.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

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
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getProfile();
  }
  
  public getProfile(): void {
    this.workerProfileService.getProfile().subscribe({
      next: (responsePayload: any) => this.workerProfileResponse = responsePayload?.responseBody,
      error: (errorResponse: HttpErrorResponse) =>
          this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onProfileUpdate(ngForm: NgForm): void {
    
  }
  
  
  
}











