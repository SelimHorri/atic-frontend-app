
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { CredentialService } from 'src/app/service/credential.service';
import { ManagerServiceDetailService } from 'src/app/service/employee/manager/manager-service-detail.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-manager-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  
  public accountUrl!: string;
  public servicesDetails!: PageResponse;
  
  constructor(private credentialService: CredentialService,
    private managerServiceDetailService: ManagerServiceDetailService,
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getAll();
  }
  
  private getAll(): void {
    this.managerServiceDetailService.getAll().subscribe({
      next: (payload: any) => {
        this.servicesDetails = payload?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  
  
}











