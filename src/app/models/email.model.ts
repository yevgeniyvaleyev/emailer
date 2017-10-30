import { EmailData } from './../interfaces';
import { email as emailPattern } from './../validators/patterns';

export class Email {

  id: number;
  subject: string;
  from: string;
  to: string;
  date: Date;
  body: string;

  constructor (data: EmailData) {
    if (!this.isValidData(data)) {
      throw new Error('Email data is not valid')
    }
    this.id = data.id;
    this.subject = data.subject;
    this.date = new Date(data.date);
    this.to = data.to;
    this.from = data.from;
    this.body = data.body;
  }

  isValidEmail (email: string): boolean {
    return emailPattern.test(email);
  }

  isValidDate (date: string): boolean {
    return !isNaN(new Date(date).valueOf());
  }

  isValidData (data: EmailData) {
    return data.subject && data.body && !isNaN(data.id)
      && this.isValidEmail(data.from)&& this.isValidEmail(data.to)
      && this.isValidDate(data.date);
  }
}
