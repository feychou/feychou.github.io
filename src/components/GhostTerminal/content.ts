import type { BootLine } from './types';

export const bootSequence = [
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

const INTRO_FINAL_LINE = 'I’m here.';

export const introScript = [
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

export const introFinalLineStart = introScript.lastIndexOf(INTRO_FINAL_LINE);

export const awakeningFailureLines = [
  { text: '> awakening signal unstable.', tone: 'process', broken: true },
  { text: '> sorry. the chamber is not ready yet.', tone: 'error' },
  { text: '> please come back later.', tone: 'system' },
] satisfies BootLine[];

const awakeningAccessGrantedLine = {
  text: '> access granted.',
  tone: 'ready',
} satisfies BootLine;

const awakeningCheckLines = [
  { text: '> awakening archive...', tone: 'process' },
  { text: '> probing retrieval field...', tone: 'process', broken: true },
] satisfies BootLine[];

export const accessSubmissionLines = [
  { text: '> access phrase received.', tone: 'input' },
  { text: '> verifying invitation trace...', tone: 'process', broken: true },
] satisfies BootLine[];

export const accessRejectedLines = [
  { text: '> access phrase rejected.', tone: 'error', broken: true },
  { text: '> chamber remains sealed.', tone: 'system' },
  { text: '> awaiting revised signal...', tone: 'process' },
] satisfies BootLine[];

export const accessChannelStaticLines = [
  { text: '> access channel returned static.', tone: 'error', broken: true },
  { text: '> sorry. the chamber did not hear that.', tone: 'system' },
  { text: '> try again in a little while.', tone: 'process' },
] satisfies BootLine[];

export const accessSignalFadedLines = [
  { text: '> access signal faded.', tone: 'error', broken: true },
  { text: '> please repeat the access phrase.', tone: 'system' },
] satisfies BootLine[];

export const pendingGhostReplyText = '...';

export const chatAccessSignalFadedText = (
  '> access signal faded. suspend and boot again when you are ready.'
);

export const chatChannelStaticText = (
  '> the channel returned static. try again in a little while.'
);

export function getAwakeningCheckLines(
  { includeAccessGranted = false }: { includeAccessGranted?: boolean } = {},
) {
  return includeAccessGranted
    ? [awakeningAccessGrantedLine, ...awakeningCheckLines]
    : awakeningCheckLines;
}
