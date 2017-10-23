import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  getAll () {
    return this.http
      .get('/assets/users.json')
      .map((response) => response.json());
  }

}
