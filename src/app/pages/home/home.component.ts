import { Component } from '@angular/core';
import { Router } from '@angular/router';

const APP_USER_PROFILE = "dearframes_user"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(public router: Router) {

      let isLoggedIn = localStorage.getItem(APP_USER_PROFILE);
        if (isLoggedIn) {
        let u = JSON.parse(isLoggedIn);
        if(u.user){
        if(u.user.role == 'admin') {
          this.router.navigate(['/admin']);
        }
        if(u.user.role == 'user') {
          this.router.navigate(['/customer']);
        }
      }
        
      }
    }
}
