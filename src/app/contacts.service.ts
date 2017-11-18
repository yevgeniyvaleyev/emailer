import { Observable } from 'rxjs/Observable';
import { MailboxService } from './mailbox.service';
import { Contact } from './models/contact.model';
import { AppConfig } from './config/interfaces';
import { APP_CONFIG } from './config/tokens';
import { ContactResponse, ContactRequest } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, Inject, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class ContactsService {

  constructor(
    private http: HttpClient,
    private mailboxService: MailboxService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  private getContactsApi (): string {
    return this.mailboxService.getBaseApi() + this.config.contactsApi;
  }

  getAll (): Observable<Contact[]> {
    return this.http
      .get(this.getContactsApi())
      .map((response: ContactResponse[]) =>
        response.map(data => new Contact(data)))
  }

  get (id: string): Observable<Contact> {
    return this.http
      .get(`${this.getContactsApi()}/${id}`)
      .map((data: ContactResponse) => new Contact(data))
  }

  removeById (id: string): Observable<boolean> {
    return this.http
      .delete(`${this.getContactsApi()}/${id}`)
      .map((status: boolean) => status);
  }

  add (data: ContactRequest): Observable<boolean> {
    return this.http
      .post(this.getContactsApi(), data)
      .map((status: boolean) => status);
  }

  update (id: string, data: ContactRequest): Observable<Contact> {
    return this.http
      .put(`${this.getContactsApi()}/${id}`, data)
      .map((data: ContactResponse) => new Contact(data))
  }

  isUniqueEmail (email: string): Observable<boolean> {
    return this.http
      .get(`${this.getContactsApi()}/by-email/${email}`)
      .delay(1000) // for demonstration
      .map((contacts: ContactResponse[]) => contacts.length === 0)
  }

}
