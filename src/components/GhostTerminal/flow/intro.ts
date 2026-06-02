import { introScript } from '../content';
import type { GhostTerminalDispatch } from './reducer';
import {
  LOG_CLEAR_ANIMATION_MS,
  getIntroCharacterDelay,
  prefersReducedMotion,
  sleep,
} from '../timing';
import type { FlowIdRef } from '../types';

type RunGhostTerminalIntroOptions = {
  dispatch: GhostTerminalDispatch;
  flowId: number;
  flowIdRef: FlowIdRef;
};

export async function runGhostTerminalIntro({
  dispatch,
  flowId,
  flowIdRef,
}: RunGhostTerminalIntroOptions) {
  dispatch({ type: 'intro_started' });

  const didClear = await clearLogForIntro({ dispatch, flowId, flowIdRef });

  if (!didClear) {
    return false;
  }

  const didStream = await streamIntro({ dispatch, flowId, flowIdRef });

  if (didStream && flowIdRef.current === flowId) {
    dispatch({ type: 'intro_completed' });
  }

  return didStream && flowIdRef.current === flowId;
}

async function clearLogForIntro({
  dispatch,
  flowId,
  flowIdRef,
}: RunGhostTerminalIntroOptions) {
  dispatch({ type: 'log_clear_started' });
  await sleep(prefersReducedMotion() ? 0 : LOG_CLEAR_ANIMATION_MS);

  if (flowIdRef.current !== flowId) {
    return false;
  }

  dispatch({ type: 'log_cleared_for_intro' });

  return true;
}

async function streamIntro({
  dispatch,
  flowId,
  flowIdRef,
}: RunGhostTerminalIntroOptions) {
  if (prefersReducedMotion()) {
    dispatch({ type: 'intro_text_changed', introText: introScript });
    return flowIdRef.current === flowId;
  }

  let nextText = '';
  let previousCharacter = '';
  dispatch({ type: 'intro_text_changed', introText: '' });

  for (const character of introScript) {
    if (flowIdRef.current !== flowId) {
      return false;
    }

    nextText += character;
    dispatch({ type: 'intro_text_changed', introText: nextText });

    const characterDelay = getIntroCharacterDelay(character, previousCharacter);
    previousCharacter = character;
    await sleep(characterDelay);
  }

  return flowIdRef.current === flowId;
}
