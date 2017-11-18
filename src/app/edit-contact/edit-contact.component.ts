import { Contact } from './../models/contact.model';
import { email } from './../validators/patterns';
import { ContactValidators } from './../validators/contact.validator';
import { ContactRequest } from './../interfaces';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class AddContactComponent implements OnInit {

  @Input('contact') contact?: Contact
  @Input('isNew') isNew: Contact
  @Output('onUpdate') onUpdate = new EventEmitter();

  form

  constructor(private contactValidators: ContactValidators) { }

  ngOnInit() {
    this.form = this.createForm();
    if (this.contact) {
      const initialData = this.getInitialFormData(this.contact);
      this.form.setValue(initialData)
    }
  }

  get name () {
    return this.form.get('name');
  }

  get email () {
    return this.form.get('email');
  }

  createForm () {
    let emailAsyncValidators = [];

    if (this.isNew) {
      emailAsyncValidators.push(this.contactValidators.isUniqueEmail())
    }
    return new FormGroup({
      name: new FormControl('', []),
      email: new FormControl('', [
        ContactValidators.correctEmail,
        Validators.required
      ], emailAsyncValidators)
    })
  }

getInitialFormData (contact) {
    return {
      name: contact.name,
      email: contact.email
    };
  }

  addContact () {
    let contactData: ContactRequest = this.form.value;
    this.onUpdate.emit(contactData);
    this.form.reset();
  }

}