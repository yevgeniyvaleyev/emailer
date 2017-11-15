import { MailboxService } from './mailbox.service';
import { User } from './models/user.model';
import { AppConfig } from './config/interfaces';
import { APP_CONFIG } from './config/tokens';
import { UserResponse, UserRequest } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, Inject, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(
    private http: HttpClient,
    private mailboxService: MailboxService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  private getUsersApi () {
    return this.mailboxService.getBaseApi() + this.config.usersApi;
  }

  getAll () {
    return this.http
      .get(this.getUsersApi())
      .map((response: UserResponse[]) =>
        response.map(data => new User(data)))
  }

  get (id: string) {
    return this.http
      .get(`${this.getUsersApi()}/${id}`)
      .map((data: UserResponse) => new User(data))
  }

  removeById (id: string) {
    return this.http
      .delete(`${this.getUsersApi()}/${id}`);
  }

  add (data: UserRequest) {
    return this.http
      .put(this.getUsersApi(), data)
  }

  isUniqueEmail (email: string) {
    return this.http
      .get(`${this.getUsersApi()}/by-email/${email}`)
      .map((users: UserResponse[]) => users.length === 0)
  }

}
