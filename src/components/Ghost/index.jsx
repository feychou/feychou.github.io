import './index.css';
import './glitch.css';

function Ghost() {
  return (
    <aside className="ghost-slot" aria-label="Dormant ghost container">
      <div className="ghost-body">
        <button className="ghost-initialize" type="button" aria-label="Initialize ghost locked">
          <span>&gt; INITIALIZE GHOST</span>
          <svg className="ghost-lock-icon" viewBox="0 0 24 24" aria-hidden="true">
            <use href="/assets/icons/lock.svg#icon" />
          </svg>
        </button>

        <div className="ghost-stage" aria-label="Dormant ghost chamber">
          <img
            className="ghost-chamber-image"
            src="/assets/ghost/chamber-dormant.png"
            alt=""
            aria-hidden="true"
          />
          <img
            className="ghost-figure-image"
            src="/assets/ghost/ghost-dormant.png"
            alt="Dormant ghost suspended in the container"
          />
        </div>
      </div>
    </aside>
  );
}

export default Ghost;
