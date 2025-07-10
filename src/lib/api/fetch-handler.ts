import { RequestError, type ApiResponse, type FetchOptions } from './types';

function isError(err: unknown): err is Error {
  return err instanceof Error;
}

function handleError(error: Error): ApiResponse<never> {
  if (error instanceof RequestError) {
    return {
      error: error.message,
      success: false,
    };
  }

  return {
    error: error.message || 'Unknown error occurred',
    success: false,
  };
}

export async function fetchHandler<T>(url: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
  const { timeout = 10000, headers: customHeaders = {}, ...restOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const headers = {
    ...defaultHeaders,
    ...customHeaders,
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new RequestError(response.status, `HTTP Error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      data,
      success: true,
    };
  } catch (err) {
    const error = isError(err) ? err : new Error('Unknown error');
    if (error.name === 'AbortError') {
      console.log(`Request to ${url} timed out`);
    } else {
      console.log(`Request to ${url} failed: ${error.message}`, { error });
    }

    return handleError(error);
  } finally {
    clearTimeout(timeoutId);
  }
}
