import type { MutableRefObject } from 'react';
import type { GhostTerminalLineEntry } from '../GhostTerminalLine';

export type BootLine = Omit<GhostTerminalLineEntry, 'delay'>;

export type TerminalPhase =
  | 'idle'
  | 'booting'
  | 'awaiting-access'
  | 'unlocking'
  | 'awakening'
  | 'awakening-error'
  | 'intro'
  | 'chatting'
  | 'chat-locked'
  | 'complete';

export type TerminalLine = GhostTerminalLineEntry & {
  id: string;
};

export type AppendLinesOptions = {
  initialDelay?: number;
  step?: number;
};

export type FlowIdRef = MutableRefObject<number>;

export type LineIdRef = MutableRefObject<number>;
