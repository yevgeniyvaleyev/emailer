import { AppConfig, APP_CONFIG } from './config';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  config;

  constructor(private http: HttpClient, injector: Injector) {
    this.config = injector.get(APP_CONFIG);
  }

  getAll () {
    return this.http
      .get(this.config.usersUrl)
  }

}
