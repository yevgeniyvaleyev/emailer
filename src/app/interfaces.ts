export type Gender = 'male' | 'female';

export interface UserSelectionData {
  id: string
}

export interface UserRequest {
  fullName: string;
  birthdate: string;
  gender: Gender;
  email: string;
}

export interface UserResponse extends UserRequest {
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
