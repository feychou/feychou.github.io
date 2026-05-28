import type { CSSProperties } from 'react';
import './index.css';

export type GhostTerminalLineTone =
  | 'error'
  | 'input'
  | 'process'
  | 'ready'
  | 'reply'
  | 'system'
  | 'title'
  | 'wait';

export type GhostTerminalLineEntry = {
  text: string;
  tone?: GhostTerminalLineTone;
  broken?: boolean;
  delay: number;
};

type GhostTerminalLineProps = {
  line: GhostTerminalLineEntry;
};

function GhostTerminalLine({ line }: GhostTerminalLineProps) {
  const lineClassName = [
    'ghost-channel-line',
    line.tone ? `ghost-channel-line-${line.tone}` : '',
    line.broken ? 'is-broken' : '',
    line.text ? '' : 'is-gap',
  ].filter(Boolean).join(' ');
  const lineStyle = {
    '--ghost-line-delay': `${line.delay}ms`,
  } as CSSProperties;

  return (
    <span className={lineClassName} data-text={line.text} style={lineStyle}>
      {line.text}
    </span>
  );
}

export default GhostTerminalLine;
