import { UserResponse } from './../interfaces';

export class User {

  id: string;
  fullName: string;
  email: string;

  constructor (data: UserResponse) {
    if (!this.isValidData(data)) {
      throw new Error('User data is not valid')
    }
    this.id = data.id;
    this.fullName = data.fullName || data.email;
    this.email = data.email;
  }

  isValidData (data: UserResponse) {
    return data.fullName && data.id && data.email;
  }
}
