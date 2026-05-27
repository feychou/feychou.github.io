import type { ReactNode } from 'react';
import './index.css';

type GhostActionButtonProps = {
  ariaLabel: string;
  ariaPressed?: boolean;
  children: ReactNode;
  className: string;
  iconClassName: string;
  iconHref: string;
  onClick: () => void;
};

function GhostActionButton({
  ariaLabel,
  ariaPressed,
  children,
  className,
  iconClassName,
  iconHref,
  onClick,
}: GhostActionButtonProps) {
  return (
    <button
      className={`ghost-action-button ${className}`}
      type="button"
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      onClick={(event) => {
        event.currentTarget.blur();
        onClick();
      }}
    >
      <span className="ghost-action-label">{children}</span>
      <svg className={`ghost-action-icon ${iconClassName}`} viewBox="0 0 24 24" aria-hidden="true">
        <use href={iconHref} />
      </svg>
    </button>
  );
}

export default GhostActionButton;
