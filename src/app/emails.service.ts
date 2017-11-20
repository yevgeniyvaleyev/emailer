import { Observable } from 'rxjs/Observable';
import { Email } from './models/email.model';
import { EmailResponse, EmailRequest } from './interfaces';
import { AppConfig } from './config/interfaces';
import { APP_CONFIG } from './config/tokens';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class EmailsService {

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  getAllByType (type: string): Observable<Email[]> {
    return this.http
      .get(`${this.config.emailsApi}/type/${type}`)
      .map((response: EmailResponse[]) =>
        response.map(data => new Email(data)))
  }

  search (term: string, type: string): Observable<Email[]> {
    const params = new HttpParams()
      .set('type', type)
      .set('term', term);

    return this.http
      .get(`${this.config.emailsApi}/search`, { params })
      .map((response: EmailResponse[]) =>
        response.map(data => new Email(data)))
  }

  deleteSelected (ids: number[]): Observable<boolean> {
    const params = new HttpParams()
      .set('ids', JSON.stringify(ids));

    return this.http
      .delete(this.config.emailsApi, { params })
      .map((status: boolean) => status);
  }

  delete (id: number): Observable<boolean> {
    return this.http
      .delete(`${this.config.emailsApi}/${id}`)
      .map((status: boolean) => status);
  }

  send (email: EmailRequest): Observable<boolean> {
    return this.http
      .post(this.config.emailsApi, email)
      .map((status: boolean) => status);
  }

  get (id: number): Observable<Email> {
    return this.http
      .get(`${this.config.emailsApi}/${id}`)
      .map((data: EmailResponse) => new Email(data))
  }

}
