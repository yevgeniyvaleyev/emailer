import { email } from './../validators/patterns';
import { ContactValidators } from './../validators/contact.validator';
import { ContactRequest } from './../interfaces';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  @Output('onAdd') onAdd = new EventEmitter();

  form = new FormGroup({
    name: new FormControl('', []),
    email: new FormControl('', [
      ContactValidators.correctEmail,
      Validators.required
    ], [
      this.contactValidators.isUniqueEmail()
    ])
  })

  constructor(private contactValidators: ContactValidators) { }

  ngOnInit() {}

  get name () {
    return this.form.get('name');
  }

  get email () {
    return this.form.get('email');
  }

  addContact () {
    let contactData: ContactRequest = this.form.value;
    this.onAdd.emit(contactData);
    this.form.reset();
  }

}
