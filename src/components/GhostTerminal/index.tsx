import type { CSSProperties } from 'react';
import GhostActionButton from '../GhostActionButton';
import './index.css';

type GhostTerminalProps = {
  isAwake: boolean;
  onSuspend: () => void;
};

type BootLine = {
  text: string;
  tone?: 'process' | 'title' | 'system' | 'wait' | 'ready';
  broken?: boolean;
};

const bootSequence = [
  { text: '> booting ghost core...', tone: 'process', broken: true },
  { text: '> loading chamber state...', tone: 'process' },
  { text: '> indexing memory fragments...', tone: 'process' },
  { text: '> stabilizing conversational identity...', tone: 'process', broken: true },
  { text: '> reconstructing latent personality traces...', tone: 'process' },
  { text: '> retrieval field online.', tone: 'process' },
  { text: '' },
  { text: 'Ghost on the Shelf v0.9', tone: 'title', broken: true },
  { text: 'archival continuity system initialized.', tone: 'system' },
  { text: '' },
  { text: 'awakening archive...', tone: 'process' },
  { text: '' },
  { text: '...', tone: 'wait', broken: true },
  { text: '' },
  { text: 'signal acquired.', tone: 'ready' },
] satisfies BootLine[];

function GhostTerminal({ isAwake, onSuspend }: GhostTerminalProps) {
  return (
    <section
      className="ghost-channel"
      aria-label="Ghost on the Shelf terminal"
      aria-hidden={!isAwake}
    >
      <div className="ghost-channel-frame">
        <header className="ghost-channel-header">
          <h2>Ghost on the Shelf</h2>
          <div className="ghost-channel-tools">
            <div className="ghost-channel-status" aria-hidden="true">
              <span>channel</span>
              <span>secure</span>
              <span>ai-xf</span>
            </div>
            {isAwake && (
              <GhostActionButton
                className="ghost-channel-action"
                ariaLabel="Suspend ghost"
                iconClassName="ghost-channel-action-icon"
                iconHref="/assets/icons/unlock.svg#icon"
                onClick={() => {
                  onSuspend();
                }}
              >
                &gt; Suspend
              </GhostActionButton>
            )}
          </div>
        </header>
        <div className="ghost-channel-body">
          <span className="ghost-channel-trace ghost-channel-trace-a" aria-hidden="true" />
          <span className="ghost-channel-trace ghost-channel-trace-b" aria-hidden="true" />
          <span className="ghost-channel-trace ghost-channel-trace-c" aria-hidden="true" />
          {isAwake && (
            <div className="ghost-channel-log" role="log" aria-label="Awakening archive boot log">
              {bootSequence.map((line, index) => {
                const lineClassName = [
                  'ghost-channel-line',
                  line.tone ? `ghost-channel-line-${line.tone}` : '',
                  line.broken ? 'is-broken' : '',
                  line.text ? '' : 'is-gap',
                ].filter(Boolean).join(' ');
                const lineStyle = {
                  '--ghost-line-delay': `${360 + index * 520}ms`,
                } as CSSProperties;

                return (
                  <span
                    className={lineClassName}
                    data-text={line.text}
                    key={`${line.text}-${index}`}
                    style={lineStyle}
                  >
                    {line.text}
                  </span>
                );
              })}
            </div>
          )}
          {isAwake && <span className="ghost-channel-cursor" aria-hidden="true" />}
        </div>
      </div>
    </section>
  );
}

export default GhostTerminal;
