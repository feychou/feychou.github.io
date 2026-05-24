import Ghost from '../Ghost';
import GhostTerminal from '../GhostTerminal';
import './index.css';

const ghostStateLabels = {
  dormant: 'Dormant ghost container',
  awake: 'Awake ghost container',
};

type GhostChannelProps = {
  isAwake: boolean;
  onToggleAwake: () => void;
};

function GhostChannel({ isAwake, onToggleAwake }: GhostChannelProps) {
  const ghostState = isAwake ? 'awake' : 'dormant';

  return (
    <aside
      className="ghost-slot"
      data-ghost-state={ghostState}
      aria-label={ghostStateLabels[ghostState]}
    >
      <div className="ghost-body">
        <Ghost isAwake={isAwake} onToggleAwake={onToggleAwake} />
        <GhostTerminal isAwake={isAwake} onSuspend={onToggleAwake} />
      </div>
    </aside>
  );
}

export default GhostChannel;
