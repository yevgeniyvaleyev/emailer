import { UserResponse } from './interfaces';


export class User {

  id: string;
  fullName: string;
  email: string;
  dataOfBirth: number;

  constructor (data: UserResponse) {
    if (!this.isDataValid(data)) {
      throw new Error('User data is not valid')
    }
    this.id = data._id;
    this.fullName = data.fullName;
    this.email = data.email;
    // this is a hack because
    // http://test-api.javascript.ru/v1/
    // does not support dateOfBirth
    this.dataOfBirth = new Date().valueOf();
  }

  isDataValid (data: UserResponse) {
    return data.fullName && data._id && data.email;
  }
}
