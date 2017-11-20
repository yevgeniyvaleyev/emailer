import { Observable } from 'rxjs/Observable';
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
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  getAll (): Observable<Contact[]> {
    return this.http
      .get(this.config.contactsApi)
      .map((response: ContactResponse[]) =>
        response.map(data => new Contact(data)))
  }

  get (id: string): Observable<Contact> {
    return this.http
      .get(`${this.config.contactsApi}/${id}`)
      .map((data: ContactResponse) => new Contact(data))
  }

  removeById (id: string): Observable<boolean> {
    return this.http
      .delete(`${this.config.contactsApi}/${id}`)
      .map((status: boolean) => status);
  }

  add (data: ContactRequest): Observable<boolean> {
    return this.http
      .post(this.config.contactsApi, data)
      .map((status: boolean) => status);
  }

  update (id: string, data: ContactRequest): Observable<Contact> {
    return this.http
      .put(`${this.config.contactsApi}/${id}`, data)
      .map((data: ContactResponse) => new Contact(data))
  }

  isUniqueEmail (email: string): Observable<boolean> {
    return this.http
      .get(`${this.config.contactsApi}/by-email/${email}`)
      .delay(1000) // for demonstration
      .map((contacts: ContactResponse[]) => contacts.length === 0)
  }

}
