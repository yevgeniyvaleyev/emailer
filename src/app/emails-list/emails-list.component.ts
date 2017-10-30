import { Email } from './../models/email.model';
import { EmailsService } from './../emails.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'emails-list',
  templateUrl: './emails-list.component.html',
  styleUrls: ['./emails-list.component.css']
})
export class EmailsListComponent implements OnInit {

  emails: Email[];

  constructor(
    private route: ActivatedRoute,
    private emailsServise: EmailsService
  ) { }

  ngOnInit() {
    this.route.params.switchMap(({type}) =>
      this.emailsServise.getAllByType(type)
    ).subscribe((emails: Email[]) =>
      this.emails = emails
    )

  }

}
