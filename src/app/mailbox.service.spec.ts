import { MailboxResponse } from './interfaces';
import { Mailbox } from './models/mailbox.model';
import { APP_CONFIG_DATA } from './config/config';
import { APP_CONFIG } from './config/tokens';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { MailboxService } from './mailbox.service';
import { Observable } from 'rxjs/Observable';


describe('MailboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: APP_CONFIG, useValue: APP_CONFIG_DATA },
        MailboxService
      ]
    });
  });

  it('should reurn all mailboxes', inject([MailboxService, HttpTestingController],
    (service: MailboxService, backend: HttpTestingController) => {
      const mailboxMock: MailboxResponse = {
        id: 1,
        email: 'test@test.com'
      }
      service.getAll().subscribe((mailboxes: Mailbox[]) => {
        const mailBoxInstance = new Mailbox(mailboxMock);
        expect(mailboxes).toEqual([mailBoxInstance]);
      });
      backend.expectOne({
        method: 'GET',
        url: '/api/mailboxes'
      }).flush([mailboxMock])
  }));
});
