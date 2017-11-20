import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  private isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated);
  private authStream: Observable<boolean>;

  constructor() {
    this.authStream = this.authSubject
      .do((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        localStorage.setItem('isAuthenticated', String(isAuthenticated))
      })
  }

  login() {
    this.authSubject.next(true);
    return this.authStream;
  }

  logout() {
    this.authSubject.next(false);
    return this.authStream;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }
}

