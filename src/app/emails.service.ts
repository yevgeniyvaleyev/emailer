import { Observable } from 'rxjs/Observable';
import { MailboxService } from './mailbox.service';
import { Email } from './models/email.model';
import { EmailData } from './interfaces';
import { AppConfig } from './config/interfaces';
import { APP_CONFIG } from './config/tokens';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class EmailsService {

  constructor(
    private http: HttpClient,
    private mailboxService: MailboxService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  private getEmailsApi (): string {
    return this.mailboxService.getBaseApi() + this.config.emailsApi;
  }

  getAllByType (type: string): Observable<Email[]> {
    return this.http
      .get(`${this.getEmailsApi()}/type/${type}`)
      .map((response: EmailData[]) =>
        response.map(data => new Email(data)))
  }

  search (term: string, type: string): Observable<Email[]> {
    const params = new HttpParams()
      .set('type', type)
      .set('term', term);

    return this.http
      .get(`${this.getEmailsApi()}/search`, { params })
      .map((response: EmailData[]) =>
        response.map(data => new Email(data)))
  }

  deleteSelected (ids: number[]): Observable<boolean> {
    const params = new HttpParams()
      .set('ids', JSON.stringify(ids));

    return this.http
      .delete(this.getEmailsApi(), { params })
      .map((status: boolean) => status);
  }

  delete (id: number): Observable<boolean> {
    return this.http
      .delete(`${this.getEmailsApi()}/${id}`)
      .map((status: boolean) => status);
  }

  get (id: number): Observable<Email> {
    return this.http
      .get(`${this.getEmailsApi()}/${id}`)
      .map((data: EmailData) => new Email(data))
  }

}
