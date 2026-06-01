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
