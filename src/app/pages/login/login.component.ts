import { Component } from '@angular/core';
import { cilUser, cilLockLocked } from '@coreui/icons'
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const APP_USER_PROFILE = "dearframes_user"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    icons = { cilUser, cilLockLocked };
    et:any = '';
    loading: Boolean = false;

    loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private auth: AuthService
    ) {

    let isLoggedIn = localStorage.getItem(APP_USER_PROFILE);

    if (isLoggedIn) {

      let u = JSON.parse(isLoggedIn);
      if(u.user) {
              if(u.user.role == 'admin') {
        this.router.navigate(['/admin']);
      }

      if(u.user.role == 'user') {
        this.router.navigate(['/customer']);
      }
      }


    }
  }

    login() {

      this.et = '';
      this.loading = true;
     // localStorage.setItem(APP_USER_PROFILE, JSON.stringify(this.loginForm.value));
     // return false;


      this.auth.login(this.loginForm.value).subscribe((data:any)=> {
        console.clear();
        if(data.token) {

          localStorage.setItem(APP_USER_PROFILE, JSON.stringify(data));

          if(data.user.role == 'admin') {
            this.router.navigate(['/admin']);
          }

          if(data.user.role == 'user') {
            this.router.navigate(['/customer']);
          }
            this.loading = false;
        }
      },(err)=>{
        let m = err.error.errors.msg;
        console.log(typeof m);
          if(typeof m == 'object') {
            this.et = m[0].msg
           // Object.entries(m).forEach((val:any, key) => {console.log(val[1]);this.et += ' ' + val[1].msg});
          } 
          if(typeof m == 'string')  {
            this.et = m;
          }
          this.loading = false;
          // console.clear();
      });
    }

}
