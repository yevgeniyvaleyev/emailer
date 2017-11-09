import { email, fullName } from './patterns';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { getAge } from '../utils';

export class UserValidators {
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
