const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api/v1';

interface RefreshResponse {
  data: {
    accessToken: string;
  };
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown,
  ) {
    super(message);
  }
}

export function getAccessToken() {
  return localStorage.getItem('pointnear.accessToken');
}

export function setAccessToken(token: string | null) {
  if (token) {
    localStorage.setItem('pointnear.accessToken', token);
  } else {
    localStorage.removeItem('pointnear.accessToken');
  }
}

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
      credentials: 'include',
    })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as RefreshResponse | null;

        if (!response.ok || !payload?.data?.accessToken) {
          setAccessToken(null);
          return null;
        }

        setAccessToken(payload.data.accessToken);
        return payload.data.accessToken;
      })
      .catch(() => {
        setAccessToken(null);
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

async function request(path: string, options: RequestInit = {}, token = getAccessToken()): Promise<Response> {
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(payload?.error?.message ?? 'Erro na requisição.', response.status, payload?.error?.details);
  }

  return payload as T;
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response = await request<T>(path, options);

  if (response.status === 401 && path !== '/auth/refresh') {
    const token = await refreshAccessToken();

    if (token) {
      response = await request<T>(path, options, token);
    }
  }

  return parseResponse<T>(response);
}
