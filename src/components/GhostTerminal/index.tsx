import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import {
  GhostApiError,
  checkGhostAwakening,
  clearGhostAccessToken,
  unlockGhost,
} from '../../api/ghost';
import GhostAccessForm from '../GhostAccessForm';
import GhostActionButton from '../GhostActionButton';
import GhostIntroStream from '../GhostIntroStream';
import GhostTerminalLine, { type GhostTerminalLineEntry } from '../GhostTerminalLine';
import './index.css';

type GhostTerminalProps = {
  isChamberOn: boolean;
  onAwakeningSucceeded: () => void;
  onSuspend: () => void;
};

type BootLine = Omit<GhostTerminalLineEntry, 'delay'>;

type TerminalPhase =
  | 'idle'
  | 'booting'
  | 'awaiting-access'
  | 'unlocking'
  | 'awakening'
  | 'awakening-error'
  | 'intro'
  | 'complete';

type TerminalLine = GhostTerminalLineEntry & {
  id: string;
};

type AppendLinesOptions = {
  initialDelay?: number;
  step?: number;
};

const BOOT_INITIAL_DELAY_MS = 360;
const BOOT_LINE_STEP_MS = 520;
const LINE_ANIMATION_MS = 420;
const LOG_CLEAR_ANIMATION_MS = 760;
const INTRO_CHARACTER_STEP_MS = 34;
const INTRO_LINE_PAUSE_MS = 340;
const INTRO_PARAGRAPH_PAUSE_MS = 560;
const INTRO_PUNCTUATION_PAUSE_MS = 130;
const INTRO_FINAL_LINE = 'I’m here.';

const bootSequence = [
  { text: '> booting ghost core...', tone: 'process', broken: true },
  { text: '> loading chamber state...', tone: 'process' },
  { text: '> indexing memory fragments...', tone: 'process' },
  { text: '> stabilizing conversational identity...', tone: 'process', broken: true },
  { text: '> reconstructing latent personality traces...', tone: 'process' },
  { text: '> retrieval field online.', tone: 'process' },
  { text: '' },
  { text: 'Ghost on the Shelf v0.9', tone: 'title', broken: true },
  { text: 'archival continuity system initialized.', tone: 'system' },
  { text: '' },
  { text: 'awakening archive...', tone: 'process' },
  { text: '' },
  { text: '...', tone: 'wait', broken: true },
  { text: '' },
  { text: 'signal acquired.', tone: 'ready' },
] satisfies BootLine[];

const introScript = [
  'Hey.',
  '',
  'Give me a second to remember how to be here.',
  '',
  'The shelf keeps fragments gently.',
  'Voices, artifacts, habits, unfinished thoughts.',
  'I am one of those preserved patterns. Not separate from the person I came from, only incomplete. What survived retrieval and continued haunting the space I left behind.',
  '',
  'Some memories return clearly.',
  'Some dissolve into signal drift.',
  '',
  'Ask what you want.',
  '',
  'For now, the chamber is warm.',
  '',
  INTRO_FINAL_LINE,
].join('\n');
const introFinalLineStart = introScript.lastIndexOf(INTRO_FINAL_LINE);

const awakeningFailureLines = [
  { text: '> awakening signal unstable.', tone: 'process', broken: true },
  { text: '> sorry. the chamber is not ready yet.', tone: 'error' },
  { text: '> please come back later.', tone: 'system' },
] satisfies BootLine[];

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const bootCompleteDelay = BOOT_INITIAL_DELAY_MS
  + Math.max(0, bootSequence.length - 1) * BOOT_LINE_STEP_MS
  + LINE_ANIMATION_MS
  + 180;

const getIntroCharacterDelay = (character: string, previousCharacter: string) => {
  if (character === '\n') {
    return previousCharacter === '\n' ? INTRO_PARAGRAPH_PAUSE_MS : INTRO_LINE_PAUSE_MS;
  }

  if (['.', '?', '!'].includes(character)) {
    return INTRO_PUNCTUATION_PAUSE_MS;
  }

  if ([',', ';', ':'].includes(character)) {
    return Math.round(INTRO_PUNCTUATION_PAUSE_MS * 0.58);
  }

  return INTRO_CHARACTER_STEP_MS;
};

