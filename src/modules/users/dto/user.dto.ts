export type CreateUserDTO = {
  username: string;
  password: string;
  email: string;
  name: string;
};

export type UsernameAndEmailDTO = {
  username: string;
  email: string;
};

export type UserCreatedDTO = {
  id: string;
  createdAt: Date;
} & CreateUserDTO;
