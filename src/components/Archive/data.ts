export type ExternalLinkTuple = [label: string, href: string];
export type Contact = [label: string, value: string, href?: string];
export type SkillPart = {
  text: string;
  strike?: boolean;
};
export type StructuredSkill = {
  key: string;
  parts: SkillPart[];
};
export type Skill = string | StructuredSkill;
export type Project = {
  name: string;
  description: string;
  links: ExternalLinkTuple[];
};

export const contacts = [
  ['github', 'feychou', 'https://github.com/feychou'],
  ['hugging face', 'feychu', 'https://huggingface.co/feychu'],
  ['email', 'feychoo@gmail.com'],
  ['mubi', 'Fey', 'https://mubi.com/users/9938385'],
  ['goodreads', 'Fey', 'https://www.goodreads.com/review/list/28849942?shelf=read'],
  ['duolingo', 'fey.chu', 'https://www.duolingo.com/profile/fey.chu'],
  ['instagram', 'fey.chu', 'https://www.instagram.com/fey.chu/'],
] satisfies Contact[];

export const skills = [
  {
    key: 'human-assisted-development',
    parts: [
      { text: 'AI', strike: true },
      { text: 'Human-assisted Development' },
    ],
  },
  'Typescript', 'CD/CI', 'Python',
  'Agentic AI', 'Information Security', 'SCRUM',
  'Observability', 'Next.js', 'Service Architecture',
] satisfies Skill[];

export const layers = [
  'Multi-language translation implants [German / Japanese / French / Italian]',
  'Cross-cultural signal adaptation',
  'Magickal curiosity reinforcement',
  'Epistemically cautious model-updating reasoning patterns',
  'Persistent anomaly investigation tendency',
];

export const projects = [
  {
    name: 'Ghost on the Shelf',
    description: 'probabilistic identity conversational self',
    links: [
      ['link', 'https://github.com/feychou/ghost-on-the-shelf'],
    ],
  },
  {
    name: 'Ice Cream Saga',
    description: 'teaching React with a popsicle',
    links: [
      ['link', 'https://github.com/feychou/ice-cream-saga'],
      ['demo', 'https://feychou.github.io/aisu-kurimu-dark-mode/'],
    ],
  },
  {
    name: 'Awesome Lists!',
    description: 'everything is listed here',
    links: [
      ['link', 'https://github.com/feychou/awesome-lists'],
      ['demo', 'https://feychou.github.io/awesome-lists/'],
    ],
  },
  {
    name: 'ME(R)N Boilerplate',
    description: 'fullstack boilerplate',
    links: [['link', 'https://github.com/feychou/me-r-n-pets']],
  },
  {
    name: 'Mr Peen',
    description: 'chibi dress up game',
    links: [['link', 'https://mrpeen.github.io/#/']],
  },
  {
    name: 'Chibo',
    description: 'hiragana & katakana quiz',
    links: [['demo', 'https://feychou.github.io/chibo/']],
  },
  {
    name: 'Nukleus',
    description: 'UI component library for kununu',
    links: [['link', 'https://kununu.github.io/nukleus/']],
  },
] satisfies Project[];

export const abilities = [
  ['Generative AI with LLMs', 'https://www.coursera.org/account/accomplishments/verify/C384RUYAJJ2P'],
  ['Blockchain Basics', 'https://www.coursera.org/account/accomplishments/certificate/22878BJVAKV6'],
  ['Smart Contracts', 'https://www.coursera.org/account/accomplishments/certificate/8G2RWJAKYQU6'],
  ['International Cyber Conflicts', 'https://www.coursera.org/account/accomplishments/certificate/9UEBEB2SGPNW'],
  ['Hacking web applications - case studies of award-winning bugs', 'http://blog.deepsec.net/deepsec-2016-workshop-hacking-web-applications-case-studies-of-award-winning-bugs-in-google-yahoo-mozilla-and-more-dawid-czagan/'],
  ['Lemmings - Incubator focused on AI and chatbots', 'https://lemmings.io/'],
  ['Bitcoin and Cryptocurrency Technologies', 'https://www.coursera.org/learn/cryptocurrency'],
  ['Internet History, Technology, and Security', 'https://www.coursera.org/learn/internet-history'],
  ['Introduction to Game Design', 'https://www.coursera.org/learn/game-design'],
  ['Dino 101: Dinosaur Paleobiology', 'https://www.coursera.org/learn/dino101'],
  ['Paleontology: Theropod Dinosaurs and the Origin of Birds', 'https://www.coursera.org/learn/theropods-birds/'],
  ['Philosophy and the Sciences: Cognitive Sciences', 'https://www.coursera.org/learn/philosophy-cognitive-sciences/'],
] satisfies ExternalLinkTuple[];

export const upkeep = [
  'Musculoskeletal reinforcement cycles',
  'Dermal preservation regimen',
  'UV shielding dependency',
  'Circadian stabilization supplements',
];
