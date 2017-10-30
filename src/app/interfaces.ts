export interface UserSelectionData {
  id: string
}

export interface UserRequest {
  fullName: string;
  birthdate: string;
  email: string;
}

export interface UserResponse extends UserRequest {
  _id: string;
}

export interface EmailData {
  id: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  body: string;
}
