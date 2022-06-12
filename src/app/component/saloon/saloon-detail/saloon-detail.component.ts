
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { Saloon } from 'src/app/model/saloon';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { SaloonService } from 'src/app/service/saloon.service';
import { ServiceDetailService } from 'src/app/service/service-detail.service';

@Component({
  selector: 'app-saloon-detail',
  templateUrl: './saloon-detail.component.html',
  styleUrls: ['./saloon-detail.component.scss']
})
export class SaloonDetailComponent implements OnInit {
  
  public saloon!: Saloon;
  public serviceDetails!: PageResponse;
  public categories: Category[] = [];
  
  constructor(private saloonService: SaloonService,
    private serviceDetailService: ServiceDetailService,
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
            this.getAllServiceDetails(p?.id);
            
          },
          error: (errorResponse: HttpErrorResponse) =>
              this.errorHandlerService.extractExceptionMsg(errorResponse)
        });
      },
      error: (errorResponse: HttpErrorResponse) =>
          this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  public getAllServiceDetails(saloonId: number): void {
    this.serviceDetailService.findAllByCategorySaloonId(saloonId).subscribe({
      next: (serviceDetailPayload: any) => {
        this.serviceDetails = serviceDetailPayload?.responseBody;
        
        const categoriesSet = new Set<Category>();
        this.serviceDetails?.content?.forEach(sd => categoriesSet.add(sd?.category));
        this.categories = Array.from(categoriesSet); // TODO: Remove redundants ********
        
        console.log(JSON.stringify(this.categories));
      },
      error: (errorResponse: HttpErrorResponse) =>
          this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  private onChooseServiceDetail(serviceDetailId: number): void {
    // this.onOpenModal("createReservation");
  }
  
  
  
}











