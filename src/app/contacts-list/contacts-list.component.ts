import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ContactsService } from '../contacts.service';
import { ContactSelectionData, ContactRequest } from '../interfaces';
import * as utils from '../utils';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Contact[];
  selectedContactId: string|null;

  constructor(
    private router: Router,
    private contactsService: ContactsService
  ) {}

  ngOnInit () {
    this.getContacts();
  }

  getContacts () {
    this.contactsService
      .getAll()
      .subscribe((contacts: Contact[]) => this.contacts = contacts);
  }

  deleteContact ({id}: ContactSelectionData) {
    this.contactsService
      .removeById(id)
      .subscribe(() => this.getContacts())
  }

  addContact (data: ContactRequest) {
    this.contactsService
      .add(data)
      .subscribe(() => this.getContacts());
  }

  toggleContactSelection ({id}: ContactSelectionData) {
    this.selectedContactId = (this.selectedContactId !== id) ? id : null;
  }

}
