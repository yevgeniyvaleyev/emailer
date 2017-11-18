
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

export interface EmailData {
  id: number;
  subject: string;
  from: string;
  to: string;
  date: string;
  body: string;
}

export interface MailboxResponse {
  id: number;
  email: string;
  alias?: string;
}
