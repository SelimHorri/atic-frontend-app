
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ReservationStatus } from 'src/app/model/reservation-status';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { ReservationContainerResponse } from 'src/app/model/response/reservation-container-response';
import { ServiceDetailsReservationContainerResponse } from 'src/app/model/response/service-details-reservation-container-response';
import { Task } from 'src/app/model/task';
import { ToastrMsg } from 'src/app/model/toastr-msg';
import { CredentialService } from 'src/app/service/credential.service';
import { WorkerReservationDetailService } from 'src/app/service/employee/worker/worker-reservation-detail.service';
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
    else if (action === "endReservationTask")
      button.setAttribute("data-bs-target", "#endReservationTask");
    
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
  
  public openTaskModal(action?: string): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => (action === 'beginReservationTask') ? this.onOpenModal("beginReservationTask") : this.onOpenModal("endReservationTask"),
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onUpdateMyNewComment(newWorkerDescription?: string | any): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.workerReservationDetailService.updateDescription(p?.reservationId, newWorkerDescription).subscribe({
          next: (taskPayload: any) => {
            this.task = taskPayload?.responseBody;
            console.log(JSON.stringify(this.task));
            this.notificationService.showSuccess(new ToastrMsg(`Your last comment has been updated successfully..`, `Updated!`));
          },
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      },
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onBeginTask(ngForm: NgForm): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.workerReservationDetailService.beginTask(p?.reservationId, ngForm?.value?.workerDescription).subscribe({
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
  
  public onEndTask(ngForm: NgForm): void {
    if (confirm(`Once your task is ended, you won't be able to change it anymore.\nDo you confirm`))
      this.activatedRoute.params.subscribe({
        next: (p: any) => {
          this.workerReservationDetailService.endTask(p?.reservationId, ngForm?.value?.workerDescription).subscribe({
            next: (taskPayload: any) => {
              this.task = taskPayload?.responseBody;
              this.getReservationDetails();
              this.notificationService.showSuccess(new ToastrMsg(`My Task has been ended successfully..`, `Task Ended!`));
              if (this.task?.reservation?.status === ReservationStatus.COMPLETED)
                this.notificationService.showInfo(new ToastrMsg(`Reservation is COMPLETED`, `Reservation Updated!`));
              document.getElementById(`endReservationTask`)?.click();
              ngForm.reset();
            },
            error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
          });
        }
      });
  }
  
  
  
}












