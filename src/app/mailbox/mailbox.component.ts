import { ActivatedRoute } from '@angular/router';
import { MailboxService } from './../mailbox.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private mailboxService: MailboxService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({boxid}) => {
      this.mailboxService.currentId = boxid;
    })
  }

}
