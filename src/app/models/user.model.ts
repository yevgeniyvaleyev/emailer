import { UserResponse, Gender } from './../interfaces';

export class User {

  id: string;
  fullName: string;
  email: string;
  gender: Gender;
  birthdate: Date;

  constructor (data: UserResponse) {
    if (!this.isValidData(data)) {
      throw new Error('User data is not valid')
    }
    this.id = data.id;
    this.fullName = data.fullName;
    this.email = data.email;
    this.birthdate = new Date(data.birthdate);
    this.gender = data.gender;
  }

  isValidData (data: UserResponse) {
    return data.fullName && data.id
      && data.email && data.birthdate && data.gender;
  }
}
