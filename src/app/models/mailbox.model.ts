import { MailboxResponse } from './../interfaces';

export class Mailbox {

  id: number;
  alias: string;
  email: string;

  constructor (data: MailboxResponse) {
    if (!this.isValidData(data)) {
      throw new Error('Mailbox data is not valid')
    }
    this.id = data.id;
    this.email = data.email;
    this.alias = data.alias || data.email;
  }

  isValidData (data: MailboxResponse) {
    return data.id !== undefined && data.email;
  }
}
