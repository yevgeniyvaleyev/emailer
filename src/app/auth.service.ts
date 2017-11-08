import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Injectable()
export class AuthService {

  private isAuthenticated = false;

  constructor() {}

  login() {
   return Observable.from([{isAuthenticated: true}])
    .switchMap(({isAuthenticated}) => {
      this.isAuthenticated = isAuthenticated;
      return Observable.from([{isAuthenticated}]);
    })
  }

  logout() {
    return Observable.from([{isAuthenticated: false}])
    .switchMap(({isAuthenticated}) => {
      this.isAuthenticated = isAuthenticated;
      return Observable.from([{isAuthenticated}]);
    })
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }
}

