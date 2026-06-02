import { GhostApiError } from '../../../api/ghost';

export function isGhostAccessRejected(error: unknown) {
  return error instanceof GhostApiError && error.status === 401;
}

export function isGhostAccessMissing(error: unknown) {
  return error instanceof GhostApiError
    && (error.status === 401 || error.code === 'access_token_missing');
}
