
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { Reservation } from 'src/app/model/reservation';
import { ManagerWorkerAssignmentResponse } from 'src/app/model/response/manager-worker-assignment-response';
import { Task } from 'src/app/model/task';
import { CredentialService } from 'src/app/service/credential.service';
import { ManagerWorkerAssignmentService } from 'src/app/service/employee/manager/manager-worker-assignment.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-manager-worker-assignment',
  templateUrl: './worker-assignment.component.html',
  styleUrls: ['./worker-assignment.component.scss']
})
export class WorkerAssignmentComponent implements OnInit {
  
  public accountUrl!: string;
  public managerWorkerAssignmentResponse!: ManagerWorkerAssignmentResponse;
  public reservations: Reservation[] = [];
  public pages: number[] = [];
  
  constructor(private credentialService: CredentialService,
    private managerWorkerAssignmentService: ManagerWorkerAssignmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.fetchAllWorkerTasks();
  }
  
  private fetchAllWorkerTasks(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.activatedRoute.queryParams.subscribe({
          next: (q: any) => {
            if (q?.offset === undefined || q?.offset === null || q?.offset as number < 1 || q?.size as number < 1)
              this.router.navigateByUrl(`/workspace/${this.accountUrl}/workers/assignments/${p?.workerId}?offset=1`);
            else
              this.managerWorkerAssignmentService.fetchAllWorkerTasks(p?.workerId,
                new ClientPageRequest(q?.offset, q?.size, ['reservation.startDate', 'reservation.createdAt'], 'desc')).subscribe({
                  next: (payload: any) => {
                    this.managerWorkerAssignmentResponse = payload?.responseBody;
                    const reservationsSet: Set<Reservation> = new Set<Reservation>();
                    this.managerWorkerAssignmentResponse?.tasks?.content?.forEach((t: Task) => {
                      reservationsSet.add(t?.reservation);
                    });
                    this.reservations = Array.from(reservationsSet);
                    this.pages = new Array<number>(this.managerWorkerAssignmentResponse?.tasks?.totalPages);
                  },
                  error: (errorResponse: HttpErrorResponse) =>
                    this.errorHandlerService.extractExceptionMsg(errorResponse)
                });
          }
        });
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public searchBy(key: string): void {
    const res: Reservation[] = [];
    this.reservations.forEach(r => {
      if (`REF-${r?.code?.substring(0, 8)}`.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r?.code?.substring(0, 8).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.startDate).format(`DD-MMM-yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.startDate).format(`MMMM-yyyy`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.cancelDate).format(`DD-MMM-yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.cancelDate).format(`MMMM-yyyy`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.completeDate).format(`DD-MMM-yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.completeDate).format(`MMMM-yyyy`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.startDate).format(`DD MMM yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.startDate).format(`MMM yyyy`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.cancelDate).format(`DD MMM yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.cancelDate).format(`MMM yyyy`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.completeDate).format(`DD MMM yyyy HH:mm`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          || moment(r?.completeDate).format(`MMM yyyy`).toLowerCase().indexOf(key.toLowerCase()) !== -1
          // || r.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || r?.status.toLowerCase().indexOf(key.toLowerCase()) !== -1)
        res.push(r);
    });
    this.reservations = res;
    if (!key)
      this.fetchAllWorkerTasks();
  }
  
  public onSearchAllLikeKey(key: string): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        if (key?.trim() !== '')
          this.managerWorkerAssignmentService.searchAllLikeKey(p?.workerId, key).subscribe({
            next: (payload: any) => {
              const reservationsSet: Set<Reservation> = new Set<Reservation>();
              this.managerWorkerAssignmentResponse = payload?.responseBody;
              this.managerWorkerAssignmentResponse?.tasks?.content?.forEach((t: Task) => reservationsSet.add(t?.reservation));
              this.reservations = Array.from(reservationsSet);
              this.pages = new Array<number>(this.managerWorkerAssignmentResponse?.tasks?.totalPages);
            },
            error: (errorResponse: HttpErrorResponse) =>
              this.errorHandlerService.extractExceptionMsg(errorResponse)
          });
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onSelectPageSize(size: string): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.activatedRoute.queryParams.subscribe({
          next: (q: any) => {
            if (q?.offset === undefined || size.trim() === '' || size === undefined || size === null || parseInt(size.trim()) < 1)
              this.router.navigateByUrl(`/workspace/${this.accountUrl}/workers/assignments/${p?.workerId}?offset=1`);
            else
              this.router.navigateByUrl(`${window.location.pathname}?offset=${q?.offset}&size=${size}`);
          },
          error: (errorResponse: HttpErrorResponse) =>
            this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public onNavigatePagination(offset?: number): string | void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.activatedRoute.queryParams.subscribe({
          next: (q: any) => {
            let url: string = `/workspace/${this.accountUrl}/workers/assignments/${p?.workerId}?offset=${offset}`;
            if (q?.size !== undefined && q?.size !== null && q?.size >= 1)
              url = `${url}&size=${q?.size}`;
            this.router.navigateByUrl(url);
            return url;
          },
          error: (errorResponse: HttpErrorResponse) =>
            this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  
  
}