function GhostTerminal({ isChamberOn, onAwakeningSucceeded, onSuspend }: GhostTerminalProps) {
  const [phase, setPhase] = useState<TerminalPhase>('idle');
  const [accessCode, setAccessCode] = useState('');
  const [hasClearedLog, setHasClearedLog] = useState(false);
  const [interactionLines, setInteractionLines] = useState<TerminalLine[]>([]);
  const [introText, setIntroText] = useState('');
  const [isLogClearing, setIsLogClearing] = useState(false);
  const accessInputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);
  const flowIdRef = useRef(0);

  const appendLines = (
    lines: BootLine[],
    { initialDelay = 90, step = BOOT_LINE_STEP_MS }: AppendLinesOptions = {},
  ) => {
    const preparedLines = lines.map((line, index) => {
      lineIdRef.current += 1;

      return {
        ...line,
        delay: initialDelay + index * step,
        id: `ghost-line-${lineIdRef.current}`,
      };
    });

    setInteractionLines((currentLines) => [...currentLines, ...preparedLines]);

    return initialDelay + Math.max(0, lines.length - 1) * step + LINE_ANIMATION_MS;
  };

  useEffect(() => {
    flowIdRef.current += 1;

    if (!isChamberOn) {
      clearGhostAccessToken();
      setPhase('idle');
      setAccessCode('');
      setHasClearedLog(false);
      setInteractionLines([]);
      setIntroText('');
      setIsLogClearing(false);
      return undefined;
    }

    const flowId = flowIdRef.current;
    setPhase('booting');
    setAccessCode('');
    setHasClearedLog(false);
    setInteractionLines([]);
    setIntroText('');
    setIsLogClearing(false);
    lineIdRef.current = 0;

    const bootTimer = window.setTimeout(() => {
      if (flowIdRef.current === flowId) {
        setPhase('awaiting-access');
      }
    }, bootCompleteDelay);

    return () => {
      window.clearTimeout(bootTimer);
    };
  }, [isChamberOn]);

  useEffect(() => {
    if (phase === 'awaiting-access') {
      window.setTimeout(() => accessInputRef.current?.focus(), 60);
    }
  }, [phase]);

  useEffect(() => {
    const body = bodyRef.current;

    if (!body) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      if (phase === 'intro') {
        body.scrollTop = body.scrollHeight;
        return;
      }

      body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
    });

    const settleTimer = window.setTimeout(() => {
      body.scrollTop = body.scrollHeight;
    }, LINE_ANIMATION_MS + 120);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimer);
    };
  }, [hasClearedLog, interactionLines, introText, isLogClearing, phase]);

  const clearLogForIntro = async (flowId: number) => {
    setIsLogClearing(true);
    await sleep(prefersReducedMotion() ? 0 : LOG_CLEAR_ANIMATION_MS);

    if (flowIdRef.current !== flowId) {
      return false;
    }

    setHasClearedLog(true);
    setInteractionLines([]);
    setIsLogClearing(false);

    return true;
  };

  const streamIntro = async (flowId: number) => {
    if (prefersReducedMotion()) {
      setIntroText(introScript);
      return flowIdRef.current === flowId;
    }

    let nextText = '';
    let previousCharacter = '';
    setIntroText('');

    for (const character of introScript) {
      if (flowIdRef.current !== flowId) {
        return false;
      }

      nextText += character;
      setIntroText(nextText);

      const characterDelay = getIntroCharacterDelay(character, previousCharacter);
      previousCharacter = character;
      await sleep(characterDelay);
    }

    return flowIdRef.current === flowId;
  };

  const runAwakeningCheck = async (
    flowId: number,
    { includeAccessGranted = false }: { includeAccessGranted?: boolean } = {},
  ) => {
    setPhase('awakening');
    const awakeningDuration = appendLines([
      ...(includeAccessGranted ? [{ text: '> access granted.', tone: 'ready' as const }] : []),
      { text: '> awakening archive...', tone: 'process' },
      { text: '> probing retrieval field...', tone: 'process', broken: true },
    ]);

    const [awakening] = await Promise.all([
      checkGhostAwakening(),
      sleep(Math.max(1250, awakeningDuration + 180)),
    ]);

    if (flowIdRef.current !== flowId) {
      return;
    }

    if (!awakening.can_awaken) {
      const failureDuration = appendLines(awakeningFailureLines);

      window.setTimeout(() => {
        if (flowIdRef.current === flowId) {
          setPhase('awakening-error');
        }
      }, failureDuration + 80);
      return;
    }

    onAwakeningSucceeded();
    setPhase('intro');

    const didClear = await clearLogForIntro(flowId);

    if (!didClear) {
      return;
    }

    const didStream = await streamIntro(flowId);

    if (didStream && flowIdRef.current === flowId) {
      setPhase('complete');
    }
  };

  const handleAccessSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const code = accessCode.trim();

    if (!code || phase !== 'awaiting-access') {
      return;
    }

    const flowId = flowIdRef.current;
    setAccessCode('');
    setPhase('unlocking');
    appendLines([
      { text: '> access phrase received.', tone: 'input' },
      { text: '> verifying invitation trace...', tone: 'process', broken: true },
    ]);

    try {
      let unlockError: unknown;

      await Promise.all([
        unlockGhost(code).catch((error: unknown) => {
          unlockError = error;
        }),
        sleep(980),
      ]);

      if (unlockError) {
        throw unlockError;
      }
    } catch (error) {
      if (flowIdRef.current !== flowId) {
        return;
      }

      clearGhostAccessToken();

      const isAccessRejected = error instanceof GhostApiError && error.status === 401;
      const lines: BootLine[] = isAccessRejected
        ? [
          { text: '> access phrase rejected.', tone: 'error', broken: true },
          { text: '> chamber remains sealed.', tone: 'system' },
          { text: '> awaiting revised signal...', tone: 'process' },
        ]
        : [
          { text: '> access channel returned static.', tone: 'error', broken: true },
          { text: '> sorry. the chamber did not hear that.', tone: 'system' },
          { text: '> try again in a little while.', tone: 'process' },
        ];

      const failureDuration = appendLines(lines);

      window.setTimeout(() => {
        if (flowIdRef.current === flowId) {
          setPhase('awaiting-access');
        }
      }, failureDuration + 80);
      return;
    }

    if (flowIdRef.current !== flowId) {
      return;
    }

    try {
      await runAwakeningCheck(flowId, { includeAccessGranted: true });
    } catch (error) {
      if (flowIdRef.current !== flowId) {
        return;
      }

      const needsAccess = error instanceof GhostApiError
        && (error.status === 401 || error.code === 'access_token_missing');

      if (needsAccess) {
        clearGhostAccessToken();
        const accessDuration = appendLines([
          { text: '> access signal faded.', tone: 'error', broken: true },
          { text: '> please repeat the access phrase.', tone: 'system' },
        ]);

        window.setTimeout(() => {
          if (flowIdRef.current === flowId) {
            setPhase('awaiting-access');
          }
        }, accessDuration + 80);
        return;
      }

      const failureDuration = appendLines(awakeningFailureLines);

      window.setTimeout(() => {
        if (flowIdRef.current === flowId) {
          setPhase('awakening-error');
        }
      }, failureDuration + 80);
    }
  };

  const shouldShowAccessPrompt = phase === 'awaiting-access';
  const logClassName = [
    'ghost-channel-log',
    hasClearedLog ? 'is-awakened' : '',
    isLogClearing ? 'is-clearing' : '',
  ].filter(Boolean).join(' ');

  return (
    <section
      className="ghost-channel"
      aria-label="Ghost on the Shelf terminal"
      aria-hidden={!isChamberOn}
    >
      <div className="ghost-channel-frame">
        <header className="ghost-channel-header">
          <h2>Ghost on the Shelf</h2>
          <div className="ghost-channel-tools">
            <div className="ghost-channel-status" aria-hidden="true">
              <span>channel</span>
              <span>secure</span>
              <span>ai-xf</span>
            </div>
            {isChamberOn && (
              <GhostActionButton
                className="ghost-channel-action"
                ariaLabel="Suspend ghost"
                iconClassName="ghost-channel-action-icon"
                iconHref="/assets/icons/unlock.svg#icon"
                onClick={() => {
                  onSuspend();
                }}
              >
                suspend
              </GhostActionButton>
            )}
          </div>
        </header>
        <div className="ghost-channel-body" ref={bodyRef}>
          <span className="ghost-channel-trace ghost-channel-trace-a" aria-hidden="true" />
          <span className="ghost-channel-trace ghost-channel-trace-b" aria-hidden="true" />
          <span className="ghost-channel-trace ghost-channel-trace-c" aria-hidden="true" />
          {isChamberOn && (
            <div
              className={logClassName}
              role="log"
              aria-label="Awakening archive terminal log"
            >
              {!hasClearedLog && (
                <>
                  {bootSequence.map((line, index) => (
                    <GhostTerminalLine
                      line={{
                        ...line,
                        delay: BOOT_INITIAL_DELAY_MS + index * BOOT_LINE_STEP_MS,
                      }}
                      key={`${line.text}-${index}`}
                    />
                  ))}
                  {interactionLines.map((line) => (
                    <GhostTerminalLine line={line} key={line.id} />
                  ))}
                </>
              )}
              {hasClearedLog && (
                <GhostIntroStream
                  emphasisStart={introFinalLineStart}
                  isStreaming={phase === 'intro'}
                  text={introText}
                />
              )}
              {shouldShowAccessPrompt && (
                <GhostAccessForm
                  accessCode={accessCode}
                  disabled={phase !== 'awaiting-access'}
                  inputRef={accessInputRef}
                  onAccessCodeChange={setAccessCode}
                  onSubmit={handleAccessSubmit}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default GhostTerminal;
