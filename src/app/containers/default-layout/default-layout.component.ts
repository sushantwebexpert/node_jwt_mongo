import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { navItems } from './_nav';
const APP_USER_PROFILE = "dearframes_user"


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  role:any = 'customer';

  constructor(private router: Router) {
    
    let u = localStorage.getItem(APP_USER_PROFILE);

    if(u) {
      let _user = JSON.parse(u);
      if(_user.user){
        this.role = _user.user.role;
      }
      
    }


  }

    logout() {
    localStorage.removeItem(APP_USER_PROFILE);
    this.router.navigate(['/login']);
  }

}
