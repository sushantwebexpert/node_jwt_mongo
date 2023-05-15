import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

const APP_USER_PROFILE = "dearframes_user"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isLoggedIn = localStorage.getItem(APP_USER_PROFILE);
    if (isLoggedIn) {

      let u = JSON.parse(isLoggedIn);

      if(u.user.role == 'admin') {
        console.log('admin');
        //this.router.navigate(['/admin']);
      }

      if(u.user.role == 'user') {
        //this.router.navigate(['/customer']);
        console.log('user');
      }

      return true
    } else {
      this.router.navigate(['/login']);
    }

    return true;
  }
  
}
