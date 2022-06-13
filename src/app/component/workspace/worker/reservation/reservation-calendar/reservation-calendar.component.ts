
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { Reservation } from 'src/app/model/reservation';
import { ReservationStatus } from 'src/app/model/reservation-status';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { Task } from 'src/app/model/task';
import { CalendarService } from 'src/app/service/calendar.service';
import { CredentialService } from 'src/app/service/credential.service';
import { WorkerReservationService } from 'src/app/service/employee/worker/worker-reservation.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-worker-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.scss']
})
export class ReservationCalendarComponent implements OnInit {

  public accountUrl!: string;
  public calendarOptions!: CalendarOptions;
  public reservations: Reservation[] = [];

  constructor(private credentialService: CredentialService,
    private workerReservationService: WorkerReservationService,
    private calendarService: CalendarService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getAllReservations();
  }
  
  public getAllReservations(): void {
    this.workerReservationService.getAllReservations().subscribe({
      next: (tasksPayload: any) => {
        this.calendarOptions = this.calendarService.createSaloonCalendar();
        const tasks: PageResponse = tasksPayload?.responseBody;
        tasks?.content?.forEach((t: Task) => {
          this.reservations.push(t?.reservation);
        });
        this.reservations?.forEach(r => {
          if (r?.status !== ReservationStatus.CANCELLED && r?.status !== ReservationStatus.COMPLETED && ReservationStatus.OUTDATED)
            (this.calendarOptions.events as Array<any>).push({
              title: `REF-${r?.code?.substring(0, 8)}`,
              date: `${moment(r?.startDate).format(`yyyy-MM-DD HH:mm`)}`,
              interactive: true,
              className: 'btn btn-outline-danger',
              borderColor: 'blue'
            });
        });
      },
      error: (errorResponse: HttpErrorResponse) =>
          this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }



}












