import { email } from './../validators/patterns';
import { UserValidators } from './../validators/user.validator';
import { UserRequest, Gender } from './../interfaces';
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
      UserValidators.fullName,
      Validators.required
    ]),
    birthdate: new FormControl('', [
      Validators.required,
      UserValidators.minAge(18)
    ]),
    email: new FormControl('', [
      UserValidators.correctEmail,
      Validators.required
    ]),
    gender: new FormControl('', [
      Validators.required
    ])
  })

  constructor() { }

  ngOnInit() {}

  get fullName () {
    return this.form.get('fullName');
  }

  get email () {
    return this.form.get('email');
  }

  get gender () {
    return this.form.get('gender');
  }

  get genders (): Gender[] {
    return [
      'male',
      'female'
    ]
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
