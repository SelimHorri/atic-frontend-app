
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiPayloadSaloonList } from 'src/app/model/response/api/api-payload-saloon-list';
import { Saloon } from 'src/app/model/saloon';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { SaloonService } from 'src/app/service/saloon.service';

@Component({
  selector: 'app-saloon',
  templateUrl: './saloon.component.html',
  styleUrls: ['./saloon.component.scss']
})
export class SaloonComponent implements OnInit {
  
  public saloons: Saloon[] = [];
  
  constructor(private saloonService: SaloonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.findAll();
  }
  
  public findAll(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (p: any) => {
        if (p?.offset === undefined || p?.offset === null || p?.offset as number < 1)
          this.router.navigateByUrl("/saloon?offset=1");
        else {
          
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
  
  
  
}










