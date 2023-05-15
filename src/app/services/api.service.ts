import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const APP_USER_PROFILE = "dearframes_user"
import { User } from '../models'
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rootURL:any = 'http://localhost:3000';
  user:any=null;
  header:any;

  constructor(private http: HttpClient) {
    let isLoggedIn:any = localStorage.getItem(APP_USER_PROFILE);
    if (isLoggedIn) {
      this.user = JSON.parse(isLoggedIn);
    }
  }


  removeBg(data: any) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    return this.http.post('http://ec2-65-0-185-189.ap-south-1.compute.amazonaws.com/remove', data, { headers: header, responseType: 'text' });
  }

    getAll(route: string) {
      
      return this.http.get(
        this.rootURL + '/' + route + '/all', { headers: ({'Authorization': 'Bearer ' + this.user.token }) }
      );

    }

     getOne(route: string, itemId: any) {

        return this.http.get( 
            this.rootURL + '/' + route + '/' + itemId, { headers: ({'Authorization': 'Bearer ' + this.user.token }) }
        );

    }

    getProfile() {

        return this.http.get( 
            this.rootURL + '/profile', { headers: ({'Authorization': 'Bearer ' + this.user.token }) }
        );

    }

    addNew(route: string, body: any) {

        return this.http.post( 
            this.rootURL + '/' + route, body, { headers: ({'Authorization': 'Bearer ' + this.user.token }) }
        );

    }

    updateOne(route: string, itemId: any, body: any) {

        return this.http.patch(
            this.rootURL + '/' + route + '/' + itemId, body, { headers: ({'Authorization': 'Bearer ' + this.user.token }) }
        );

    }

    updatePassword(user: any) {

        return this.http.post(
            this.rootURL + '/profile/changePassword' , user, { headers: ({'Authorization': 'Bearer ' + this.user.token }) }
        );

    }

    deleteOne(route: string, itemId: any) {

        return this.http.delete(
            this.rootURL + '/' + route + '/' + itemId, { headers: ({'Authorization': 'Bearer ' + this.user.token }) }
        );

    }


}
