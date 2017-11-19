import { ContactResponse } from './../interfaces';

export class Contact {

  id: string;
  name: string;
  email: string;

  constructor (data: ContactResponse) {
    if (!this.isValidData(data)) {
      throw new Error('Contact data is not valid')
    }
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }

  isValidData (data: ContactResponse) {
    return data.id && data.email;
  }
}
