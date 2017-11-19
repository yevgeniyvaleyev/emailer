import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from './../models/contact.model';
import { ContactsService } from './../contacts.service';
import { EmailsService } from './../emails.service';
import { EmailRequest } from './../interfaces';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactValidators } from './../validators/contact.validator';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  styleUrls: ['./email-compose.component.css']
})
export class EmailComposeComponent implements OnInit {

  contacts: Contact[] = [];
  returnUrl: string;

  composeEmailForm: AbstractControl = new FormGroup({
    body: new FormControl('', []),
    subject: new FormControl('', []),
    to: new FormControl('', [
      ContactValidators.correctEmail,
      Validators.required
    ])
  })

  constructor(
    private emailsService: EmailsService,
    private contactsService: ContactsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactValidators: ContactValidators
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe((params) => {
        this.returnUrl = params.targetUrl;
      });
    this.contactsService.getAll()
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      })
  }

  get to () {
    return this.composeEmailForm.get('to');
  }

  get subject () {
    return this.composeEmailForm.get('subject');
  }

  get body () {
    return this.composeEmailForm.get('body');
  }

  send () {
    let email: EmailRequest = this.composeEmailForm.value;

    this.emailsService
      .send(email)
      .subscribe((status: boolean) => {
        this.composeEmailForm.reset();
        this.router.navigate([this.returnUrl]);
      })
  }

}
