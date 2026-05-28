import type { FormEventHandler, Ref } from 'react';
import GhostActionButton from '../GhostActionButton';
import './index.css';

type GhostChatFormProps = {
  disabled: boolean;
  inputRef: Ref<HTMLInputElement>;
  isSending: boolean;
  message: string;
  onMessageChange: (message: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

function GhostChatForm({
  disabled,
  inputRef,
  isSending,
  message,
  onMessageChange,
  onSubmit,
}: GhostChatFormProps) {
  return (
    <form className="ghost-chat-form" onSubmit={onSubmit}>
      <label htmlFor="ghost-chat-message">&gt; say:</label>
      <input
        id="ghost-chat-message"
        ref={inputRef}
        type="text"
        value={message}
        autoComplete="off"
        spellCheck={false}
        disabled={disabled}
        aria-label="Message to ghost"
        onChange={(event) => onMessageChange(event.target.value)}
      />
      <GhostActionButton
        ariaLabel="Send message to ghost"
        className="ghost-chat-submit"
        disabled={disabled || !message.trim()}
        type="submit"
      >
        {isSending ? 'wait' : 'send'}
      </GhostActionButton>
    </form>
  );
}

export default GhostChatForm;
