import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const APP_USER_PROFILE = "NG_CRM_USER_2.0"
import { User } from '../models'
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootURL:any = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(user: any) {
      // user.token = "NG_CRM_USER_2.0";
      // user.isAuthenticated = true;
      // localStorage.setItem(APP_USER_PROFILE, JSON.stringify(user));
    // let header = new HttpHeaders();
    // header.set('Access-Control-Allow-Origin', '*');
    // return this.http.get('https://api.twitter.com/2/tweets/search/recent?query=JantarMantar', { headers: header});
    return this.http.post(this.rootURL + '/login', user);
  }

  signup(user: any) {
    return this.http.post(this.rootURL + '/register', user);
  }

  logout() {
    localStorage.removeItem(APP_USER_PROFILE);
  }

  isAuthenticated() {
    let user =   this.getUser() // <User>JSON.parse(localStorage.getItem(APP_USER_PROFILE));
    return user && user.isAuthenticated ? true : false;
  }

  getUser(){
    let user = <User>localStorage.getItem(APP_USER_PROFILE);
    return user;
  }

}
