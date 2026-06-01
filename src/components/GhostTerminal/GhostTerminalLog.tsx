import type { FormEventHandler, RefObject } from 'react';
import GhostAccessForm from '../GhostAccessForm';
import GhostChatThread, { type GhostChatThreadMessage } from '../GhostChatThread';
import GhostIntroStream from '../GhostIntroStream';
import GhostTerminalLine from '../GhostTerminalLine';
import { bootSequence, introFinalLineStart } from './content';
import {
  BOOT_INITIAL_DELAY_MS,
  BOOT_LINE_STEP_MS,
} from './timing';
import type { TerminalLine, TerminalPhase } from './types';

type GhostTerminalLogProps = {
  accessCode: string;
  accessInputRef: RefObject<HTMLInputElement>;
  chatMessages: GhostChatThreadMessage[];
  hasClearedLog: boolean;
  interactionLines: TerminalLine[];
  introText: string;
  isLogClearing: boolean;
  logRef: RefObject<HTMLDivElement>;
  onAccessCodeChange: (accessCode: string) => void;
  onAccessSubmit: FormEventHandler<HTMLFormElement>;
  phase: TerminalPhase;
};

function GhostTerminalLog({
  accessCode,
  accessInputRef,
  chatMessages,
  hasClearedLog,
  interactionLines,
  introText,
  isLogClearing,
  logRef,
  onAccessCodeChange,
  onAccessSubmit,
  phase,
}: GhostTerminalLogProps) {
  const logClassName = [
    'ghost-channel-log',
    hasClearedLog ? 'is-awakened' : '',
    isLogClearing ? 'is-clearing' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={logClassName}
      ref={logRef}
      role="log"
      aria-label="Awakening archive terminal log"
    >
      {!hasClearedLog && (
        <>
          {bootSequence.map((line, index) => (
            <GhostTerminalLine
              line={{
                ...line,
                delay: BOOT_INITIAL_DELAY_MS + index * BOOT_LINE_STEP_MS,
              }}
              key={`${line.text}-${index}`}
            />
          ))}
          {interactionLines.map((line) => (
            <GhostTerminalLine line={line} key={line.id} />
          ))}
        </>
      )}
      {hasClearedLog && (
        <>
          <GhostIntroStream
            emphasisStart={introFinalLineStart}
            isStreaming={phase === 'intro'}
            text={introText}
          />
          <GhostChatThread messages={chatMessages} />
        </>
      )}
      {phase === 'awaiting-access' && (
        <GhostAccessForm
          accessCode={accessCode}
          disabled={phase !== 'awaiting-access'}
          inputRef={accessInputRef}
          onAccessCodeChange={onAccessCodeChange}
          onSubmit={onAccessSubmit}
        />
      )}
    </div>
  );
}

export default GhostTerminalLog;
