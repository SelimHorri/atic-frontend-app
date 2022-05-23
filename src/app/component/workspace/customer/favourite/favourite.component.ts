
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerFavouriteResponse } from 'src/app/model/response/customer-favourite-response';
import { Saloon } from 'src/app/model/saloon';
import { CredentialService } from 'src/app/service/credential.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { SaloonService } from 'src/app/service/saloon.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  
  public accountUrl!: string;
  public customerFavouriteResponse!: CustomerFavouriteResponse;
  public saloons: Saloon[] = [];
  
  constructor(private customerService: CustomerService,
    private credentialService: CredentialService,
    private saloonService: SaloonService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getFavourites();
  }
  
  public getFavourites():void {
    this.customerService.getFavourites().subscribe({
      next: (customerFavouritePayload: any) => {
        this.customerFavouriteResponse = customerFavouritePayload?.responseBody;
        this.customerFavouriteResponse?.favourites?.forEach(f => {
          this.saloonService.findById(f?.saloonId).subscribe({
            next: (saloonPayload: any) => {
              this.saloons.push(saloonPayload?.responseBody);
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.errorHandlerService.extractExceptionMsg(errorResponse);
            }
          });
        });
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorHandlerService.extractExceptionMsg(errorResponse);
      }
    });
  }
  
  public removeFavourite(saloonId: number): void {
    this.customerService.deleteFavourite(saloonId).subscribe({
      next: (payload: any) => (payload?.responseBody) ? window.location.reload() : alert("Unable to delete favourite!"),
      error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
    });
  }
  
  
  
}











