import { type GhostChatThreadMessage } from '../../GhostChatThread';
import type { TerminalLine, TerminalPhase } from '../types';

export type GhostTerminalState = {
  accessCode: string;
  chatDraft: string;
  chatMessages: GhostChatThreadMessage[];
  hasClearedLog: boolean;
  interactionLines: TerminalLine[];
  introText: string;
  isLogClearing: boolean;
  isSendingChat: boolean;
  phase: TerminalPhase;
  sessionSummary: string;
};

export type GhostTerminalAction =
  | { type: 'access_code_changed'; accessCode: string }
  | { type: 'access_prompt_requested' }
  | { type: 'access_submit_started' }
  | { type: 'awakening_failed' }
  | { type: 'awakening_started' }
  | { type: 'boot_completed' }
  | { type: 'chamber_started' }
  | { type: 'chamber_stopped' }
  | { type: 'chat_draft_changed'; chatDraft: string }
  | { type: 'chat_locked' }
  | { type: 'chat_message_appended'; message: GhostChatThreadMessage }
  | {
    type: 'chat_message_updated';
    messageId: string;
    update: Partial<Omit<GhostChatThreadMessage, 'id'>>;
  }
  | { type: 'chat_ready' }
  | { type: 'chat_send_finished' }
  | { type: 'chat_submit_started' }
  | { type: 'chat_summary_changed'; sessionSummary: string }
  | { type: 'intro_completed' }
  | { type: 'intro_started' }
  | { type: 'intro_text_changed'; introText: string }
  | { type: 'lines_appended'; lines: TerminalLine[] }
  | { type: 'log_cleared_for_intro' }
  | { type: 'log_clear_started' };

export type GhostTerminalDispatch = (action: GhostTerminalAction) => void;

export const initialTerminalState: GhostTerminalState = {
  accessCode: '',
  chatDraft: '',
  chatMessages: [],
  hasClearedLog: false,
  interactionLines: [],
  introText: '',
  isLogClearing: false,
  isSendingChat: false,
  phase: 'idle',
  sessionSummary: '',
};

export function ghostTerminalReducer(
  state: GhostTerminalState,
  action: GhostTerminalAction,
): GhostTerminalState {
  switch (action.type) {
    case 'access_code_changed':
      return { ...state, accessCode: action.accessCode };

    case 'access_prompt_requested':
      return { ...state, phase: 'awaiting-access' };

    case 'access_submit_started':
      return { ...state, accessCode: '', phase: 'unlocking' };

    case 'awakening_failed':
      return { ...state, phase: 'awakening-error' };

    case 'awakening_started':
      return { ...state, phase: 'awakening' };

    case 'boot_completed':
      return { ...state, phase: 'awaiting-access' };

    case 'chamber_started':
      return { ...initialTerminalState, phase: 'booting' };

    case 'chamber_stopped':
      return initialTerminalState;

    case 'chat_draft_changed':
      return { ...state, chatDraft: action.chatDraft };

    case 'chat_locked':
      return { ...state, phase: 'chat-locked' };

    case 'chat_message_appended':
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.message],
      };

    case 'chat_message_updated':
      return {
        ...state,
        chatMessages: state.chatMessages.map((message) => (
          message.id === action.messageId
            ? { ...message, ...action.update }
            : message
        )),
      };

    case 'chat_ready':
      return { ...state, phase: 'complete' };

    case 'chat_send_finished':
      return { ...state, isSendingChat: false };

    case 'chat_submit_started':
      return {
        ...state,
        chatDraft: '',
        isSendingChat: true,
        phase: 'chatting',
      };

    case 'chat_summary_changed':
      return { ...state, sessionSummary: action.sessionSummary };

    case 'intro_completed':
      return { ...state, phase: 'complete' };

    case 'intro_started':
      return { ...state, phase: 'intro' };

    case 'intro_text_changed':
      return { ...state, introText: action.introText };

    case 'lines_appended':
      return {
        ...state,
        interactionLines: [...state.interactionLines, ...action.lines],
      };

    case 'log_cleared_for_intro':
      return {
        ...state,
        hasClearedLog: true,
        interactionLines: [],
        isLogClearing: false,
      };

    case 'log_clear_started':
      return { ...state, isLogClearing: true };

    default:
      return state;
  }
}
