
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { Reservation } from 'src/app/model/reservation';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { Task } from 'src/app/model/task';
import { CredentialService } from 'src/app/service/credential.service';
import { WorkerReservationService } from 'src/app/service/employee/worker/worker-reservation.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-worker-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  
  public accountUrl!: string;
  public tasks!: PageResponse;
  public reservations: any[] = [];
  public pages: number[] = [];
  
  constructor(private credentialService: CredentialService,
    private workerReservationService: WorkerReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.fetchAllPagedReservations();
  }
  
  public getCompletedReservations(): Reservation[] {
    return this.workerReservationService.getCompletedReservations(this.reservations);
  }

  public getPendingReservations(): Reservation[] {
    return this.workerReservationService.getPendingReservations(this.reservations);
  }
  
  public fetchAllPagedReservations(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        if (q?.offset === undefined || q?.offset === null || q?.offset as number < 1 || q?.size as number < 1)
          this.router.navigateByUrl(`/workspace/${this.accountUrl}/reservations?offset=1`);
        else
          this.workerReservationService.fetchAllPagedReservations(new ClientPageRequest
                        (q?.offset, q?.size, ['reservation.startDate', 'reservation.createdAt'], 'desc')).subscribe({
            next: (payload: any) => {
              const reservationsSet: Set<Reservation> = new Set<Reservation>();
              this.tasks = payload?.responseBody;
              this.tasks?.content?.forEach((t: Task) => reservationsSet.add(t?.reservation));
              this.reservations = Array.from(reservationsSet);
              this.pages = new Array<number>(this.tasks?.totalPages);
            },
            error: (errorResponse: HttpErrorResponse) =>
                this.errorHandlerService.extractExceptionMsg(errorResponse)
          });
      }
    });
  }
  
  public searchBy(key: string): void {
    const res: Reservation[] = [];
    this.reservations.forEach(r => {
      if (`REF-${r?.code?.substring(0, 8)}`.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r?.code?.substring(0, 8).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.startDate).format(`DD-MMM-yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.cancelDate).format(`DD-MMM-yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.completeDate).format(`DD-MMM-yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.startDate).format(`DD MMM yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.cancelDate).format(`DD MMM yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.completeDate).format(`DD MMM yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          // || r.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r?.status.toLowerCase().indexOf(key.toLowerCase()) !== -1)
        res.push(r);
    });

    this.reservations = res;
    if (!key)
      this.fetchAllPagedReservations();
  }
  
  public onSearchAllLikeKey(key: string): void {
    if (key?.trim() !== '')
      this.workerReservationService.searchAllLikeKey(key).subscribe({
        next: (payload: any) => {
          const reservationsSet: Set<Reservation> = new Set<Reservation>();
          this.tasks = payload?.responseBody;
          this.tasks?.content?.forEach((t: Task) => reservationsSet.add(t?.reservation));
          this.reservations = Array.from(reservationsSet);
          this.pages = new Array<number>(this.tasks?.totalPages);
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.errorHandlerService.extractExceptionMsg(errorResponse)
      });
  }

  public onNavigatePagination(offset?: number): string | void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        let url: string = `/workspace/${this.accountUrl}/reservations?offset=${offset}`;
        if (q?.size !== undefined && q?.size !== null && q?.size >= 1)
          url = `${url}&size=${q?.size}`;
        this.router.navigateByUrl(url);
        return url;
      }
    });
  }

  public onSelectPageSize(size: string): void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        if (q?.offset === undefined || size.trim() === '' || size === undefined || size === null || parseInt(size.trim()) < 1)
          this.router.navigateByUrl(`/workspace/${this.accountUrl}/reservations?offset=1`);
        else
          this.router.navigateByUrl(`${window.location.pathname}?offset=${q?.offset}&size=${size}`);
      }
    });
  }
  
  
  
}












