import { useEffect, type RefObject } from 'react';
import { LINE_ANIMATION_MS } from '../timing';

type UseGhostTerminalScrollOptions = {
  chatMessages: readonly unknown[];
  hasClearedLog: boolean;
  interactionLines: readonly unknown[];
  introText: string;
  isIntroPhase: boolean;
  isLogClearing: boolean;
  logRef: RefObject<HTMLDivElement>;
};

export function useGhostTerminalScroll({
  chatMessages,
  hasClearedLog,
  interactionLines,
  introText,
  isIntroPhase,
  isLogClearing,
  logRef,
}: UseGhostTerminalScrollOptions) {
  useEffect(() => {
    const log = logRef.current;

    if (!log) {
      return undefined;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      if (isIntroPhase) {
        log.scrollTop = log.scrollHeight;
        return;
      }

      log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
    });

    const settleTimer = window.setTimeout(() => {
      log.scrollTop = log.scrollHeight;
    }, LINE_ANIMATION_MS + 120);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimer);
    };
  }, [chatMessages, hasClearedLog, interactionLines, introText, isIntroPhase, isLogClearing, logRef]);
}
