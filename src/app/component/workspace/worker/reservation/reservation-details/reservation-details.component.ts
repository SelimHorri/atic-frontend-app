
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { TaskBeginRequest } from 'src/app/model/request/task-begin-request';
import { ReservationStatus } from 'src/app/model/reservation-status';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { ReservationContainerResponse } from 'src/app/model/response/reservation-container-response';
import { ServiceDetailsReservationContainerResponse } from 'src/app/model/response/service-details-reservation-container-response';
import { Task } from 'src/app/model/task';
import { ToastrMsg } from 'src/app/model/toastr-msg';
import { CredentialService } from 'src/app/service/credential.service';
import { WorkerReservationDetailService } from 'src/app/service/employee/worker/worker-reservation-detail.service';
import { WorkerReservationService } from 'src/app/service/employee/worker/worker-reservation.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { NotificationService } from 'src/app/service/notification.service';
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
  public task!: Task;
  
  constructor(private credentialService: CredentialService,
    private workerReservationDetailService: WorkerReservationDetailService,
    private serviceDetailService: ServiceDetailService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getAssignedTask();
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
        this.workerReservationDetailService.getReservationDetails(p.reservationId).subscribe({
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
  
  private getAssignedTask(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.workerReservationDetailService.getAssignedTask(p?.reservationId).subscribe({
          next: (taskPayload: any) => this.task = taskPayload?.responseBody,
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      },
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public openBeginTask(btn?: any): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => this.onOpenModal("beginReservationTask"),
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onBeginTask(ngForm: NgForm): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        const taskBeginRequest: TaskBeginRequest =
            new TaskBeginRequest(`${sessionStorage.getItem(`username`)}`, p?.reservationId, ngForm?.value?.workerDescription);
        this.workerReservationDetailService.beginTask(taskBeginRequest).subscribe({
          next: (taskPayload: any) => {
            this.task = taskPayload?.responseBody;
            this.getReservationDetails();
            this.notificationService.showSuccess(new ToastrMsg(`My Task has been initiated successfully..`, `Task Started!`));
            if (this.task?.reservation?.status === ReservationStatus.IN_PROGRESS)
              this.notificationService.showInfo(new ToastrMsg(`Reservation is IN_PROGRESS`, `Reservation Updated!`));
            document.getElementById(`beginReservationTask`)?.click();
            ngForm.reset();
          },
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      }
    });
  }
  
  
  
}












