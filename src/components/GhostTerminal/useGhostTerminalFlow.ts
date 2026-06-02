import {
  useEffect,
  useReducer,
  useRef,
  type FormEvent,
} from 'react';
import {
  GhostApiError,
  checkGhostAwakening,
  clearGhostAccessToken,
  sendGhostMessage,
  unlockGhost,
} from '../../api/ghost';
import { type GhostChatThreadMessage } from '../GhostChatThread';
import {
  accessChannelStaticLines,
  accessRejectedLines,
  accessSignalFadedLines,
  accessSubmissionLines,
  awakeningFailureLines,
  chatAccessSignalFadedText,
  chatChannelStaticText,
  getAwakeningCheckLines,
  introScript,
  pendingGhostReplyText,
} from './content';
import { ghostTerminalReducer, initialTerminalState } from './reducer';
import {
  BOOT_LINE_STEP_MS,
  LINE_ANIMATION_MS,
  LOG_CLEAR_ANIMATION_MS,
  bootCompleteDelay,
  getChatCharacterDelay,
  getIntroCharacterDelay,
  prefersReducedMotion,
  sleep,
} from './timing';
import type {
  AppendLinesOptions,
  BootLine,
} from './types';
import { useGhostTerminalFocus } from './useGhostTerminalFocus';
import { useGhostTerminalScroll } from './useGhostTerminalScroll';

type UseGhostTerminalFlowOptions = {
  isChamberOn: boolean;
  onAwakeningSucceeded: () => void;
};

