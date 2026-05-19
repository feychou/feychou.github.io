import { useState } from 'react';
import './index.css';
import './glitch.css';

const ghostStates = {
  dormant: {
    label: 'Dormant ghost container',
    stageLabel: 'Dormant ghost chamber',
    figureAlt: 'Dormant ghost suspended in the container',
  },
  awake: {
    label: 'Awake ghost container',
    stageLabel: 'Awake ghost chamber',
    figureAlt: 'Awake ghost suspended in the container',
  },
};

function Ghost() {
  const [ghostState, setGhostState] = useState('dormant');
  const isAwake = ghostState === 'awake';
  const currentGhost = ghostStates[ghostState];
  const buttonLabel = isAwake ? 'SUSPEND GHOST' : 'INITIALIZE GHOST';
  const buttonIcon = isAwake ? 'unlock' : 'lock';

  return (
    <aside className="ghost-slot" data-ghost-state={ghostState} aria-label={currentGhost.label}>
      <div className="ghost-body">
        <button
          className="ghost-initialize"
          type="button"
          aria-label={isAwake ? 'Close ghost session' : 'Initialize ghost'}
          aria-pressed={isAwake}
          onClick={() => setGhostState(isAwake ? 'dormant' : 'awake')}
        >
          <span>&gt; {buttonLabel}</span>
          <svg className="ghost-lock-icon" viewBox="0 0 24 24" aria-hidden="true">
            <use href={`/assets/icons/${buttonIcon}.svg#icon`} />
          </svg>
        </button>

        <div className="ghost-stage" aria-label={currentGhost.stageLabel}>
          <img
            className="ghost-chamber-image"
            src="/assets/ghost/chamber-dormant.png"
            alt=""
            aria-hidden="true"
          />
          <img
            className="ghost-chamber-glow-image"
            src="/assets/ghost/chamber-awake-glow.png"
            alt=""
            aria-hidden="true"
          />
          <div className="ghost-figure-shell" role="img" aria-label={currentGhost.figureAlt}>
            <img
              className="ghost-figure-image ghost-figure-image-dormant"
              src="/assets/ghost/ghost-dormant.png"
              alt=""
              aria-hidden="true"
            />
            <img
              className="ghost-figure-image ghost-figure-image-awake"
              src="/assets/ghost/ghost-awake.png"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Ghost;
