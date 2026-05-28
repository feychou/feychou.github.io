import type { ReactNode } from 'react';
import './index.css';

type GhostActionButtonProps = {
  ariaLabel: string;
  ariaPressed?: boolean;
  children: ReactNode;
  className: string;
  disabled?: boolean;
  iconClassName?: string;
  iconHref?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

function GhostActionButton({
  ariaLabel,
  ariaPressed,
  children,
  className,
  disabled,
  iconClassName,
  iconHref,
  onClick,
  type = 'button',
}: GhostActionButtonProps) {
  return (
    <button
      className={`ghost-action-button ${className}`}
      type={type}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      disabled={disabled}
      onClick={(event) => {
        event.currentTarget.blur();
        onClick?.();
      }}
    >
      <span className="ghost-action-label">
        <span className="ghost-action-prefix" aria-hidden="true">&gt; </span>
        <span className="ghost-action-text">{children}</span>
      </span>
      {iconHref && (
        <svg
          className={`ghost-action-icon ${iconClassName ?? ''}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <use href={iconHref} />
        </svg>
      )}
    </button>
  );
}

export default GhostActionButton;
