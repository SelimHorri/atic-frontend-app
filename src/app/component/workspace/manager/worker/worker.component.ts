
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManagerWorkerInfoResponse } from 'src/app/model/response/manager-worker-info-response';
import { CredentialService } from 'src/app/service/credential.service';
import { ManagerWorkerServiceService } from 'src/app/service/employee/manager/manager-worker-service.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-manager-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  
  public accountUrl!: string;
  public managerWorkerInfoResponse!: ManagerWorkerInfoResponse;
  
  constructor(private credentialService: CredentialService,
    private managerWorkerService: ManagerWorkerServiceService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getAllSubWorkers();
  }
  
  private getAllSubWorkers(): void {
    this.managerWorkerService.getAllSubWorkers().subscribe({
      next: (payload: any) => {
        this.managerWorkerInfoResponse = payload?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  
  
}













