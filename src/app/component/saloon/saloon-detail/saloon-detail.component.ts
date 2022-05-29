
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Saloon } from 'src/app/model/saloon';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { SaloonService } from 'src/app/service/saloon.service';

@Component({
  selector: 'app-saloon-detail',
  templateUrl: './saloon-detail.component.html',
  styleUrls: ['./saloon-detail.component.scss']
})
export class SaloonDetailComponent implements OnInit {
  
  public saloon!: Saloon;
  
  constructor(private saloonService: SaloonService,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.getSaloon();
  }
  
  public getSaloon(): void {
    this.activatedRoute.params.subscribe({
      next: (p: any) => {
        this.saloonService.findById(p?.id).subscribe({
          next: (saloonPayload: any) => {
            this.saloon = saloonPayload?.responseBody;
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











