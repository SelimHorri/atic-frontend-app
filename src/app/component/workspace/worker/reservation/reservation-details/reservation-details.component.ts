
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { ReservationContainerResponse } from 'src/app/model/response/reservation-container-response';
import { ServiceDetailsReservationContainerResponse } from 'src/app/model/response/service-details-reservation-container-response';
import { CredentialService } from 'src/app/service/credential.service';
import { WorkerReservationService } from 'src/app/service/employee/worker/worker-reservation.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { ServiceDetailService } from 'src/app/service/service-detail.service';

@Component({
  selector: 'app-worker-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {
  
  public accountUrl!: string;
  public reservationDetails!: ReservationContainerResponse;
  public orderedServiceDetails!: ServiceDetailsReservationContainerResponse;
  public allServiceDetails!: PageResponse;
  
  constructor(private credentialService: CredentialService,
    private workerReservationService: WorkerReservationService,
    private serviceDetailService: ServiceDetailService,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getReservationDetails();
    this.getOrderedServiceDetails();
  }
  
  public calculateTotalAmount(): number {
    let amount: number = 0;
    this.orderedServiceDetails?.serviceDetails?.content?.map(s => {
      amount += s?.priceUnit;
    });

    return amount;
  }
  
  public calculateTotalDuration(): number {
    let totalDuration: number = 0;
    this.orderedServiceDetails?.serviceDetails?.content?.map(s => {
      totalDuration += s?.duration;
    });

    return totalDuration;
  }

  public getReservationDetails(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) =>
        this.workerReservationService.getReservationDetails(p.reservationId).subscribe({
          next: (reservationDetailsPayload: any) =>
            this.reservationDetails = reservationDetailsPayload?.responseBody,
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        })
    });
  }

  public getOrderedServiceDetails(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.serviceDetailService.getOrderedServiceDetailsByReservationId(p.reservationId).subscribe({
          next: (orderedServiceDetailsPayload: any) => {
            this.orderedServiceDetails = orderedServiceDetailsPayload?.responseBody;
          },
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      }
    });
  }

  public calculateReservationEndDate(): Date {
    return moment(this.reservationDetails?.reservation?.startDate)
      .add(moment.duration(this.calculateTotalDuration()).asMinutes())
      .toDate();
  }
  
  public onOpenModal(action: string): void {
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");

    if (action === "beginReservationTask")
      button.setAttribute("data-bs-target", "#beginReservationTask");

    const mainContainer = document.getElementById("main-container");
    mainContainer?.appendChild(button);
    button.click();
  }
  
  public openBeginTask(btn?: any): void {
    this.onOpenModal("beginReservationTask");
  }
  
  public onBeginTask(ngForm: NgForm): void {
    
  }
  
  /*
  private findAllServiceDetailsBySaloon(saloon: Saloon, existingServiceDetails: ServiceDetail[]): void {
    this.serviceDetailService.findAllByCategorySaloonId(saloon.id).subscribe({
      next: (serviceDetailsPayload: any) => {
        this.allServiceDetails = serviceDetailsPayload?.responseBody;
        existingServiceDetails?.forEach(existing => this.allServiceDetails?.content?.filter(s => s.id === existing.id));
      },
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  */
  
  
  
}











