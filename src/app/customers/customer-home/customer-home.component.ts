import { Component, ChangeDetectionStrategy } from '@angular/core';
const APP_USER_PROFILE = "dearframes_user"
import { ApiService } from "../../services/api.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent {
    rtime:any = 0;
    userForm:any = {};
   users:any;
loading: Boolean = false;
config:any = { leftTime: 1 * 60 * 60, format: 'hh:mm:ss' };;
    constructor(private router: Router,private api: ApiService,) {
      
         setTimeout(() => {
            this.getOne();
          })
    }


    getOne() {

        this.loading = true;
        this.api
            .getProfile()
            .subscribe(
                (data:any) => {
                  console.log(data);
                    this.loading = false;
                    this.users = data;
                    data.services.forEach((f:any) => {
                      this.userForm[f] = true;
                    });
                    this.rtime = data.time;
                    this.config = { leftTime: data.time * 60 * 60, format: 'hh:mm:ss' };
                  console.log(this.config);

                },
                error => {
                    this.loading = false;
                }
            );
    }

    openValue(v:any,link:any = '') {

      if( this.userForm[v] ){ console.log(link);
        this.router.navigate([link]);
      }
    }

    handleEvent(event:any) {
        if(event.action == "done" ) {
            alert("Times up!!!");
        }
                  console.log(event);

    }
    
}
