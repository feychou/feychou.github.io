import GhostActionButton from '../GhostActionButton';
import GhostChatForm from '../GhostChatForm';
import GhostTerminalLog from './GhostTerminalLog';
import { useGhostTerminalFlow } from './useGhostTerminalFlow';
import './index.css';

type GhostTerminalProps = {
  isChamberOn: boolean;
  onAwakeningSucceeded: () => void;
  onSuspend: () => void;
};

function GhostTerminal({ isChamberOn, onAwakeningSucceeded, onSuspend }: GhostTerminalProps) {
  const terminal = useGhostTerminalFlow({ isChamberOn, onAwakeningSucceeded });

  return (
    <section
      className="ghost-channel"
      aria-label="Ghost on the Shelf terminal"
      aria-hidden={!isChamberOn}
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
            {isChamberOn && (
              <GhostActionButton
                className="ghost-channel-action"
                ariaLabel="Suspend ghost"
                iconClassName="ghost-channel-action-icon"
                iconHref="/assets/icons/unlock.svg#icon"
                onClick={() => {
                  onSuspend();
                }}
              >
                suspend
              </GhostActionButton>
            )}
          </div>
        </header>
        <div className="ghost-channel-body">
          <span className="ghost-channel-trace ghost-channel-trace-a" aria-hidden="true" />
          <span className="ghost-channel-trace ghost-channel-trace-b" aria-hidden="true" />
          <span className="ghost-channel-trace ghost-channel-trace-c" aria-hidden="true" />
          {isChamberOn && (
            <GhostTerminalLog
              accessCode={terminal.accessCode}
              accessInputRef={terminal.accessInputRef}
              chatMessages={terminal.chatMessages}
              hasClearedLog={terminal.hasClearedLog}
              interactionLines={terminal.interactionLines}
              introText={terminal.introText}
              isLogClearing={terminal.isLogClearing}
              logRef={terminal.logRef}
              onAccessCodeChange={terminal.setAccessCode}
              onAccessSubmit={terminal.handleAccessSubmit}
              phase={terminal.phase}
            />
          )}
          {terminal.shouldShowChatPrompt && (
            <GhostChatForm
              disabled={terminal.phase !== 'complete'}
              inputRef={terminal.chatInputRef}
              isSending={terminal.isSendingChat}
              message={terminal.chatDraft}
              onMessageChange={terminal.setChatDraft}
              onSubmit={terminal.handleChatSubmit}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default GhostTerminal;
