export interface UserInterface {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInterface {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface UpdateUserInterface {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
