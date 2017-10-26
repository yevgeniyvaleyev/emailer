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
