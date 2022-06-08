
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { DateBackendFormat } from 'src/app/model/date-backend-format';
import { ReservationStatus } from 'src/app/model/reservation-status';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { CalendarService } from 'src/app/service/calendar.service';
import { CredentialService } from 'src/app/service/credential.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
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
  
  public reservationRequest: any = {
    username: `${sessionStorage.getItem(`username`)}`.trim(),
    saloonId: 0,
    startDate: '',
    serviceDetailsIds: [],
    description: ""
  };

  constructor(private credentialService: CredentialService,
    private serviceDetailService: ServiceDetailService,
    private reservationService: ReservationService,
    private calendarService: CalendarService,
    private activatedRoute: ActivatedRoute,
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
    
    console.log('reser: ' + JSON.stringify(this.reservationRequest))
    
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        
      },
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
    
    document.getElementById('createReservation')?.click();
    ngForm.reset();
    this.reservationRequest.serviceDetailsIds = [];
    // this.getAllReservationsBySaloonId();
  }



}











