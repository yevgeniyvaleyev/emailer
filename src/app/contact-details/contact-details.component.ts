import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ContactsService } from '../contacts.service';
import { ContactSelectionData, ContactRequest } from '../interfaces';
import * as utils from '../utils';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.route.params.switchMap(({id}) =>
      this.contactsService.get(id)
    )
    .subscribe((contact: Contact) => this.contact = contact)
  }

  deleteContact ({id}: ContactSelectionData) {
    this.contactsService
      .removeById(id)
      .subscribe(() => {
        this.router.navigate(['/contacts'])
      })
  }

}