export function useGhostTerminalFlow({
  isChamberOn,
  onAwakeningSucceeded,
}: UseGhostTerminalFlowOptions) {
  const [state, dispatch] = useReducer(ghostTerminalReducer, initialTerminalState);
  const {
    accessCode,
    chatDraft,
    chatMessages,
    hasClearedLog,
    interactionLines,
    introText,
    isLogClearing,
    isSendingChat,
    phase,
    sessionSummary,
  } = state;
  const accessInputRef = useRef<HTMLInputElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);
  const flowIdRef = useRef(0);

  const nextLineId = (prefix: string) => {
    lineIdRef.current += 1;
    return `ghost-${prefix}-${lineIdRef.current}`;
  };

  const appendLines = (
    lines: BootLine[],
    { initialDelay = 90, step = BOOT_LINE_STEP_MS }: AppendLinesOptions = {},
  ) => {
    const preparedLines = lines.map((line, index) => {
      return {
        ...line,
        delay: initialDelay + index * step,
        id: nextLineId('line'),
      };
    });

    dispatch({ type: 'lines_appended', lines: preparedLines });

    return initialDelay + Math.max(0, lines.length - 1) * step + LINE_ANIMATION_MS;
  };

  const appendChatMessage = (message: Omit<GhostChatThreadMessage, 'id'>) => {
    const chatMessage = {
      ...message,
      id: nextLineId('chat'),
    };

    dispatch({ type: 'chat_message_appended', message: chatMessage });

    return chatMessage.id;
  };

  const updateChatMessage = (
    messageId: string,
    update: Partial<Omit<GhostChatThreadMessage, 'id'>>,
  ) => {
    dispatch({ type: 'chat_message_updated', messageId, update });
  };

  useEffect(() => {
    flowIdRef.current += 1;

    if (!isChamberOn) {
      clearGhostAccessToken();
      dispatch({ type: 'chamber_stopped' });
      return undefined;
    }

    const flowId = flowIdRef.current;
    dispatch({ type: 'chamber_started' });
    lineIdRef.current = 0;

    const bootTimer = window.setTimeout(() => {
      if (flowIdRef.current === flowId) {
        dispatch({ type: 'boot_completed' });
      }
    }, bootCompleteDelay);

    return () => {
      window.clearTimeout(bootTimer);
    };
  }, [isChamberOn]);

  useGhostTerminalFocus({
    accessInputRef,
    chatInputRef,
    shouldFocusAccess: phase === 'awaiting-access',
    shouldFocusChat: phase === 'complete',
  });

  useGhostTerminalScroll({
    chatMessages,
    hasClearedLog,
    interactionLines,
    introText,
    isIntroPhase: phase === 'intro',
    isLogClearing,
    logRef,
  });

  const clearLogForIntro = async (flowId: number) => {
    dispatch({ type: 'log_clear_started' });
    await sleep(prefersReducedMotion() ? 0 : LOG_CLEAR_ANIMATION_MS);

    if (flowIdRef.current !== flowId) {
      return false;
    }

    dispatch({ type: 'log_cleared_for_intro' });

    return true;
  };

  const streamIntro = async (flowId: number) => {
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
  };

  const typeGhostReply = async (flowId: number, messageId: string, reply: string) => {
    const normalizedReply = reply.trim() || pendingGhostReplyText;

    if (prefersReducedMotion()) {
      updateChatMessage(messageId, { isTyping: false, text: normalizedReply });
      return flowIdRef.current === flowId;
    }

    let nextText = '';
    let previousCharacter = '';

    for (const character of normalizedReply) {
      if (flowIdRef.current !== flowId) {
        return false;
      }

      nextText += character;
      updateChatMessage(messageId, { text: nextText });

      const characterDelay = getChatCharacterDelay(character, previousCharacter);
      previousCharacter = character;
      await sleep(characterDelay);
    }

    updateChatMessage(messageId, { isTyping: false });

    return flowIdRef.current === flowId;
  };

  const runAwakeningCheck = async (
    flowId: number,
    { includeAccessGranted = false }: { includeAccessGranted?: boolean } = {},
  ) => {
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
    dispatch({ type: 'intro_started' });

    const didClear = await clearLogForIntro(flowId);

    if (!didClear) {
      return;
    }

    const didStream = await streamIntro(flowId);

    if (didStream && flowIdRef.current === flowId) {
      dispatch({ type: 'intro_completed' });
    }
  };

  const handleAccessSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const code = accessCode.trim();

    if (!code || phase !== 'awaiting-access') {
      return;
    }

    const flowId = flowIdRef.current;
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

      const isAccessRejected = error instanceof GhostApiError && error.status === 401;
      const lines = isAccessRejected ? accessRejectedLines : accessChannelStaticLines;

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
      await runAwakeningCheck(flowId, { includeAccessGranted: true });
    } catch (error) {
      if (flowIdRef.current !== flowId) {
        return;
      }

      const needsAccess = error instanceof GhostApiError
        && (error.status === 401 || error.code === 'access_token_missing');

      if (needsAccess) {
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
  };

  const handleChatSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = chatDraft.trim();

    if (!message || phase !== 'complete') {
      return;
    }

    const flowId = flowIdRef.current;
    dispatch({ type: 'chat_submit_started' });
    appendChatMessage({ role: 'user', text: message });
    const pendingMessageId = appendChatMessage({
      isTyping: true,
      role: 'ghost',
      text: pendingGhostReplyText,
    });

    try {
      const response = await sendGhostMessage({
        message,
        session_summary: sessionSummary || undefined,
      });

      if (flowIdRef.current !== flowId) {
        return;
      }

      dispatch({ type: 'chat_summary_changed', sessionSummary: response.session_summary });
      updateChatMessage(pendingMessageId, { text: '' });

      const didTypeReply = await typeGhostReply(flowId, pendingMessageId, response.reply);

      if (didTypeReply && flowIdRef.current === flowId) {
        dispatch({ type: 'chat_ready' });
      }
    } catch (error) {
      if (flowIdRef.current !== flowId) {
        return;
      }

      const needsAccess = error instanceof GhostApiError
        && (error.status === 401 || error.code === 'access_token_missing');

      if (needsAccess) {
        clearGhostAccessToken();
      }

      updateChatMessage(pendingMessageId, {
        isTyping: false,
        role: 'system',
        text: needsAccess ? chatAccessSignalFadedText : chatChannelStaticText,
      });
      dispatch({ type: needsAccess ? 'chat_locked' : 'chat_ready' });
    } finally {
      if (flowIdRef.current === flowId) {
        dispatch({ type: 'chat_send_finished' });
      }
    }
  };

  return {
    accessCode,
    accessInputRef,
    chatDraft,
    chatInputRef,
    chatMessages,
    handleAccessSubmit,
    handleChatSubmit,
    hasClearedLog,
    interactionLines,
    introText,
    isLogClearing,
    isSendingChat,
    logRef,
    phase,
    setAccessCode: (nextAccessCode: string) => {
      dispatch({ type: 'access_code_changed', accessCode: nextAccessCode });
    },
    setChatDraft: (nextChatDraft: string) => {
      dispatch({ type: 'chat_draft_changed', chatDraft: nextChatDraft });
    },
    shouldShowChatPrompt: hasClearedLog && ['chatting', 'complete'].includes(phase),
  };
}
