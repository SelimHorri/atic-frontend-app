
import { Injectable } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { ToastrMsg } from '../model/toastr-msg';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  
  private calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    selectable: true,
    editable: false,
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
    // select: arg => alert(`Reservation starts at: ${moment(arg?.startStr).format(`DD-MMM-yyyy HH:mm`)}`),
    select: arg => {
      this.onOpenModal('createReservation');
    },
    // selectOverlap: true,
    selectAllow: arg =>  {
      if (moment(Date.now()).isAfter(arg.start)) {
        alert(`Outdated! please select valid date`);
        return false;
      }
      else
        return true;
    },
    eventClick: arg => {
      const textarea = document.createElement('textarea');
      textarea.value = arg?.event?.title;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      navigator.clipboard.writeText(`${arg?.event?.title}`).then(
        res => this.notificationService.showSuccess(new ToastrMsg(`Reservation ${arg?.event?.title} copied to clipboard, go and search...`, 
              "Copied to clipboard!")), 
        () => this.notificationService.showWarning(new ToastrMsg(`Fail to copy reference to clipboard...`, 
              "Copy failed!")));
      document.body.removeChild(textarea);
    },
    events: []
  };
  
  constructor(private notificationService: NotificationService) {}
  
  public createSaloonCalendar(initialView?: string): CalendarOptions {
    this.calendarOptions.initialView = initialView;
    return this.calendarOptions;
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
  
  
  
}














