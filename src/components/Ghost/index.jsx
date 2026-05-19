import { useState } from 'react';
import './index.css';
import './glitch.css';

const ghostStates = {
  dormant: {
    figure: '/assets/ghost/ghost-dormant.png',
    label: 'Dormant ghost container',
    stageLabel: 'Dormant ghost chamber',
    figureAlt: 'Dormant ghost suspended in the container',
  },
  awake: {
    figure: '/assets/ghost/ghost-awake.png',
    label: 'Awake ghost container',
    stageLabel: 'Awake ghost chamber',
    figureAlt: 'Awake ghost suspended in the container',
  },
};

function Ghost() {
  const [ghostState, setGhostState] = useState('dormant');
  const isAwake = ghostState === 'awake';
  const currentGhost = ghostStates[ghostState];

  return (
    <aside className="ghost-slot" data-ghost-state={ghostState} aria-label={currentGhost.label}>
      <div className="ghost-body">
        <button
          className="ghost-initialize"
          type="button"
          aria-label={isAwake ? 'Ghost initialized' : 'Initialize ghost'}
          aria-pressed={isAwake}
          onClick={() => setGhostState('awake')}
        >
          <span>&gt; INITIALIZE GHOST</span>
          <svg className="ghost-lock-icon" viewBox="0 0 24 24" aria-hidden="true">
            <use href="/assets/icons/lock.svg#icon" />
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
          <img
            className="ghost-figure-image"
            src={currentGhost.figure}
            alt={currentGhost.figureAlt}
          />
        </div>
      </div>
    </aside>
  );
}

export default Ghost;
