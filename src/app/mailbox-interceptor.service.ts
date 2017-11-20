import { AppConfig } from './config/interfaces';
import { APP_CONFIG } from './config/tokens';
import { MailboxService } from './mailbox.service';
import { Injectable, Inject, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MailboxInterceptorService implements HttpInterceptor {

  targetSegmentsPattern = /^\/emails|\/cont/;

  constructor(
    private injector: Injector,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: HttpRequest<any>;

    if (this.targetSegmentsPattern.test(req.url)) {
      request = req.clone({
        url: this.getFullUrl(req.url)
      });
    }
    return next.handle(request || req);
  }

  private getFullUrl (initialUrl: string): string {
    const mailboxService = this.injector.get(MailboxService);
    const mailboxId = mailboxService.currentId;
    return `${this.config.mailboxesApi}/${mailboxId}${initialUrl}`;
  }

}
