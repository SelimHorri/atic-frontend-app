
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Employee } from 'src/app/model/employee';
import { ReservationAssignWorkerRequest } from 'src/app/model/request/reservation-assign-worker-request';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { ReservationBeginEndTaskResponse } from 'src/app/model/response/reservation-begin-end-task-response';
import { ReservationContainerResponse } from 'src/app/model/response/reservation-container-response';
import { ReservationSubWorkerResponse } from 'src/app/model/response/reservation-sub-worker-response';
import { ServiceDetailsReservationContainerResponse } from 'src/app/model/response/service-details-reservation-container-response';
import { Saloon } from 'src/app/model/saloon';
import { ServiceDetail } from 'src/app/model/service-detail';
import { ToastrMsg } from 'src/app/model/toastr-msg';
import { CredentialService } from 'src/app/service/credential.service';
import { EmployeeService } from 'src/app/service/employee.service';
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
  public workerInfo!: Employee;
  public reservationBeginEndTaskResponse!: ReservationBeginEndTaskResponse;
  public reservationSubWorkerResponse!: ReservationSubWorkerResponse;
  public reservationAssignWorkerRequest: ReservationAssignWorkerRequest = {
    reservationId: 0,
    assignedWorkersIds: [],
    managerDescription: ""
  };

  constructor(private managerReservationDetailService: ManagerReservationDetailService,
    private credentialService: CredentialService,
    private serviceDetailService: ServiceDetailService,
    private employeeService: EmployeeService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.fetchReservationDetails();
    this.fetchOrderedServiceDetails();
    this.fetchBeginEndTask();
    this.fetchAllUnassignedSubWorkers();
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

  public fetchReservationDetails(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) =>
        this.managerReservationDetailService.fetchReservationDetails(p.reservationId).subscribe({
          next: (reservationDetailsPayload: any) =>
            this.reservationDetails = reservationDetailsPayload?.responseBody,
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        })
    });
  }

  public fetchOrderedServiceDetails(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.serviceDetailService.fetchOrderedServiceDetails(p.reservationId).subscribe({
          next: (orderedServiceDetailsPayload: any) => {
            this.orderedServiceDetails = orderedServiceDetailsPayload?.responseBody;
          },
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      }
    });
  }
  
  private fetchBeginEndTask(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.managerReservationDetailService.fetchBeginEndTask(p?.reservationId).subscribe({
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

  public onOpenModal(action: string): void {
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");

    if (action === "assignWorker")
      button.setAttribute("data-bs-target", "#assignWorker");
    else if (action === "workerInfo")
      button.setAttribute("data-bs-target", "#workerInfo");

    const mainContainer = document.getElementById("main-container");
    mainContainer?.appendChild(button);
    button.click();
  }
  
  public findWorkerInfoById(workerId: number): void {
    this.employeeService.findById(workerId).subscribe({
      next: (payload: any) => {
        this.workerInfo = payload?.responseBody;
        this.onOpenModal('workerInfo');
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  private fetchAllUnassignedSubWorkers(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.managerReservationDetailService.fetchAllUnassignedSubWorkers(p?.reservationId).subscribe({
          next: (payload: any) => this.reservationSubWorkerResponse = payload?.responseBody,
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      },
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onCheckWorker(event: any): void {
    if (event.target.checked) {
      if (!this.reservationAssignWorkerRequest?.assignedWorkersIds?.includes(event.target.value))
        this.reservationAssignWorkerRequest.assignedWorkersIds.push(parseInt(event.target.value));
    }
    else
      this.reservationAssignWorkerRequest.assignedWorkersIds.splice(
          this.reservationAssignWorkerRequest.assignedWorkersIds.indexOf(event.target.value) - 1, 1);
  }
  
  public onAssignWorker(ngForm: NgForm): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.reservationAssignWorkerRequest.reservationId = p?.reservationId;
        this.managerReservationDetailService.assignReservationWorkers(this.reservationAssignWorkerRequest).subscribe({
          next: (payload: any) => {
            this.reservationSubWorkerResponse = payload?.responseBody;
            this.notificationService.showSuccess(new ToastrMsg(
                `Workers assigned to this reservation REF-${this.reservationSubWorkerResponse?.reservation?.code?.substring(0, 8)} successfully..`, 
                `Assigned!`));
            this.fetchAllUnassignedSubWorkers();
          },
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      },
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  
  
}












