import './index.css';
import './glitch.css';

const ghostStates = {
  dormant: {
    stageLabel: 'Dormant ghost chamber',
    figureAlt: 'Dormant ghost suspended in the container',
  },
  awake: {
    stageLabel: 'Awake ghost chamber',
    figureAlt: 'Awake ghost suspended in the container',
  },
};

type GhostProps = {
  isAwake: boolean;
  onToggleAwake: () => void;
};

function Ghost({ isAwake, onToggleAwake }: GhostProps) {
  const ghostState = isAwake ? 'awake' : 'dormant';
  const currentGhost = ghostStates[ghostState];

  return (
    <>
      {!isAwake && (
        <button
          className="ghost-initialize"
          type="button"
          aria-label="Initialize ghost"
          aria-pressed="false"
          onClick={(event) => {
            event.currentTarget.blur();
            onToggleAwake();
          }}
        >
          <span>&gt; INITIALIZE GHOST</span>
          <svg className="ghost-lock-icon" viewBox="0 0 24 24" aria-hidden="true">
            <use href="/assets/icons/lock.svg#icon" />
          </svg>
        </button>
      )}

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
    </>
  );
}

export default Ghost;
