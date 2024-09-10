export interface User {
  email: string;
  roles: string[];
}

export interface ResponseMessage {
  name: string;
  message: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  count: number;
  list: T[];
}
