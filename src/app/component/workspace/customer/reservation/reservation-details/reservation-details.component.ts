
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { OrderedDetail } from 'src/app/model/ordered-detail';
import { OrderedDetailId } from 'src/app/model/ordered-detail-id';
import { OrderedDetailRequest } from 'src/app/model/request/ordered-detail-request';
import { Reservation } from 'src/app/model/reservation';
import { ApiPayloadReservationContainerResponse } from 'src/app/model/response/api/api-payload-reservation-container-response';
import { ApiPayloadServiceDetailsReservationContainerResponse } from 'src/app/model/response/api/api-payload-service-details-reservation-container-response';
import { ReservationContainerResponse } from 'src/app/model/response/reservation-container-response';
import { ServiceDetailsReservationContainerResponse } from 'src/app/model/response/service-details-reservation-container-response';
import { Saloon } from 'src/app/model/saloon';
import { ServiceDetail } from 'src/app/model/service-detail';
import { CredentialService } from 'src/app/service/credential.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { OrderedDetailService } from 'src/app/service/ordered-detail.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { ServiceDetailService } from 'src/app/service/service-detail.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {
  
  public accountUrl!: string;
  public reservationDetails!: ReservationContainerResponse;
  public orderedServiceDetails!: ServiceDetailsReservationContainerResponse;
  public allServiceDetails: ServiceDetail[] = [];
  // public description: string | undefined = this.reservationDetails?.reservation?.description;
  
  constructor(private reservationService: ReservationService,
    private credentialService: CredentialService,
    private serviceDetailService: ServiceDetailService,
    private orderedDetailService: OrderedDetailService,
    private errorHandlerService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getReservationDetails();
    this.getOrderedServiceDetails();
    // this.calculateReservationEndDate();
  }
  
  public calculateTotalAmount(): number {
    
    let amount: number = 0;
    this.orderedServiceDetails?.serviceDetails?.map(s => {
      amount += s?.priceUnit;
    });
    
    return amount;
  }
  
  public calculateTotalDuration(): number {

    let totalDuration: number = 0;
    this.orderedServiceDetails?.serviceDetails?.map(s => {
      totalDuration += s?.duration;
    });

    return totalDuration;
  }
  
  public getReservationDetails(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) =>
        this.reservationService.getReservationDetails(p.reservationId).subscribe({
          next: (reservationDetailsPayload: ApiPayloadReservationContainerResponse) =>
              this.reservationDetails = reservationDetailsPayload?.responseBody,
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        })
    });
  }
  
  public getOrderedServiceDetails(): void {
    this.activatedRoute.params.subscribe({
      next: (p:any) => {
        this.serviceDetailService.getOrderedServiceDetailsByReservationId(p.reservationId).subscribe({
          next: (orderedServiceDetailsPayload: ApiPayloadServiceDetailsReservationContainerResponse) =>
            this.orderedServiceDetails = orderedServiceDetailsPayload?.responseBody,
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
  
  public removeOrderedServiceDetail(reservationId: number, serviceDetailId: number): void {
    this.orderedDetailService.deleteOrderedServiceDetail(new OrderedDetailId(reservationId, serviceDetailId)).subscribe({
      // next: (responsePayload: any) => (responsePayload?.responseBody) ? this.getOrderedServiceDetails() : alert("Unable to remove service"),
      next: (responsePayload: any) => (responsePayload?.responseBody) ? window.location.reload() : alert("Unable to remove service"),
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onUpdateReservation(reservationDetailRequest: ReservationContainerResponse, descriptionObj: any): void {
    reservationDetailRequest.reservation.description = descriptionObj?.description;
    this.reservationService.updateReservationDetails(reservationDetailRequest).subscribe({
      next: (reservationDetailPayload: any) => {
        alert(JSON.stringify(reservationDetailPayload?.responseBody));
      },
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onOpenModal(saloon: Saloon, existingServiceDetails: ServiceDetail[], action: string): void {
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");

    if (action === "addServiceDetail")
      button.setAttribute("data-bs-target", "#addServiceDetail");

    const mainContainer = document.getElementById("main-container");
    mainContainer?.appendChild(button);
    button.click();
    this.findAllServiceDetailsBySaloon(saloon, existingServiceDetails);
  }
  
  private findAllServiceDetailsBySaloon(saloon: Saloon, existingServiceDetails: ServiceDetail[]): void {
    this.serviceDetailService.findAllByCategorySaloonId(saloon.id).subscribe({
      next: (serviceDetailsPayload: any) => {
        this.allServiceDetails = serviceDetailsPayload?.responseBody;
        existingServiceDetails?.forEach(existing => this.allServiceDetails?.filter(s => s.id === existing.id));
      },
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onAddServiceDetail(ngForm: NgForm): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        ngForm.value.reservationId = p?.reservationId;
        this.orderedDetailService.save(ngForm.value as OrderedDetailRequest).subscribe({
          next: (savedOrderedDetails: any) => {
            console.log(JSON.stringify(savedOrderedDetails?.responseBody));
            ngForm.reset();
            document.getElementById("addServiceDetail")?.click();
          },
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      }
    });
  }
  
  
  
}












