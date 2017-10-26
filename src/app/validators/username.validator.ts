import { email, fullName } from './patterns';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UserNameValidators {
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

}
