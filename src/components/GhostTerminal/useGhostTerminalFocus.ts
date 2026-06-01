import { useEffect, type RefObject } from 'react';

type UseGhostTerminalFocusOptions = {
  accessInputRef: RefObject<HTMLInputElement>;
  chatInputRef: RefObject<HTMLInputElement>;
  shouldFocusAccess: boolean;
  shouldFocusChat: boolean;
};

export function useGhostTerminalFocus({
  accessInputRef,
  chatInputRef,
  shouldFocusAccess,
  shouldFocusChat,
}: UseGhostTerminalFocusOptions) {
  useEffect(() => {
    const timers: number[] = [];

    if (shouldFocusAccess) {
      timers.push(window.setTimeout(() => accessInputRef.current?.focus(), 60));
    }

    if (shouldFocusChat) {
      timers.push(window.setTimeout(() => chatInputRef.current?.focus(), 90));
    }

    return () => {
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, [accessInputRef, chatInputRef, shouldFocusAccess, shouldFocusChat]);
}
