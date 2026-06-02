import {
  clearGhostAccessToken,
  sendGhostMessage,
} from '../../../api/ghost';
import {
  chatAccessSignalFadedText,
  chatChannelStaticText,
  pendingGhostReplyText,
} from '../content';
import { isGhostAccessMissing } from './errors';
import type {
  AppendGhostChatMessage,
  UpdateGhostChatMessage,
} from './output';
import type { GhostTerminalDispatch } from './reducer';
import {
  getChatCharacterDelay,
  prefersReducedMotion,
  sleep,
} from '../timing';
import type {
  FlowIdRef,
  TerminalPhase,
} from '../types';

type SubmitGhostChatOptions = {
  appendChatMessage: AppendGhostChatMessage;
  chatDraft: string;
  dispatch: GhostTerminalDispatch;
  flowId: number;
  flowIdRef: FlowIdRef;
  phase: TerminalPhase;
  sessionSummary: string;
  updateChatMessage: UpdateGhostChatMessage;
};

type TypeGhostReplyOptions = {
  flowId: number;
  flowIdRef: FlowIdRef;
  messageId: string;
  reply: string;
  updateChatMessage: UpdateGhostChatMessage;
};

export async function submitGhostChat({
  appendChatMessage,
  chatDraft,
  dispatch,
  flowId,
  flowIdRef,
  phase,
  sessionSummary,
  updateChatMessage,
}: SubmitGhostChatOptions) {
  const message = chatDraft.trim();

  if (!message || phase !== 'complete') {
    return;
  }

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

    const didTypeReply = await typeGhostReply({
      flowId,
      flowIdRef,
      messageId: pendingMessageId,
      reply: response.reply,
      updateChatMessage,
    });

    if (didTypeReply && flowIdRef.current === flowId) {
      dispatch({ type: 'chat_ready' });
    }
  } catch (error) {
    if (flowIdRef.current !== flowId) {
      return;
    }

    const needsAccess = isGhostAccessMissing(error);

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
}

async function typeGhostReply({
  flowId,
  flowIdRef,
  messageId,
  reply,
  updateChatMessage,
}: TypeGhostReplyOptions) {
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
}
