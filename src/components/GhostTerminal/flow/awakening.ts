import { checkGhostAwakening } from '../../../api/ghost';
import {
  awakeningFailureLines,
  getAwakeningCheckLines,
} from '../content';
import { runGhostTerminalIntro } from './intro';
import type { AppendGhostTerminalLines } from './output';
import type { GhostTerminalDispatch } from './reducer';
import { sleep } from '../timing';
import type { FlowIdRef } from '../types';

type RunGhostAwakeningCheckOptions = {
  appendLines: AppendGhostTerminalLines;
  dispatch: GhostTerminalDispatch;
  flowId: number;
  flowIdRef: FlowIdRef;
  includeAccessGranted?: boolean;
  onAwakeningSucceeded: () => void;
};

export async function runGhostAwakeningCheck({
  appendLines,
  dispatch,
  flowId,
  flowIdRef,
  includeAccessGranted = false,
  onAwakeningSucceeded,
}: RunGhostAwakeningCheckOptions) {
  dispatch({ type: 'awakening_started' });
  const awakeningDuration = appendLines(getAwakeningCheckLines({ includeAccessGranted }));

  const [awakening] = await Promise.all([
    checkGhostAwakening(),
    sleep(Math.max(1250, awakeningDuration + 180)),
  ]);

  if (flowIdRef.current !== flowId) {
    return;
  }

  if (!awakening.can_awaken) {
    const failureDuration = appendLines(awakeningFailureLines);

    window.setTimeout(() => {
      if (flowIdRef.current === flowId) {
        dispatch({ type: 'awakening_failed' });
      }
    }, failureDuration + 80);
    return;
  }

  onAwakeningSucceeded();
  await runGhostTerminalIntro({ dispatch, flowId, flowIdRef });
}
