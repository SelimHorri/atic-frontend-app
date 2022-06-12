
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { Reservation } from 'src/app/model/reservation';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { Saloon } from 'src/app/model/saloon';
import { ToastrMsg } from 'src/app/model/toastr-msg';
import { CredentialService } from 'src/app/service/credential.service';
import { CustomerReservationService } from 'src/app/service/customer/customer-reservation.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SaloonService } from 'src/app/service/saloon.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  
  public accountUrl!: string;
  public reservations!: PageResponse;
  public tasks!: PageResponse;
  public relatedSaloon!: Saloon;
  public pages: number[] = [];
  
  constructor(private credentialService: CredentialService,
    private customerReservationService: CustomerReservationService,
    private taskService: TaskService,
    private saloonService: SaloonService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getReservations();
    // this.findAllByReservationId();
  }
  
  public getCompletedReservations(): Reservation[] {
    return this.customerReservationService.getCompletedReservations(this.reservations?.content);
  }
  
  public getPendingReservations(): Reservation[] {
    return this.customerReservationService.getPendingReservations(this.reservations?.content);
  }
  
  public getReservations(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        if (q?.offset === undefined || q?.offset === null || q?.offset as number < 1 || q?.size as number < 1)
          this.router.navigateByUrl(`/workspace/${this.accountUrl}/reservations?offset=1`);
        else
          this.customerReservationService.getReservations(new ClientPageRequest(q?.offset, q?.size)).subscribe({
            next: (customerReservationPayload: any) => {
              this.reservations = customerReservationPayload?.responseBody?.reservations;
              this.pages = new Array<number>(this.reservations?.totalPages);
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.errorHandlerService.extractExceptionMsg(errorResponse);
            }
          });
      }
    });
  }
  
  public findAllTasksByReservationId(reservationId: number): void {
    this.taskService.findAllByReservationId(reservationId).subscribe({
      next: (tasksPayload: any) => {
        this.tasks = tasksPayload?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorHandlerService.extractExceptionMsg(errorResponse);
      }
    });
  }
  
  public getAssignedWorkers(reservationId: number): PageResponse {
    this.findAllTasksByReservationId(reservationId);
    return this.tasks;
  }
  
  public searchBy(key: string): void {
    const res: Reservation[] = [];
    this.reservations?.content.forEach(r => {
      if (`REF-${r?.code}`.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r.startDate.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r.cancelDate.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
          // || r.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r.status.toLowerCase().indexOf(key.toLowerCase()) !== -1)
        res.push(r);
    });
    
    this.reservations.content = res;
    if (res.length === 0 || !key)
      this.getReservations();
  }
  
  public onNavigatePagination(offset?: number): string | void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        let url: string = `/workspace/${this.accountUrl}/reservations?offset=${offset}`;
        if (q?.size !== undefined && q?.size !== null && q?.size >= 1)
          url = `${url}&size=${q?.size}`;
        this.router.navigateByUrl(url);
        // window.location.replace(url);
        return url;
      }
    });
  }
  
  public onSelectPageSize(size: string): void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        if(q?.offset === undefined || size.trim() === '' || size === undefined || size === null || parseInt(size.trim()) < 1)
          this.router.navigateByUrl(`/workspace/${this.accountUrl}/reservations?offset=1`);
        else
          this.router.navigateByUrl(`${window.location.pathname}?offset=${q?.offset}&size=${size}`);
      }
    });
  }
  
  public cancelReservation(reservationId: number): void {
    if (confirm(`Cancel this reservation ?`))
      this.customerReservationService.cancelReservation(reservationId).subscribe({
        next: (reservationPayload: any) => {
          this.getReservations();
          this.notificationService.showWarning(new ToastrMsg(`Reservation has been cancelled`, "Reservation cancelled!"));
        },
        error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
      });
  }
  
  private findSaloonById(saloonId: number): void {
    this.saloonService.findById(saloonId).subscribe({
      next: (saloonPayload: any) => {
        this.relatedSaloon = saloonPayload?.responseBody;
      },
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  
  
}













