
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiPayloadReservationContainerResponse } from 'src/app/model/response/api/api-payload-reservation-container-response';
import { ReservationContainerResponse } from 'src/app/model/response/reservation-container-response';
import { CustomerService } from 'src/app/service/customer.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {
  
  public reservationDetails!: ReservationContainerResponse;
  
  constructor(private customerService: CustomerService,
    private errorHandlerService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.getReservationDetails();
  }
  
  public getReservationDetails(): void {
    
    this.activatedRoute.params.subscribe({
      next: (p: any) =>
        this.customerService.getReservationDetails(p.reservationId).subscribe({
          next: (reservationDetailsPayload: ApiPayloadReservationContainerResponse) =>
            this.reservationDetails = reservationDetailsPayload?.responseBody,
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        })
    });
  }
  
  
  
}












