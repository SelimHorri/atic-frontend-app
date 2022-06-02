
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { Saloon } from 'src/app/model/saloon';
import { ServiceDetail } from 'src/app/model/service-detail';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { SaloonService } from 'src/app/service/saloon.service';
import { ServiceDetailService } from 'src/app/service/service-detail.service';

@Component({
  selector: 'app-saloon-detail',
  templateUrl: './saloon-detail.component.html',
  styleUrls: ['./saloon-detail.component.scss']
})
export class SaloonDetailComponent implements OnInit {
  
  public saloon!: Saloon;
  public serviceDetails!: PageResponse;
  
  constructor(private saloonService: SaloonService,
    private serviceDetailService: ServiceDetailService,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.getSaloon();
  }
  
  public getSaloon(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.saloonService.findById(p?.id).subscribe({
          next: (saloonPayload: any) => {
            this.saloon = saloonPayload?.responseBody;
            this.getAllServiceDetails(p?.id);
            
          },
          error: (errorResponse: HttpErrorResponse) =>
              this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      },
      error: (errorResponse: HttpErrorResponse) =>
          this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public getAllServiceDetails(saloonId: number): void {
    this.serviceDetailService.findAllByCategorySaloonId(saloonId).subscribe({
      next: (serviceDetailPayload: any) => {
        this.serviceDetails = serviceDetailPayload?.responseBody;
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
    
    if (action === "createReservation")
      button.setAttribute("data-bs-target", "#createReservation");
    
    const mainContainer = document.getElementById("main-container");
    mainContainer?.appendChild(button);
    button.click();
  }
  
  private onChooseServiceDetail(serviceDetailId: number): void {
    this.onOpenModal("createReservation");
  }
  
  public onCreateReservation(ngForm: NgForm): void {
    
  }
  
  
  
}











