import { bootSequence } from './content';

export const BOOT_INITIAL_DELAY_MS = 360;
export const BOOT_LINE_STEP_MS = 520;
export const LINE_ANIMATION_MS = 420;
export const LOG_CLEAR_ANIMATION_MS = 760;

const INTRO_CHARACTER_STEP_MS = 34;
const INTRO_LINE_PAUSE_MS = 340;
const INTRO_PARAGRAPH_PAUSE_MS = 560;
const INTRO_PUNCTUATION_PAUSE_MS = 130;
const CHAT_CHARACTER_STEP_MS = 18;
const CHAT_LINE_PAUSE_MS = 180;
const CHAT_PUNCTUATION_PAUSE_MS = 82;

export const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const bootCompleteDelay = BOOT_INITIAL_DELAY_MS
  + Math.max(0, bootSequence.length - 1) * BOOT_LINE_STEP_MS
  + LINE_ANIMATION_MS
  + 180;

export const getIntroCharacterDelay = (character: string, previousCharacter: string) => {
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

export const getChatCharacterDelay = (character: string, previousCharacter: string) => {
  if (character === '\n') {
    return previousCharacter === '\n' ? CHAT_LINE_PAUSE_MS * 1.6 : CHAT_LINE_PAUSE_MS;
  }

  if (['.', '?', '!'].includes(character)) {
    return CHAT_PUNCTUATION_PAUSE_MS;
  }

  if ([',', ';', ':'].includes(character)) {
    return Math.round(CHAT_PUNCTUATION_PAUSE_MS * 0.58);
  }

  return CHAT_CHARACTER_STEP_MS;
};
