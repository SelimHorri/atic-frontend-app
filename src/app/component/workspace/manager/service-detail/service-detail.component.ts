
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { ServiceDetail } from 'src/app/model/service-detail';
import { ToastrMsg } from 'src/app/model/toastr-msg';
import { CategoryService } from 'src/app/service/category.service';
import { CredentialService } from 'src/app/service/credential.service';
import { ManagerServiceDetailService } from 'src/app/service/employee/manager/manager-service-detail.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-manager-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  
  public accountUrl!: string;
  public serviceDetails!: PageResponse;
  public serviceDetail!: ServiceDetail;
  public categories: Category[] = [];
  
  constructor(private credentialService: CredentialService,
    private managerServiceDetailService: ManagerServiceDetailService,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getAll();
  }
  
  private getAll(): void {
    this.managerServiceDetailService.getAll().subscribe({
      next: (payload: any) => {
        this.serviceDetails = payload?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onDisplayUpdate(serviceDetail: ServiceDetail): void {
    this.categoryService.findAllBySaloonId(serviceDetail?.category?.id).subscribe({
      next: (categoryPayload: any) => {
        this.onOpenModal('updateServiceDetail');
        this.serviceDetail = serviceDetail;
        this.categories = categoryPayload?.responseBody?.content;
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onUpdate(ngForm: NgForm): void {
    console.log(JSON.stringify(ngForm.value));
  }

  public onDelete(serviceDetailId: number): void {
    if (confirm(`Deleting service will delete all sub services!\nDo you confirm ?`))
      this.managerServiceDetailService.deleteServiceDetail(serviceDetailId).subscribe({
        next: (payload: any) => {
          if (payload?.responseBody && payload?.responseBody === false)
            this.notificationService.showInfo(new ToastrMsg(`Not able to delete this service`, `Not Successfull!`));
          else {
            this.getAll();
            this.notificationService.showSuccess(new ToastrMsg(`Service has been deleted successfully..`, `Removed!`));
          }
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.errorHandlerService.extractExceptionMsg(errorResponse)
      });
  }
  
  public onOpenModal(action: string): void {
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");

    if (action === "updateServiceDetail")
      button.setAttribute("data-bs-target", "#updateServiceDetail");

    const mainContainer = document.getElementById("main-container");
    mainContainer?.appendChild(button);
    button.click();
  }

  public searchBy(key: string): void {
    const res: ServiceDetail[] = [];
    this.serviceDetails?.content.forEach((sd: ServiceDetail) => {
      if (sd?.name?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1
          || sd?.name?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1
          || sd?.isAvailable?.toString()?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1
          || sd?.duration?.toString()?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1
          || `${sd?.duration?.toString()} min`.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1
          || sd?.priceUnit?.toString()?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1
          || `${sd?.priceUnit?.toString()} DT`.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1
          || sd?.category?.name?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1)
        res.push(sd);
    });
    this.serviceDetails.content = res;
    if (!key)
      this.getAll();
  }
  
  
  
}











