import './index.css';

export type GhostChatThreadMessageRole = 'ghost' | 'system' | 'user';

export type GhostChatThreadMessage = {
  id: string;
  role: GhostChatThreadMessageRole;
  text: string;
  isTyping?: boolean;
};

type GhostChatThreadProps = {
  messages: GhostChatThreadMessage[];
};

function GhostChatThread({ messages }: GhostChatThreadProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="ghost-chat-thread" aria-label="Ghost conversation">
      {messages.map((message) => (
        <div
          className={[
            'ghost-chat-message',
            `ghost-chat-message-${message.role}`,
            message.isTyping ? 'is-typing' : '',
          ].filter(Boolean).join(' ')}
          key={message.id}
        >
          <span className="ghost-chat-message-prefix" aria-hidden="true">
            {message.role === 'user' ? '>' : '<'}
          </span>
          <span className="ghost-chat-message-text">
            {message.text}
            {message.isTyping && (
              <span className="ghost-chat-type-caret" aria-hidden="true" />
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export default GhostChatThread;
