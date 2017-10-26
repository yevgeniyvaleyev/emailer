import { UserResponse } from './interfaces';


export class User {

  id: string;
  fullName: string;
  email: string;
  birthdate: Date;

  constructor (data: UserResponse) {
    if (!this.isDataValid(data)) {
      throw new Error('User data is not valid')
    }
    this.id = data._id;
    this.fullName = data.fullName;
    this.email = data.email;
    this.birthdate = new Date(data.birthdate);
  }

  isDataValid (data: UserResponse) {
    return data.fullName && data._id && data.email && data.birthdate;
  }
}
