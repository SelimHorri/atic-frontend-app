
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrMsg } from 'src/app/model/toastr-msg';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  
  constructor(private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.logout();
  }
  
  public logout(): boolean {
    const isLoggedOut = this.authenticationService.logout();
    this.router.navigateByUrl("/login");
    this.notificationService.showInfo(new ToastrMsg("You've been logged out...", "Logged Out!"));
    return isLoggedOut;
  }
  
  
  
}








