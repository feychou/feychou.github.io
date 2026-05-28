import GhostActionButton from '../GhostActionButton';
import './index.css';
import './glitch.css';

const ghostStates = {
  sleeping: {
    stageLabel: 'Sleeping ghost chamber',
    figureAlt: 'Sleeping ghost suspended in the container',
  },
  awake: {
    stageLabel: 'Awake ghost chamber',
    figureAlt: 'Awake ghost suspended in the container',
  },
};

type GhostProps = {
  hasGhostAwakened: boolean;
  isChamberOn: boolean;
  onBootGhost: () => void;
};

function Ghost({ hasGhostAwakened, isChamberOn, onBootGhost }: GhostProps) {
  const ghostState = hasGhostAwakened ? 'awake' : 'sleeping';
  const currentGhost = ghostStates[ghostState];

  return (
    <>
      {!isChamberOn && (
        <GhostActionButton
          className="ghost-initialize"
          ariaLabel="boot ghost"
          ariaPressed={false}
          iconClassName="ghost-lock-icon"
          iconHref="/assets/icons/lock.svg#icon"
          onClick={() => {
            onBootGhost();
          }}
        >
          boot ghost
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
