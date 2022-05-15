
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from 'src/app/model/location';
import { ApiPayloadSaloonList } from 'src/app/model/response/api/api-payload-saloon-list';
import { Saloon } from 'src/app/model/saloon';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { LocationService } from 'src/app/service/location.service';
import { SaloonService } from 'src/app/service/saloon.service';

@Component({
  selector: 'app-saloon',
  templateUrl: './saloon.component.html',
  styleUrls: ['./saloon.component.scss']
})
export class SaloonComponent implements OnInit {
  
  public saloons: Saloon[] = [];
  public locations: Location[] = [];
  
  constructor(private saloonService: SaloonService,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.findAllSaloons();
  }
  
  private findAll(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (p: any) => {
        
        if (p?.offset === undefined || p?.offset === null || p?.offset as number < 1)
          this.router.navigateByUrl("/saloons?offset=1");
        else {
          
          this.locationService.findAll(p?.offset).subscribe({
            next: (locationsPayload: any) => {
              this.locations = locationsPayload?.responseBody;
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.errorHandlerService.extractExceptionMsg(errorResponse);
            }
          });
          
          this.saloonService.findAllWithOffset(p?.offset).subscribe({
            next: (saloonsPayload: ApiPayloadSaloonList) => {
              this.saloons = saloonsPayload?.responseBody;
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
                next: (saloonsPayload: ApiPayloadSaloonList) => {
                  this.saloons = saloonsPayload?.responseBody;
                },
                error: (errorResponse: HttpErrorResponse) => {
                  this.errorHandlerService.extractExceptionMsg(errorResponse);
                }
              });
              
            }
            
            // this.state = p?.state;
            
          }
        });
      }
    });
  }
  
  
  
}










