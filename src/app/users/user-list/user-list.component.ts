import { Component } from '@angular/core';
import { cilUser, cilLockLocked } from '@coreui/icons'
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ApiService } from "../../services/api.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const APP_USER_PROFILE = "dearframes_user"

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
public visible = false;
dltID = null;
customers:any;
   users:any;
   et:any;
   uId:any;
  clr:any = '#E91E63';
  showErr: Boolean = false;
  loading: Boolean = false;
 constructor(
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private auth: AuthService,
      private api: ApiService,
    ) { 
  }

    ngAfterViewInit() {
      setTimeout(() => {
        this.getCustomers();
      })
  }

    getCustomers() {
        let isLoggedIn:any = localStorage.getItem(APP_USER_PROFILE);
        if (isLoggedIn) {
          let _user = JSON.parse(isLoggedIn);
          console.log(_user);
          if(_user.user.role == 'admin') {
              this.api
                .getAll('users')
                .subscribe(
                  (data:any) => {
                    this.customers = data;
                  },
                error => {}
              );
          }
        }

  }


  tryDelete(id:any) {
      this.visible = true;
      this.dltID = id;
  }

  doDelete() {

    console.log(this.dltID);
this.visible = false;
    this.api.deleteOne('users', this.dltID)
              .subscribe(
                  data => {
                      this.showErrM('User deleted!','#4caf50');
                      this.getCustomers();
                  },
                  error => {
                      this.showErrM(error.error.errors.msg);
                  }
            );

  }

  cancelMe() {
this.visible = false;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
 showErrM(msg:any,clr:any = '#E91E63') {
    this.et = msg;
    this.clr = clr;
    this.showErr = true;
    this.loading = false;
  }
}
