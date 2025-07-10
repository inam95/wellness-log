export type User = {
  id: string;
  email: string;
  name: string;
};

export type SignUpResponse = {
  token: string;
  user: User;
};

export type LoginResponse = SignUpResponse;
