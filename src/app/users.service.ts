import { User } from './models/user.model';
import { AppConfig } from './config/interfaces';
import { APP_CONFIG } from './config/tokens';
import { UserResponse, UserRequest } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, Inject, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  getAll () {
    return this.http
      .get(this.config.usersApi)
      .map((response: UserResponse[]) =>
        response.map(data => new User(data)))
  }

  get (id: string) {
    return this.http
      .get(`${this.config.usersApi}/${id}`)
      .map((data: UserResponse) => new User(data))
  }

  removeById (id: string) {
    return this.http
      .delete(`${this.config.usersApi}/${id}`);
  }

  add (data: UserRequest) {
    return this.http
      .put(this.config.usersApi, data)
  }

  isUniqueEmail (email: string) {
    return this.http
      .get(`${this.config.usersApi}/by-email/${email}`)
      .map((users: UserResponse[]) => users.length === 0)
  }

}
