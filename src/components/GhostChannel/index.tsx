import Ghost from '../Ghost';
import GhostTerminal from '../GhostTerminal';
import './index.css';

const ghostStateLabels = {
  sleeping: 'Sleeping ghost container',
  awake: 'Awake ghost container',
};

type GhostChannelProps = {
  hasGhostAwakened: boolean;
  isChamberOn: boolean;
  onAwakeningSucceeded: () => void;
  onBootGhost: () => void;
  onSuspendGhost: () => void;
};

function GhostChannel({
  hasGhostAwakened,
  isChamberOn,
  onAwakeningSucceeded,
  onBootGhost,
  onSuspendGhost,
}: GhostChannelProps) {
  const chamberState = isChamberOn ? 'on' : 'off';
  const ghostState = hasGhostAwakened ? 'awake' : 'sleeping';

  return (
    <aside
      className="ghost-slot"
      data-chamber-state={chamberState}
      data-ghost-state={ghostState}
      aria-label={ghostStateLabels[ghostState]}
    >
      <div className="ghost-body">
        <Ghost
          hasGhostAwakened={hasGhostAwakened}
          isChamberOn={isChamberOn}
          onBootGhost={onBootGhost}
        />
        <GhostTerminal
          isChamberOn={isChamberOn}
          onAwakeningSucceeded={onAwakeningSucceeded}
          onSuspend={onSuspendGhost}
        />
      </div>
    </aside>
  );
}

export default GhostChannel;
