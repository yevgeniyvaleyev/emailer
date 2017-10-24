import { UserResponse } from './interfaces';


export class User {

  id: string;
  fullName: string;
  email: string;

  constructor (data: UserResponse) {
    if (!this.isDataValid(data)) {
      throw new Error('User data is not valid')
    }
    this.id = data._id;
    this.fullName = data.fullName;
    this.email = data.email;
  }

  isDataValid (data: UserResponse) {
    return data.fullName && data._id && data.email;
  }
}
