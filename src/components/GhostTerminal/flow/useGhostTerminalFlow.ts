import {
  useEffect,
  useReducer,
  useRef,
  type FormEvent,
} from 'react';
import { clearGhostAccessToken } from '../../../api/ghost';
import { submitGhostAccess } from './access';
import { submitGhostChat } from './chat';
import { createGhostTerminalOutput } from './output';
import { ghostTerminalReducer, initialTerminalState } from './reducer';
import { bootCompleteDelay } from '../timing';
import { useGhostTerminalFocus } from '../hooks/useGhostTerminalFocus';
import { useGhostTerminalScroll } from '../hooks/useGhostTerminalScroll';

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
  const {
    appendChatMessage,
    appendLines,
    updateChatMessage,
  } = createGhostTerminalOutput({ dispatch, lineIdRef });

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

  const handleAccessSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitGhostAccess({
      accessCode,
      appendLines,
      dispatch,
      flowId: flowIdRef.current,
      flowIdRef,
      onAwakeningSucceeded,
      phase,
    });
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitGhostChat({
      appendChatMessage,
      chatDraft,
      dispatch,
      flowId: flowIdRef.current,
      flowIdRef,
      phase,
      sessionSummary,
      updateChatMessage,
    });
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
