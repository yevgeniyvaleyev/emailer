import { User } from './user.model';
import { UserResponse, UserRequest } from './interfaces';
import { AppConfig, APP_CONFIG } from './config';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  config;

  constructor(private http: HttpClient, private injector: Injector) {
    this.config = this.injector.get(APP_CONFIG);
  }

  getAll () {
    return this.http
      .get(this.config.usersApi)
      .map((response: UserResponse[]) =>
        response.map(user => new User(user)))
  }

  removeById (id: string) {
    return this.http
      .delete(`${this.config.usersApi}/${id}`, {
        responseType: 'text'
      })
  }

  add (data: UserRequest) {
    return this.http
      .post(this.config.usersApi, data)
  }

}
