import { Contact } from './../models/contact.model';
import { email } from './../validators/patterns';
import { ContactValidators } from './../validators/contact.validator';
import { ContactRequest } from './../interfaces';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class EditContactComponent implements OnInit {

  @Input('contact') contact?: Contact
  @Input('isNew') isNew: boolean
  @Output('onUpdate') onUpdate = new EventEmitter();

  form: AbstractControl;

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
