
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoleBasedAuthority } from '../model/user-role-based-authority';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivateChild {
  
  constructor(private authenticationService: AuthenticationService) {}
  
  canActivateChild(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
    const isUserLoggedIn: boolean = this.authenticationService.isLoggedIn();
    
    if (isUserLoggedIn) {
      const userRole: string = `${sessionStorage.getItem(`userRole`)}`;
      console.log(`Herrreee is from guard: userRole => ${userRole}`);
      return userRole === UserRoleBasedAuthority.CUSTOMER
        || userRole === UserRoleBasedAuthority.WORKER
        || userRole === UserRoleBasedAuthority.MANAGER
        || userRole === UserRoleBasedAuthority.OWNER;
    }
    else
      return false;
  }
  
  
  
}








