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

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function registerUser(
  input: RegisterUserInput,
): Promise<RegisteredUser> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/users`, {
      body: JSON.stringify(input),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  } catch {
    throw new ApiError(
      'Unable to reach the server. Please check your connection and try again.',
      0,
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data.message === 'string'
        ? data.message
        : 'Something went wrong. Please try again.';
    throw new ApiError(message, response.status);
  }

  return data as RegisteredUser;
}
