import GhostActionButton from '../GhostActionButton';
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
        <GhostActionButton
          className="ghost-initialize"
          ariaLabel="initialize ghost"
          ariaPressed={false}
          iconClassName="ghost-lock-icon"
          iconHref="/assets/icons/lock.svg#icon"
          onClick={() => {
            onToggleAwake();
          }}
        >
          &gt; initialize ghost
        </GhostActionButton>
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
