
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { ReservationRequest } from 'src/app/model/request/reservation-request';
import { Reservation } from 'src/app/model/reservation';
import { ReservationStatus } from 'src/app/model/reservation-status';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { ToastrMsg } from 'src/app/model/toastr-msg';
import { CalendarService } from 'src/app/service/calendar.service';
import { CredentialService } from 'src/app/service/credential.service';
import { CustomerReservationService } from 'src/app/service/customer/customer-reservation.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { ServiceDetailService } from 'src/app/service/service-detail.service';

@Component({
  selector: 'app-saloon-calendar',
  templateUrl: './saloon-calendar.component.html',
  styleUrls: ['./saloon-calendar.component.scss']
})
export class SaloonCalendarComponent implements OnInit {

  public accountUrl!: string;
  public saloonReservations!: PageResponse;
  public calendarOptions!: CalendarOptions;
  public allServiceDetails!: PageResponse;
  public reservationRequest: ReservationRequest = new ReservationRequest(`${sessionStorage.getItem(`username`)}`.trim(), 0, '', []);

  constructor(private credentialService: CredentialService,
    private customerReservationService: CustomerReservationService,
    private serviceDetailService: ServiceDetailService,
    private reservationService: ReservationService,
    private calendarService: CalendarService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getAllReservationsBySaloonId();
    // this.getAllServiceDetails();
  }

  public getAllReservationsBySaloonId(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.reservationService.findAllBySaloonId(p?.id).subscribe({
          next: (saloonReservationsPayload: any) => {
            this.saloonReservations = saloonReservationsPayload?.responseBody;
            this.calendarOptions = this.calendarService.createSaloonCalendar();
            this.saloonReservations?.content?.forEach(r => {
              if (r?.status !== ReservationStatus.CANCELLED && r?.status !== ReservationStatus.COMPLETED) {
                (this.calendarOptions.events as Array<any>).push({
                  title: `REF-${r?.code?.substring(0, 8)}`,
                  date: `${moment(r?.startDate).format(`yyyy-MM-DD HH:mm`)}`,
                  interactive: true,
                  className: 'btn btn-outline-danger',
                  // url: `/workspace/${this.accountUrl}/reservations/${r?.id}`
                });
              }
            });
            this.getAllServiceDetails();
          },
          error: (errorResponse: HttpErrorResponse) =>
              this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      }
    });
  }
  
  private onOpenModal(action: string): void {
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
 
  private getAllServiceDetails(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.serviceDetailService.findAllByCategorySaloonId(p?.id).subscribe({
          next: (serviceDetailsPayload: any) => {
            this.allServiceDetails = serviceDetailsPayload?.responseBody;
            this.calendarOptions.select = arg => {
              this.onOpenModal('createReservation');
              this.reservationRequest.startDate = moment(arg?.start).format(DateBackendFormat.LOCAL_DATE_TIME);
            };
          },
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      }
    });
  }
  
  public onServiceCheck(item: any, event: any): void {
    item.isChecked = !item?.isChecked;
    
    if (event.target.checked) {
      if (!this.reservationRequest?.serviceDetailsIds?.includes(event.target.value))
        this.reservationRequest.serviceDetailsIds.push(parseInt(event.target.value));
    }
    else
      this.reservationRequest.serviceDetailsIds.splice(this.reservationRequest.serviceDetailsIds.indexOf(event.target.value) - 1, 1);
    
  }
  
  public onCreateReservation(ngForm: NgForm): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.reservationRequest.saloonId = p?.id;
        this.customerReservationService.createReservation(this.reservationRequest).subscribe({
          next: (reservationPayload: any) => {
            console.log(JSON.stringify(reservationPayload?.responseBody));
            const reservation: Reservation = reservationPayload?.responseBody;
            document.getElementById('createReservation')?.click();
            this.reservationRequest.serviceDetailsIds = [];
            ngForm.reset();
            this.getAllReservationsBySaloonId();
            // window.location.reload();
            this.notificationService.showSuccess(new ToastrMsg(`REF-${reservation?.code?.substring(0, 8)} has been created..`, 
                "Reservation created!"));
          },
          error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      },
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
    
    }



}











