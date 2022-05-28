
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { LocationService } from 'src/app/service/location.service';
import { SaloonService } from 'src/app/service/saloon.service';

@Component({
  selector: 'app-saloon',
  templateUrl: './saloon.component.html',
  styleUrls: ['./saloon.component.scss']
})
export class SaloonComponent implements OnInit {
  
  public saloons!: PageResponse;
  public locations!: PageResponse;
  public pages!: Array<number>;
  
  constructor(private saloonService: SaloonService,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.findAllSaloons();
    this.pages = new Array<number>(this.saloons?.totalPages);
  }
  
  private findAll(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        if (q?.offset === undefined || q?.offset === null || q?.offset as number < 1)
          this.router.navigateByUrl("/saloons?offset=1");
        else {
          this.locationService.findAll(q?.offset).subscribe({
            next: (locationsPayload: any) => {
              this.locations = locationsPayload?.responseBody;
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.errorHandlerService.extractExceptionMsg(errorResponse);
            }
          });
          this.saloonService.findAll(new ClientPageRequest(q?.offset)).subscribe({
            next: (saloonsPayload: any) => {
              this.saloons = saloonsPayload?.responseBody;
              console.log(JSON.stringify(this.saloons))
              this.pages = new Array<number>(this.saloons?.totalPages);
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.errorHandlerService.extractExceptionMsg(errorResponse);
            }
          });
        }
      }
    });
  }
  
  public findAllSaloons(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.activatedRoute.queryParams.subscribe({
          next: (q: any) => {
            if (p?.state === undefined || p?.state === null)
              this.findAll();
            else if (q?.offset === undefined || q?.offset === null || q?.offset as number < 1)
              this.router.navigateByUrl(`/locations/${p?.state}/saloons?offset=1`);
            else {
              this.locationService.findAll(q?.offset).subscribe({
                next: (locationsPayload: any) => {
                  this.locations = locationsPayload?.responseBody;
                },
                error: (errorResponse: HttpErrorResponse) => {
                  this.errorHandlerService.extractExceptionMsg(errorResponse);
                }
              });
              this.saloonService.findAllByLocationState(p?.state, q?.offset).subscribe({
                next: (saloonsPayload: any) => {
                  this.saloons = saloonsPayload?.responseBody;
                  this.pages = new Array<number>(this.saloons?.totalPages);
                },
                error: (errorResponse: HttpErrorResponse) => {
                  this.errorHandlerService.extractExceptionMsg(errorResponse);
                }
              });
            }
          }
        });
      }
    });
  }
  
  public getAllByCode(code: string): void {
    this.saloonService.findAllByCode(code).subscribe({
      next: (saloonsPayload: any) => {
        this.saloons = saloonsPayload?.responseBody;
        this.pages = new Array<number>(this.saloons?.totalPages);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorHandlerService.extractExceptionMsg(errorResponse);
      }
    });
  }
  
  public onNavigatePagination(offset?: number, newTotalPages?: number): string | void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        let url: string = `/saloons?offset=${offset}`;
        if (q?.size !== undefined && q?.size !== null && q?.size >= 1)
          url = `${url}&size=${q?.size}`;
        this.router.navigateByUrl(url);
        if (newTotalPages === undefined)
          this.pages = new Array<number>(this.saloons?.totalPages);
        else
          this.pages = new Array<number>(newTotalPages);
        return url;
      }
    });
  }
  
  
  
}










