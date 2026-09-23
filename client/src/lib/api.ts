export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export interface RegisteredUser {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
}

export interface RegisterUserInput {
  email: string;
  name: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function parseResponse<TResponse>(
  response: Response,
): Promise<TResponse> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data.message === 'string'
        ? data.message
        : 'Something went wrong. Please try again.';
    throw new ApiError(message, response.status);
  }

  return data as TResponse;
}

async function requestJson<TResponse>(
  path: string,
  init?: Parameters<typeof fetch>[1],
): Promise<TResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      ...init,
    });
  } catch {
    throw new ApiError(
      'Unable to reach the server. Please check your connection and try again.',
      0,
    );
  }

  return parseResponse<TResponse>(response);
}

function postJson<TResponse>(path: string, body: unknown): Promise<TResponse> {
  return requestJson<TResponse>(path, {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
}

export function registerUser(
  input: RegisterUserInput,
): Promise<RegisteredUser> {
  return postJson<RegisteredUser>('/api/users', input);
}

export function loginUser(input: LoginUserInput): Promise<RegisteredUser> {
  return postJson<RegisteredUser>('/api/users/login', input);
}

export function getCurrentUser(): Promise<RegisteredUser> {
  return requestJson<RegisteredUser>('/api/users/me');
}

export function logoutUser(): Promise<void> {
  return postJson<void>('/api/users/logout', {});
}
