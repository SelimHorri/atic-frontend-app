
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { ReservationBeginEndTaskResponse } from 'src/app/model/response/reservation-begin-end-task-response';
import { ReservationContainerResponse } from 'src/app/model/response/reservation-container-response';
import { ReservationSubWorkerResponse } from 'src/app/model/response/reservation-sub-worker-response';
import { ServiceDetailsReservationContainerResponse } from 'src/app/model/response/service-details-reservation-container-response';
import { Saloon } from 'src/app/model/saloon';
import { ServiceDetail } from 'src/app/model/service-detail';
import { CredentialService } from 'src/app/service/credential.service';
import { ManagerReservationDetailService } from 'src/app/service/employee/manager/manager-reservation-detail.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OrderedDetailService } from 'src/app/service/ordered-detail.service';
import { ServiceDetailService } from 'src/app/service/service-detail.service';

@Component({
  selector: 'app-manager-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {
  
  public accountUrl!: string;
  public reservationDetails!: ReservationContainerResponse;
  public orderedServiceDetails!: ServiceDetailsReservationContainerResponse;
  public allServiceDetails!: PageResponse;
  public msg: string = "";
  public reservationBeginEndTaskResponse!: ReservationBeginEndTaskResponse;
  public reservationSubWorkerResponse!: ReservationSubWorkerResponse;

  constructor(private managerReservationDetailService: ManagerReservationDetailService,
    private credentialService: CredentialService,
    private serviceDetailService: ServiceDetailService,
    private orderedDetailService: OrderedDetailService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getReservationDetails();
    this.getOrderedServiceDetails();
    this.getBeginEndTask();
    this.getAllUnassignedSubWorkers();
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
        this.managerReservationDetailService.getReservationDetails(p.reservationId).subscribe({
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
  
  private getBeginEndTask(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.managerReservationDetailService.getBeginEndTask(p?.reservationId).subscribe({
          next: (payload: any) => this.reservationBeginEndTaskResponse = payload?.responseBody,
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

  public onOpenModal(saloon: Saloon, existingServiceDetails: ServiceDetail[], action: string): void {
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");

    if (action === "assignWorker")
      button.setAttribute("data-bs-target", "#assignWorker");

    const mainContainer = document.getElementById("main-container");
    mainContainer?.appendChild(button);
    button.click();
  }
  
  private getAllUnassignedSubWorkers(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.managerReservationDetailService.getAllUnassignedSubWorkers(p?.reservationId).subscribe({
          next: (payload: any) => this.reservationSubWorkerResponse = payload?.responseBody,
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      },
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onCheckWorker(event: any): void {
    
  }
  
  public onAssignWorker(ngForm: NgForm): void {
    
  }
  
  
  
}












