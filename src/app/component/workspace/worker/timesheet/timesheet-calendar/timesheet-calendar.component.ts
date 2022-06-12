
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { CalendarService } from 'src/app/service/calendar.service';
import { CredentialService } from 'src/app/service/credential.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-timesheet-calendar',
  templateUrl: './timesheet-calendar.component.html',
  styleUrls: ['./timesheet-calendar.component.scss']
})
export class TimesheetCalendarComponent implements OnInit {
  
  public accountUrl!: string;
  public calendarOptions!: CalendarOptions;
  
  constructor(private credentialService: CredentialService,
    private calendarService: CalendarService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
  }
  
  
  
}












