import { email } from './../validators/patterns';
import { UserNameValidators } from './../validators/username.validator';
import { UserRequest } from './../interfaces';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Output('onAdd') onAdd = new EventEmitter();

  form = new FormGroup({
    fullName: new FormControl('', [
      UserNameValidators.fullName,
      Validators.required
    ]),
    birthdate: new FormControl('', Validators.required),
    email: new FormControl('', [
      UserNameValidators.correctEmail,
      Validators.required
    ])
  })

  constructor() { }

  ngOnInit() {
  }

  get fullName () {
    return this.form.get('fullName');
  }

  get email () {
    return this.form.get('email');
  }

  get birthdate () {
    return this.form.get('birthdate');
  }

  addUser () {
    let userData: UserRequest = this.form.value;
    this.onAdd.emit(userData);
    this.form.reset();
  }

}
