export interface User {
  email: string;
  roles: string[];
}

export interface ResponseMessage {
  name: string;
  message: string;
  errors?: string[]
}
