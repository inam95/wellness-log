// import { fetchHandler } from './fetch-handler';
// import type { ApiResponse, FetchOptions } from './types';

// export function createAuthHeaders(token?: string): HeadersInit {
//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   };

//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   return headers;
// }

// export async function authenticatedFetch<T>(
//   url: string,
//   options: FetchOptions = {},
//   token?: string,
// ): Promise<ApiResponse<T>> {
//   const authHeaders = createAuthHeaders(token);

//   return fetchHandler<T>(url, {
//     ...options,
//     headers: {
//       ...authHeaders,
//       ...options.headers,
//     },
//   });
// }

// export async function get<T>(url: string, options: FetchOptions = {}, token?: string): Promise<ApiResponse<T>> {
//   return authenticatedFetch<T>(url, { ...options, method: 'GET' }, token);
// }

// export async function post<T>(
//   url: string,
//   data: unknown,
//   options: FetchOptions = {},
//   token?: string,
// ): Promise<ApiResponse<T>> {
//   return authenticatedFetch<T>(
//     url,
//     {
//       ...options,
//       method: 'POST',
//       body: JSON.stringify(data),
//     },
//     token,
//   );
// }

// export async function put<T>(
//   url: string,
//   data: unknown,
//   options: FetchOptions = {},
//   token?: string,
// ): Promise<ApiResponse<T>> {
//   return authenticatedFetch<T>(
//     url,
//     {
//       ...options,
//       method: 'PUT',
//       body: JSON.stringify(data),
//     },
//     token,
//   );
// }

// export async function patch<T>(
//   url: string,
//   data: unknown,
//   options: FetchOptions = {},
//   token?: string,
// ): Promise<ApiResponse<T>> {
//   return authenticatedFetch<T>(
//     url,
//     {
//       ...options,
//       method: 'PATCH',
//       body: JSON.stringify(data),
//     },
//     token,
//   );
// }

// export async function del<T>(url: string, options: FetchOptions = {}, token?: string): Promise<ApiResponse<T>> {
//   return authenticatedFetch<T>(url, { ...options, method: 'DELETE' }, token);
// }
