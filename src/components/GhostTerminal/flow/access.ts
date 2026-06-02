import {
  clearGhostAccessToken,
  unlockGhost,
} from '../../../api/ghost';
import { runGhostAwakeningCheck } from './awakening';
import {
  accessChannelStaticLines,
  accessRejectedLines,
  accessSignalFadedLines,
  accessSubmissionLines,
  awakeningFailureLines,
} from '../content';
import {
  isGhostAccessMissing,
  isGhostAccessRejected,
} from './errors';
import type { AppendGhostTerminalLines } from './output';
import type { GhostTerminalDispatch } from './reducer';
import { sleep } from '../timing';
import type {
  FlowIdRef,
  TerminalPhase,
} from '../types';

type SubmitGhostAccessOptions = {
  accessCode: string;
  appendLines: AppendGhostTerminalLines;
  dispatch: GhostTerminalDispatch;
  flowId: number;
  flowIdRef: FlowIdRef;
  onAwakeningSucceeded: () => void;
  phase: TerminalPhase;
};

export async function submitGhostAccess({
  accessCode,
  appendLines,
  dispatch,
  flowId,
  flowIdRef,
  onAwakeningSucceeded,
  phase,
}: SubmitGhostAccessOptions) {
  const code = accessCode.trim();

  if (!code || phase !== 'awaiting-access') {
    return;
  }

  dispatch({ type: 'access_submit_started' });
  appendLines(accessSubmissionLines);

  try {
    let unlockError: unknown;

    await Promise.all([
      unlockGhost(code).catch((error: unknown) => {
        unlockError = error;
      }),
      sleep(980),
    ]);

    if (unlockError) {
      throw unlockError;
    }
  } catch (error) {
    if (flowIdRef.current !== flowId) {
      return;
    }

    clearGhostAccessToken();

    const lines = isGhostAccessRejected(error)
      ? accessRejectedLines
      : accessChannelStaticLines;
    const failureDuration = appendLines(lines);

    window.setTimeout(() => {
      if (flowIdRef.current === flowId) {
        dispatch({ type: 'access_prompt_requested' });
      }
    }, failureDuration + 80);
    return;
  }

  if (flowIdRef.current !== flowId) {
    return;
  }

  try {
    await runGhostAwakeningCheck({
      appendLines,
      dispatch,
      flowId,
      flowIdRef,
      includeAccessGranted: true,
      onAwakeningSucceeded,
    });
  } catch (error) {
    if (flowIdRef.current !== flowId) {
      return;
    }

    if (isGhostAccessMissing(error)) {
      clearGhostAccessToken();
      const accessDuration = appendLines(accessSignalFadedLines);

      window.setTimeout(() => {
        if (flowIdRef.current === flowId) {
          dispatch({ type: 'access_prompt_requested' });
        }
      }, accessDuration + 80);
      return;
    }

    const failureDuration = appendLines(awakeningFailureLines);

    window.setTimeout(() => {
      if (flowIdRef.current === flowId) {
        dispatch({ type: 'awakening_failed' });
      }
    }, failureDuration + 80);
  }
}
