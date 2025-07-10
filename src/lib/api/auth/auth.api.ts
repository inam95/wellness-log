import { fetchHandler } from '../../handlers/fetch-handler';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const authApi = {
  signup: (email: string, password: string, confirmPassword: string) =>
    fetchHandler<{
      email: string;
      password: string;
    }>(`${BASE_URL}/sign-up?scenario=error`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
      }),
    }),
};
