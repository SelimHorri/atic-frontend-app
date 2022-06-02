
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { DateBackendFormat } from 'src/app/model/date-backend-format';

@Component({
  selector: 'app-saloon-calendar',
  templateUrl: './saloon-calendar.component.html',
  styleUrls: ['./saloon-calendar.component.scss']
})
export class SaloonCalendarComponent implements OnInit {
  
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    selectable: true,
    editable: true,
    allDaySlot: false,
    firstDay: 1,
    // slotMinTime: '05:00',
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
    select: (arg) => alert(`reservation starts at: ${moment(arg?.startStr).format(`DD-MMM-yyyy HH:mm`)}`),
    // selectOverlap: true,
    // selectAllow: (arg) => {return true},
    
    // eventClick: (arg) => alert('hello: '),
    events: [
      { title: 'Appointment 1', date: '2022-06-03 06:30', interactive: true, className: 'btn btn-outline-danger',  /*, url: '/saloons'*/ },
      { title: 'Appointment 2', date: '2022-06-04 10:00', interactive: true, className: 'btn btn-outline-danger' },
      { title: 'Appointment 2', date: '2022-06-04 10:30', interactive: true, className: 'btn btn-outline-danger' },
      { title: 'Appointment 2', date: '2022-06-04 13:00', interactive: true, className: 'btn btn-outline-danger' },
    ]
  };
  
  constructor() {}
  
  ngOnInit(): void {
    
  }
  
  
  
}











