
import { Injectable } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { CredentialService } from './credential.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  
  private calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    selectable: true,
    editable: true,
    allDaySlot: false,
    firstDay: 1,
    slotMinTime: '08:00',
    // slotMaxTime: '23:00',
    contentHeight: "auto",
    slotDuration: '00:30:00',
    slotLabelInterval: 30,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,dayGridMonth'
    },
    // selectMirror: true,
    select: arg => alert(`reservation starts at: ${moment(arg?.startStr).format(`DD-MMM-yyyy HH:mm`)}`),
    // selectOverlap: true,
    selectAllow: arg =>  {
      if (moment(Date.now()).isAfter(arg.start)) {
        alert(`Outdated! please select valid date`);
        return false;
      }
      else
        return true;
    },
    // eventClick: (arg) => alert('hello: '),
    events: []
  };
  
  constructor() {}
  
  public createSaloonCalendar(initialView?: string): CalendarOptions {
    this.calendarOptions.initialView = initialView;
    return this.calendarOptions;
  }
  
  
  
}














