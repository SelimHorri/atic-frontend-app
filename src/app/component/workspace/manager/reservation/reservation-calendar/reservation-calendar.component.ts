
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { Reservation } from 'src/app/model/reservation';
import { ReservationStatus } from 'src/app/model/reservation-status';
import { ManagerReservationResponse } from 'src/app/model/response/manager-reservation-response';
import { CalendarService } from 'src/app/service/calendar.service';
import { CredentialService } from 'src/app/service/credential.service';
import { ManagerReservationService } from 'src/app/service/employee/manager/manager-reservation.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-manager-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.scss']
})
export class ReservationCalendarComponent implements OnInit {

  public accountUrl!: string;
  public calendarOptions!: CalendarOptions;
  public managerReservationResponse!: ManagerReservationResponse;

  constructor(private credentialService: CredentialService,
    private managerReservationService: ManagerReservationService,
    private calendarService: CalendarService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.fetchAllReservations();
  }

  public fetchAllReservations(): void {
    this.managerReservationService.fetchAllReservations().subscribe({
      next: (payload: any) => {
        this.managerReservationResponse = payload?.responseBody;
        this.calendarOptions = this.calendarService.createSaloonCalendar();
        const reservationsSet: Set<any> = new Set<any>(this.managerReservationResponse?.reservations?.content);
        this.managerReservationResponse?.reservations?.content?.forEach((r: Reservation) => {
          if (r?.status === ReservationStatus.NOT_STARTED || r?.status === ReservationStatus.IN_PROGRESS)
            reservationsSet.add({
              title: `REF-${r?.code?.substring(0, 8)}`,
              date: `${moment(r?.startDate).format(`yyyy-MM-DD HH:mm`)}`,
              interactive: true,
              className: 'btn btn-outline-danger',
              borderColor: 'blue'
            });
        });
        this.calendarOptions.events = Array.from(reservationsSet);
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  
  
}
