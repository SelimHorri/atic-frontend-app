
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Reservation } from 'src/app/model/reservation';
import { ApiPayloadCustomerReservationResponse } from 'src/app/model/response/api/api-payload-customer-reservation-response';
import { ApiPayloadTaskList } from 'src/app/model/response/api/api-payload-task-list';
import { Task } from 'src/app/model/task';
import { CredentialService } from 'src/app/service/credential.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  
  public accountUrl!: string;
  public reservations!: Reservation[];
  public completedReservations!: Reservation[];
  public pendingReservations!: Reservation[];
  public tasks!: Task[];
  
  constructor(private customerService: CustomerService,
    private credentialService: CredentialService,
    private reservationService: ReservationService,
    private taskService: TaskService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.getReservations();
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    // this.findAllByReservationId();
  }
  
  public getCompletedReservations(): Reservation[] {
    return this.reservationService.getCompletedReservations(this.reservations);
  }
  
  public getPendingReservations(): Reservation[] {
    return this.reservationService.getPendingReservations(this.reservations);
  }
  
  public getReservations(): void {
    this.customerService.getReservations().subscribe({
      next: (customerReservationPayload: ApiPayloadCustomerReservationResponse) => {
        
        this.reservations = customerReservationPayload?.responseBody?.reservations;
        this.reservations.forEach(r => {
          // this.findAllByReservationId(r?.id);
          this.tasks = this.getAssignedWorkers(r?.id);
          // return;
        });
        
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorHandlerService.extractExceptionMsg(errorResponse);
      }
    });
  }
  
  public findAllByReservationId(reservationId: number): void {
    this.taskService.findAllByReservationId(reservationId).subscribe({
      next: (tasksPayload: ApiPayloadTaskList) => {
        this.tasks = tasksPayload?.responseBody;
        console.log(JSON.stringify(this.tasks));
        
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorHandlerService.extractExceptionMsg(errorResponse);
      }
    });
  }
  
  public getAssignedWorkers(reservationId: number): Task[] {
    this.findAllByReservationId(reservationId);
    return this.tasks;
  }
  
  public searchBy(key: string): void {
    
    const res: Reservation[] = [];
    
    this.reservations.forEach(r => {
      
      if ( r.code.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r.startDate.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r.cancelDate?.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r.status.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r.description?.toLowerCase().indexOf(key.toLowerCase()) !== -1 )
      { res.push(r);}
      
    });
    
    this.reservations = res;
    
    this.reservations.forEach(r => console.log(r?.code))
    
    
    if (res.length === 0 || !key)
      this.getReservations();
  }
  
  
  
}













