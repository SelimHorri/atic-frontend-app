
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoleBasedAuthority } from '../model/user-role-based-authority';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivateChild {
  
  constructor(private authenticationService: AuthenticationService) { }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isUserLoggedIn: boolean = this.authenticationService.isLoggedIn();
    
    if (isUserLoggedIn) {
      const userRole: string = `${sessionStorage.getItem(`userRole`)}`;
      console.log(`Herrreee is from guard: userRole => ${userRole}`);
      return userRole === UserRoleBasedAuthority.OWNER;
    }
    else
      return false;
  }
  
  
  
}
