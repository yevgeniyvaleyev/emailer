import { Mailbox } from './models/mailbox.model';
import { MailboxResponse } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './config/interfaces';
import { APP_CONFIG } from './config/tokens';
import { Injectable, Injector, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MailboxService {

  private _currentId: number;
  private updateStream = new Subject<number>();

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  getAll (): Observable<Mailbox[]> {
    return this.http
      .get(this.config.mailboxesApi)
      .map((response: MailboxResponse[]) =>
        response.map(data => new Mailbox(data)))
  }

  getBaseApi (): string {
    return `${this.config.mailboxesApi}/${this.currentId}`;
  }

  set currentId (id: number) {
    this._currentId = Number(id);
    this.updateStream.next(id);
  }

  get currentId (): number {
    return this._currentId;
  }

  getId (): Observable<number> {
    return this.updateStream;
  }

}
