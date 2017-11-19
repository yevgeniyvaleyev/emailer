import { EmailRequest } from './interfaces';

export interface ContactSelectionData {
  id: string
}

export interface ContactRequest {
  id?: string;
  name: string;
  email: string;
}

export interface ContactResponse extends ContactRequest {
  id: string;
}

export interface EmailRequest {
  subject: string;
  to: string;
  body: string;
}

export interface EmailResponse extends EmailRequest {
  id: number;
  from: string;
  date: string;
}

export interface MailboxResponse {
  id: number;
  email: string;
  alias?: string;
}
