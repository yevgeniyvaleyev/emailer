import { ContactsService } from './../contacts.service';
import { Observable } from 'rxjs/Observable';
import { email, fullName } from './patterns';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { getAge } from '../utils';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/delay';

@Injectable()
export class ContactValidators {

  constructor (private contactService: ContactsService) {}

  static fullName (control: AbstractControl): ValidationErrors | null {
    if (fullName.test(control.value)) {
      return null
    }
    return {
      fullName: true
    }
  }

  static correctEmail (control: AbstractControl): ValidationErrors | null {
    if (email.test(control.value)) {
      return null
    }
    return {
      correctEmail: true
    }
  }

  isUniqueEmail () {
    return (control: AbstractControl): Observable<null|any> => {
      const invalid = { isUniqueEmail: true };

      return this.contactService
        .isUniqueEmail(control.value)
        .switchMap((isUnique: boolean) =>
          Observable.of(isUnique ? null : invalid))
    }
  }

  static minAge (minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (getAge(control.value) >= minAge) {
        return null
      }
      return {
        minAge: true
      }
    }
  }

}
