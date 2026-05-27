import type { components } from '../generated/ghost-api';

const DEFAULT_GHOST_API_BASE_URL = 'http://127.0.0.1:8000';

type JsonObject = Record<string, unknown>;

let ghostAccessToken: string | undefined;

export type GhostHealth = components['schemas']['HealthResponse'];
export type GhostAccessRequest = components['schemas']['AccessRequest'];
export type GhostAccessResponse = components['schemas']['AccessResponse'];
export type GhostAwakeningResponse = components['schemas']['AwakeningResponse'];
export type GhostChatRequest = components['schemas']['ChatRequest'];
export type GhostChatResponse = components['schemas']['ChatResponse'];
export type GhostRetrievedFragment = components['schemas']['RetrievedFragmentModel'];

export type GhostApiOptions = {
  accessToken?: string;
  baseUrl?: string;
  fetcher?: typeof fetch;
  signal?: AbortSignal;
};

export type GhostApiErrorCode =
  | 'access_token_missing'
  | 'http_error'
  | 'invalid_json'
  | 'network_error';

export class GhostApiError extends Error {
  readonly code: GhostApiErrorCode;
  readonly status?: number;
  readonly detail?: unknown;
  readonly body?: unknown;

  constructor(
    message: string,
    {
      body,
      code,
      detail,
      status,
    }: {
      body?: unknown;
      code: GhostApiErrorCode;
      detail?: unknown;
      status?: number;
    },
  ) {
    super(message);
    this.name = 'GhostApiError';
    this.body = body;
    this.code = code;
    this.detail = detail;
    this.status = status;
  }
}

export async function getGhostHealth(options?: GhostApiOptions): Promise<GhostHealth> {
  return requestJson('/health', { method: 'GET' }, options);
}

export async function unlockGhost(
  code: GhostAccessRequest['code'],
  options?: GhostApiOptions,
): Promise<GhostAccessResponse> {
  const response = await requestJson<GhostAccessResponse, GhostAccessRequest>(
    '/v1/access',
    { body: { code }, method: 'POST' },
    options,
  );

  setGhostAccessToken(response.access_token);

  return response;
}

export async function checkGhostAwakening(
  options?: GhostApiOptions,
): Promise<GhostAwakeningResponse> {
  return requestJson('/v1/awakening', { method: 'POST', requiresAccessToken: true }, options);
}

export async function sendGhostMessage(
  request: GhostChatRequest,
  options?: GhostApiOptions,
): Promise<GhostChatResponse> {
  return requestJson(
    '/v1/chat',
    { body: request, method: 'POST', requiresAccessToken: true },
    options,
  );
}

export function setGhostAccessToken(accessToken: string | undefined): void {
  ghostAccessToken = accessToken?.trim() || undefined;
}

export function getGhostAccessToken(): string | undefined {
  return ghostAccessToken;
}

export function clearGhostAccessToken(): void {
  ghostAccessToken = undefined;
}

function ghostApiBaseUrl(baseUrl = import.meta.env.VITE_GHOST_API_BASE_URL): string {
  return removeTrailingSlash(baseUrl || DEFAULT_GHOST_API_BASE_URL);
}

async function requestJson<ResponseBody, RequestBody = never>(
  path: string,
  request: {
    body?: RequestBody;
    method: 'GET' | 'POST';
    requiresAccessToken?: boolean;
  },
  options: GhostApiOptions = {},
): Promise<ResponseBody> {
  const fetcher = options.fetcher ?? fetch;
  const headers = new Headers();

  if (request.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  if (request.requiresAccessToken) {
    const accessToken = (options.accessToken ?? ghostAccessToken)?.trim();

    if (!accessToken) {
      throw new GhostApiError('Ghost access token is missing.', {
        code: 'access_token_missing',
      });
    }

    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let response: Response;

  try {
    response = await fetcher(buildGhostApiUrl(path, options.baseUrl), {
      body: request.body === undefined ? undefined : JSON.stringify(request.body),
      credentials: 'omit',
      headers,
      method: request.method,
      signal: options.signal,
    });
  } catch (error) {
    throw new GhostApiError('The ghost server could not be reached.', {
      body: error,
      code: 'network_error',
      detail: error instanceof Error ? error.message : error,
    });
  }

  const body = await parseJsonBody(response);

  if (!response.ok) {
    const detail = extractFastApiDetail(body);

    if (response.status === 401 && request.requiresAccessToken && options.accessToken === undefined) {
      clearGhostAccessToken();
    }

    throw new GhostApiError(buildHttpErrorMessage(response.status, detail), {
      body,
      code: 'http_error',
      detail,
      status: response.status,
    });
  }

  return body as ResponseBody;
}

async function parseJsonBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new GhostApiError('The ghost server returned malformed JSON.', {
      body: text,
      code: 'invalid_json',
      detail: error instanceof Error ? error.message : error,
      status: response.status,
    });
  }
}

function buildGhostApiUrl(path: string, baseUrl?: string): string {
  return `${ghostApiBaseUrl(baseUrl)}${path}`;
}

function removeTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function extractFastApiDetail(body: unknown): unknown {
  if (!isJsonObject(body) || !('detail' in body)) {
    return undefined;
  }

  return body.detail;
}

function buildHttpErrorMessage(status: number, detail: unknown): string {
  if (typeof detail === 'string' && detail) {
    return detail;
  }

  return `Ghost API request failed with status ${status}.`;
}

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
