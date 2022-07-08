
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SaloonDetailGuard implements CanActivate {
  
  constructor(private authenticationService: AuthenticationService,
    private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn: boolean = this.authenticationService.isLoggedIn();
    if (!isLoggedIn)
      this.router.navigateByUrl(`/login`);
    return isLoggedIn;
  }
  
  
  
}











