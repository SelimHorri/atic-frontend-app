
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  constructor(private authenticationService: AuthenticationService) {}
  
  ngOnInit(): void {
    
  }
  
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public logout(): boolean {
    return this.authenticationService.logout();
  }
  
  
  
}











