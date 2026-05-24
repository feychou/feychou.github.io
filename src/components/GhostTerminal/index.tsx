import './index.css';

type GhostTerminalProps = {
  isAwake: boolean;
  onSuspend: () => void;
};

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
              <button
                className="ghost-channel-action"
                type="button"
                aria-label="Suspend ghost"
                onClick={(event) => {
                  event.currentTarget.blur();
                  onSuspend();
                }}
              >
                <span>&gt; Suspend</span>
                <svg className="ghost-channel-action-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="/assets/icons/unlock.svg#icon" />
                </svg>
              </button>
            )}
          </div>
        </header>
        <div className="ghost-channel-body" aria-hidden="true">
          <span className="ghost-channel-trace ghost-channel-trace-a" />
          <span className="ghost-channel-trace ghost-channel-trace-b" />
          <span className="ghost-channel-trace ghost-channel-trace-c" />
          <span className="ghost-channel-cursor" />
        </div>
      </div>
    </section>
  );
}

export default GhostTerminal;
