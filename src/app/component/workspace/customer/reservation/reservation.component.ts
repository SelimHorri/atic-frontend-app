
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/model/reservation';
import { ReservationStatus } from 'src/app/model/reservation-status';
import { ApiPayloadCustomerReservationResponse } from 'src/app/model/response/api/api-payload-customer-reservation-response';
import { ApiPayloadTaskList } from 'src/app/model/response/api/api-payload-task-list';
import { CustomerReservationResponse } from 'src/app/model/response/customer-reservation-response';
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
  
  public customerReservationResponse!: CustomerReservationResponse;
  public accountUrl!: string;
  public completedReservations!: Reservation[];
  public pendingReservations!: Reservation[];
  public tasks!: Task[];
  public reservations!: Reservation[];
  
  constructor(private customerService: CustomerService,
    private credentialService: CredentialService,
    private reservationService: ReservationService,
    private taskService: TaskService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.getReservations();
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
  }
  
  public getCompletedReservations(): Reservation[] {
    return this.reservationService.getCompletedReservations(this.customerReservationResponse?.reservations);
  }
  
  public getPendingReservations(): Reservation[] {
    return this.reservationService.getPendingReservations(this.customerReservationResponse?.reservations);
  }
  
  public getReservations(): void {
    this.customerService.getReservations().subscribe({
      next: (customerReservationPayload: ApiPayloadCustomerReservationResponse) => {
        
        this.customerReservationResponse = customerReservationPayload?.responseBody;
        
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
    return [];
  }
  
  public searchBy(key: string): void {
    
    const res: Reservation[] = [];
    
    this.reservations = this.customerReservationResponse?.reservations
    
    this.reservations.forEach(r => {
      
      if ( r.code.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r.startDate.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r.cancelDate?.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r.status.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r.description?.toLowerCase().indexOf(key.toLowerCase()) !== -1 )
      { res.push(r);}
      
    });
    
    this.customerReservationResponse.reservations = res;
    
    this.customerReservationResponse.reservations.forEach(r => console.log(r?.code))
    
    
    if (res.length === 0 || !key)
      this.getReservations();
  }
  
  
  
}













