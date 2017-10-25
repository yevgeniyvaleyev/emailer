export interface UserSelectionData {
  id: string
}

export interface UserRequest {
  fullName: string;
  dateOfBirth: number;
  email: string;
}

export interface UserResponse extends UserRequest {
  _id: string;
}
