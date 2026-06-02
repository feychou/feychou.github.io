import type { GhostChatThreadMessage } from '../../GhostChatThread';
import type { GhostTerminalDispatch } from './reducer';
import {
  BOOT_LINE_STEP_MS,
  LINE_ANIMATION_MS,
} from '../timing';
import type {
  AppendLinesOptions,
  BootLine,
  LineIdRef,
} from '../types';

export type AppendGhostTerminalLines = (
  lines: BootLine[],
  options?: AppendLinesOptions,
) => number;

export type AppendGhostChatMessage = (
  message: Omit<GhostChatThreadMessage, 'id'>,
) => string;

export type UpdateGhostChatMessage = (
  messageId: string,
  update: Partial<Omit<GhostChatThreadMessage, 'id'>>,
) => void;

type CreateGhostTerminalOutputOptions = {
  dispatch: GhostTerminalDispatch;
  lineIdRef: LineIdRef;
};

export function createGhostTerminalOutput({
  dispatch,
  lineIdRef,
}: CreateGhostTerminalOutputOptions) {
  const nextLineId = (prefix: string) => {
    lineIdRef.current += 1;
    return `ghost-${prefix}-${lineIdRef.current}`;
  };

  const appendLines: AppendGhostTerminalLines = (
    lines,
    { initialDelay = 90, step = BOOT_LINE_STEP_MS } = {},
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

  const appendChatMessage: AppendGhostChatMessage = (message) => {
    const chatMessage = {
      ...message,
      id: nextLineId('chat'),
    };

    dispatch({ type: 'chat_message_appended', message: chatMessage });

    return chatMessage.id;
  };

  const updateChatMessage: UpdateGhostChatMessage = (messageId, update) => {
    dispatch({ type: 'chat_message_updated', messageId, update });
  };

  return {
    appendChatMessage,
    appendLines,
    updateChatMessage,
  };
}
