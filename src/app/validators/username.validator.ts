import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UserNameValidators {
  static fullName (control: AbstractControl): ValidationErrors | null {
    if (/[A-Z]\w{1,}\s[A-Z]\w{1,}/.test(control.value)) {
      return null
    }
    return {
      fullName: true
    }
  }
}
