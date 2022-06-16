
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Favourite } from 'src/app/model/favourite';
import { ClientPageRequest } from 'src/app/model/request/client-page-request';
import { CustomerFavouriteResponse } from 'src/app/model/response/customer-favourite-response';
import { PageResponse } from 'src/app/model/response/page/page-response';
import { Saloon } from 'src/app/model/saloon';
import { CredentialService } from 'src/app/service/credential.service';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerFavouriteService } from 'src/app/service/customer/customer-favourite.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { LocationService } from 'src/app/service/location.service';
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
  public states: string[] = [];
  public pages: number[] = [];
  
  constructor(private customerFavouriteService: CustomerFavouriteService,
    private locationService: LocationService,
    private credentialService: CredentialService,
    private saloonService: SaloonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`);
    this.getAllStates();
    this.getFavourites();
  }
  
  public getAllStates(): void {
    this.locationService.getAllStates().subscribe({
      next: (statesPayload: any) => {
        this.states = statesPayload?.responseBody;
      }
    });
  }
  
  public getFavourites():void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        if (q?.offset === undefined || q?.offset === null || q?.offset as number === 1)
          this.router.navigateByUrl(`/workspace/${this.accountUrl}/favourites?offset=1`);
        else {
          this.customerFavouriteService.getFavourites(new ClientPageRequest(q?.offset, q?.size)).subscribe({
            next: (customerFavouritePayload: any) => {
              this.customerFavouriteResponse = customerFavouritePayload?.responseBody;
              this.pages = new Array<number>(this.customerFavouriteResponse?.favourites?.totalPages);
              this.customerFavouriteResponse?.favourites?.content?.forEach(f => {
                this.saloonService.findById(f?.saloonId).subscribe({
                  next: (saloonPayload: any) => {
                    this.saloons.push(saloonPayload?.responseBody);
                    // this.favourites = this.customerFavouriteResponse?.favourites;
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
      }
    });
  }
  
  public onNavigatePagination(offset?: number): string | void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        let url: string = `/workspace/${this.accountUrl}/favourites?offset=${offset}`;
        if (q?.size !== undefined && q?.size !== null && q?.size >= 1)
          url = `${url}&size=${q?.size}`;
        // this.router.navigateByUrl(url);
        window.location.replace(url); // cause of the forloop in getFavourites()
        return url;
      }
    });
  }
  
  public onSelectPageSize(size: string): void {
    this.activatedRoute.queryParams.subscribe({
      next: (q: any) => {
        if (q?.offset === undefined || size.trim() === '' || size === undefined || size === null || parseInt(size.trim()) < 1)
          window.location.replace(`/workspace/${this.accountUrl}/favourites?offset=1`);
        else
          window.location.replace(`${window.location.pathname}?offset=${q?.offset}&size=${size}`);
      }
    });
  }
  
  public removeFavourite(saloonId: number): void {
    if (confirm(`Remove from favourite ?`))
      this.customerFavouriteService.deleteFavourite(saloonId).subscribe({
        next: (payload: any) => (payload?.responseBody) ? window.location.reload() : alert("Unable to delete favourite!"),
        error: (errorResponse: HttpErrorResponse) => this.errorHandlerService.extractExceptionMsg(errorResponse)
      });
  }
  
  public searchBy(key: string): void {
    const res: Saloon[] = [];
    this.saloons?.forEach(s => {
      if ( s?.name.toLowerCase().trim().indexOf(key.toLowerCase()) !== -1
          || s?.code.toLowerCase().trim().indexOf(key.toLowerCase()) !== -1
          || s?.openingDate.toString().toLowerCase().trim().indexOf(key.toLowerCase()) !== -1
          || s?.email.toLowerCase().trim().indexOf(key.toLowerCase()) !== -1
          || s?.fullAdr.toLowerCase().trim().indexOf(key.toLowerCase()) !== -1
          || `${s?.location.zipcode} ${s?.location.city} ${s?.location.state}`.toLowerCase().trim().indexOf(key.toLowerCase()) !== -1 )
        res.push(s);
    });
    
    this.saloons = res;
    if (res.length === 0 || !key)
      this.getFavourites();
  }
  
  
  
}











