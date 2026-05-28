import type { FormEventHandler, Ref } from 'react';
import GhostActionButton from '../GhostActionButton';
import './index.css';

type GhostAccessFormProps = {
  accessCode: string;
  disabled: boolean;
  inputRef: Ref<HTMLInputElement>;
  onAccessCodeChange: (accessCode: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

function GhostAccessForm({
  accessCode,
  disabled,
  inputRef,
  onAccessCodeChange,
  onSubmit,
}: GhostAccessFormProps) {
  return (
    <form className="ghost-terminal-form" onSubmit={onSubmit}>
      <label htmlFor="ghost-access-code">&gt; access phrase:</label>
      <input
        id="ghost-access-code"
        ref={inputRef}
        type="password"
        value={accessCode}
        autoComplete="off"
        spellCheck={false}
        disabled={disabled}
        onChange={(event) => onAccessCodeChange(event.target.value)}
      />
      <GhostActionButton
        ariaLabel="Send access phrase"
        className="ghost-terminal-submit"
        disabled={!accessCode.trim()}
        type="submit"
      >
        send
      </GhostActionButton>
    </form>
  );
}

export default GhostAccessForm;
