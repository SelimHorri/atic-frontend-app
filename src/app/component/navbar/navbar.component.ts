
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserRoleBasedAuthority } from 'src/app/model/user-role-based-authority';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CredentialService } from 'src/app/service/credential.service';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  public accountUrl!: string;
  public authenticatedUsername: string = `${sessionStorage.getItem(`username`)}`;
  public items!: any[];
  
  constructor(private authenticationService: AuthenticationService,
    private credentialService: CredentialService,
    private errorHandlerService: ErrorHandlerService) {}
  
  ngOnInit(): void {
    this.getAccountUrl();
    this.items = this.getItemsBasedOnUserRole();
  }
  
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  
  public logout(): boolean {
    return this.authenticationService.logout();
  }
  
  private getAccountUrl(): void {
    
    if (this.authenticationService.isLoggedIn()) { // this check prevent jwt irrelevant exception on backend
      const username: string = `${sessionStorage.getItem("username")}`;
      
      this.credentialService.findByUsername(username).subscribe({
        next: (credentialPayload: any) =>
          this.accountUrl = this.credentialService.getUserRole(`${sessionStorage.getItem("userRole")}`),
        error: (errorResponse: HttpErrorResponse) =>
            this.errorHandlerService.extractExceptionMsg(errorResponse)
      });
    }
    
  }
  
  private getItemsBasedOnUserRole(): any[] {
    if (`${sessionStorage.getItem("userRole")}` === UserRoleBasedAuthority.CUSTOMER)
      return this.items = this.getCustomerItems();
    else if (`${sessionStorage.getItem("userRole")}` === UserRoleBasedAuthority.WORKER)
      return this.getWorkerItems();
    else if (`${sessionStorage.getItem("userRole")}` === UserRoleBasedAuthority.MANAGER)
      return this.getManagerItems();
    else if (`${sessionStorage.getItem("userRole")}` === UserRoleBasedAuthority.OWNER)
      return this.getOwnerItems();
    else
      return [];
  }

  private getCustomerItems(): any[] {
    return [
      {
        name: "Reservations",
        link: "reservations",
        subItems: [
          {
            name: "Appointments",
            link: "reservations",
            subItems: []
          },
        ]
      },
      {
        name: "Favourites",
        link: "favourites",
        subItems: []
      },
      {
        name: "Ratings",
        link: "ratings",
        subItems: []
      },
    ];
  }
  
  private getWorkerItems(): any[] {
    return [
      {
        name: "Reservations",
        link: "reservations",
        subItems: []
      },
    ];
  }

  private getManagerItems(): any[] {
    return [
      {
        name: "Reservations",
        link: "reservations",
        subItems: []
      },
      {
        name: "Workers",
        link: "workers",
        subItems: []
      },
      {
        name: "Categories",
        link: "categories",
        subItems: []
      },
      {
        name: "Services",
        link: "services",
        subItems: []
      },
    ];
  }

  private getOwnerItems(): any[] {
    return [];
  }
  
  
  
}











