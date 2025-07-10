import { fetchHandler } from '../../handlers/fetch-handler';
import type { SignUpResponse } from './types';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const authApi = {
  signup: (email: string, password: string, confirmPassword: string) =>
    fetchHandler<SignUpResponse>(`${BASE_URL}/sign-up?scenario=success`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
      }),
    }),
};
