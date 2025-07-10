export interface FetchOptions extends RequestInit {
  timeout?: number;
}

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  success: boolean;
};

export class RequestError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'RequestError';
    this.status = status;
  }
}
