
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { CalendarService } from 'src/app/service/calendar.service';
import { CredentialService } from 'src/app/service/credential.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-worker-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.scss']
})
export class ReservationCalendarComponent implements OnInit {

  public accountUrl!: string;
  public calendarOptions!: CalendarOptions;

  constructor(private credentialService: CredentialService,
    private calendarService: CalendarService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
  }



}












