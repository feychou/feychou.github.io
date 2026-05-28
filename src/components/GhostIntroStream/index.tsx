import './index.css';

type GhostIntroStreamProps = {
  emphasisStart: number;
  isStreaming: boolean;
  text: string;
};

function GhostIntroStream({ emphasisStart, isStreaming, text }: GhostIntroStreamProps) {
  return (
    <div className="ghost-channel-intro-stream">
      <GhostIntroText emphasisStart={emphasisStart} text={text} />
      {isStreaming && (
        <span className="ghost-channel-type-caret" aria-hidden="true" />
      )}
    </div>
  );
}

function GhostIntroText({
  emphasisStart,
  text,
}: Pick<GhostIntroStreamProps, 'emphasisStart' | 'text'>) {
  if (text.length <= emphasisStart) {
    return text;
  }

  return (
    <>
      {text.slice(0, emphasisStart)}
      <span className="ghost-channel-intro-emphasis">
        {text.slice(emphasisStart)}
      </span>
    </>
  );
}

export default GhostIntroStream;
