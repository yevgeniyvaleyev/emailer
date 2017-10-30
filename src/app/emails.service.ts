import { Email } from './models/email.model';
import { EmailData } from './interfaces';
import { AppConfig } from './config/interfaces';
import { APP_CONFIG } from './config/tokens';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class EmailsService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  getAllByType (type: string) {
    return this.http
      .get(`${this.config.emailsApi}/type/${type}`)
      .map((response: EmailData[]) =>
        response.map(data => new Email(data)))
  }

  get (id: number) {
    return this.http
      .get(`${this.config.emailsApi}/${id}`)
      .map((data: EmailData) => new Email(data))
  }

}
