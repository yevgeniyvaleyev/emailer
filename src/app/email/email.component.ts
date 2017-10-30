import { Component, OnInit } from '@angular/core';
import { EmailsService } from './../emails.service';
import { Email } from './../models/email.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  email: Email;

  constructor(
    private route: ActivatedRoute,
    private emailsServise: EmailsService
  ) { }

  ngOnInit() {
    this.route.params.switchMap(({id}) =>
    this.emailsServise.get(Number(id))
  ).subscribe((email: Email) =>
    this.email = email
  )
  }

}
