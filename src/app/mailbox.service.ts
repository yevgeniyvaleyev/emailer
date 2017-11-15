import { Mailbox } from './models/mailbox.model';
import { MailboxResponse } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './config/interfaces';
import { APP_CONFIG } from './config/tokens';
import { Injectable, Injector, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MailboxService {

  private _currentId: number;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  getAll () {
    return this.http
      .get(this.config.mailboxesApi)
      .map((response: MailboxResponse[]) =>
        response.map(data => new Mailbox(data)))
  }

  getBaseApi () {
    return `${this.config.mailboxesApi}/${this.currentId}`;
  }

  set currentId (id: number) {
    this._currentId = Number(id);
  }

  get currentId (): number {
    return this._currentId;
  }

}
