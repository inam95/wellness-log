export interface User {
  id: string;
  email: string;
  name: string;
}

export interface SignUpResponse {
  token: string;
  user: User;
}
