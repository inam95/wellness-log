import { fetchHandler } from '../../handlers/fetch-handler';
import type { Log } from './types';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const logsApi = {
  getLogs: () => fetchHandler<Log[]>(`${BASE_URL}/logs?scenario=success`),
};
