
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserRoleBasedAuthority } from '../model/user-role-based-authority';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerGuard implements CanActivateChild {
  
  constructor(private authenticationService: AuthenticationService) { }
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      
    const isUserLoggedIn: boolean = this.authenticationService.isLoggedIn();

    if (isUserLoggedIn) {
      const userRole: string = `${sessionStorage.getItem(`userRole`)}`;
      return userRole === UserRoleBasedAuthority.WORKER
        || userRole === UserRoleBasedAuthority.MANAGER
        || userRole === UserRoleBasedAuthority.OWNER;
    }
    else
      return false;
  }
  
  
  
}
