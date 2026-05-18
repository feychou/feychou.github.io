import React, { Component } from 'react';
import './App.css';

const contacts = [
  ['github', 'feychou', 'https://github.com/feychou'],
  ['email', 'feychoo@gmail.com'],
  ['mubi', 'Fey', 'https://mubi.com/users/9938385'],
  ['goodreads', 'Fey', 'https://www.goodreads.com/review/list/28849942?shelf=read'],
  ['coursera', 'alisa', 'https://www.coursera.org/user/91390a08d1d625f59a626ac7070a6fd3'],
  ['duolingo', 'fey.chu', 'https://www.duolingo.com/profile/fey.chu'],
  ['instagram', 'fey.chu', 'https://www.instagram.com/fey.chu/']
];

const skills = [
  {
    key: 'human-assisted-development',
    parts: [
      { text: 'AI', strike: true },
      { text: 'Human-assisted Development' },
    ],
  },
  'Typescript', 'CD/CI', 'Python',
  'Agentic AI', 'Information Security', 'SCRUM',
  'Observability', 'Next.js', 'Service Architecture'
]

const layers = [
  'Multi-language translation implants [German / Japanese / French / Italian]',
  'Cross-cultural signal adaptation',
  'Magickal curiosity reinforcement',
  'Epistemically cautious model-updating reasoning patterns',
  'Persistent anomaly investigation tendency'
]

const projects = [
  {
    name: 'Ghost on the Shelf',
    description: 'probabilistic identity conversational self',
    links: [
      ['link', 'https://github.com/feychou/ghost-on-the-shelf'],
    ]
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
];

const abilities = [
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
];

const upkeep = [
  'Musculoskeletal reinforcement cycles',
  'Dermal preservation regimen',
  'UV shielding dependency',
  'Circadian stabilization supplements'
]

function ExternalLink(props) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={props.href}>
      {props.children}
    </a>
  );
}

function ArchivePanelIcon(props) {
  const title = (props.title || '').toLowerCase();
  let icon = '/assets/icons/module.svg';

  if (title.includes('contacts')) {
    icon = '/assets/icons/contacts.svg';
  } else if (title.includes('protocols')) {
    icon = '/assets/icons/protocols.svg';
  } else if (title.includes('adaptation')) {
    icon = '/assets/icons/adaptation.svg';
  } else if (title.includes('upkeep')) {
    icon = '/assets/icons/upkeep.svg';
  } else if (title.includes('artifact')) {
    icon = '/assets/icons/artifact.svg';
  }

  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className="archive-panel-icon">
      <use href={`${icon}#icon`} />
    </svg>
  );
}

function ArchivePanel(props) {
  return (
    <section className={'archive-panel ' + (props.className || '')} data-archive-code={props.code}>
      <header className="archive-panel-header">
        <h2>{props.title}</h2>
        <div className="archive-panel-mark">
          {props.code && <span>{props.code}</span>}
          <ArchivePanelIcon title={props.title} />
        </div>
      </header>
      <div className="archive-panel-body">{props.children}</div>
    </section>
  );
}

function ContactList() {
  return (
    <div className="data-list">
      {contacts.map((contact) => (
        <div className="data-row" key={contact[0]}>
          <span className="data-label">{contact[0]}</span>
          <span className="data-value">
            {contact[2] ? (
              <ExternalLink href={contact[2]}>{contact[1]}</ExternalLink>
            ) : (
              contact[1]
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

function SkillCloud() {
  return (
    <div className="skill-cloud">
      {skills.map((skill) => {
        if (typeof skill === 'string') {
          return <span key={skill}>{skill}</span>;
        }

        return (
          <span key={skill.key}>
            {skill.parts.map((part) => (
              part.strike
                ? <s key={part.text}>{part.text}</s>
                : <React.Fragment key={part.text}>{part.text}</React.Fragment>
            ))}
          </span>
        );
      })}
    </div>
  );
}

function ProjectList() {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <article className="project-row" key={project.name}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="project-links">
            {project.links.map((link) => (
              <ExternalLink key={link[0] + link[1]} href={link[1]}>
                [{link[0]}]
              </ExternalLink>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function LinkList(props) {
  return (
    <ul className="link-list">
      {props.items.map((item) => (
        <li key={item[0]}>
          <span>{item[0]}</span>
          <ExternalLink href={item[1]}>[link]</ExternalLink>
        </li>
      ))}
    </ul>
  );
}

function SimpleList(props) {
  return (
    <ul className="plain-list">{props.items.map((item) => <li>{item}</li>)}</ul>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="system-strip">
          <span>FEY_ARCHIVE_SYSTEM v0.8.0</span>
          <span>ACTIVE ARCHIVE</span>
        </div>

        <main className="archive-layout">
          <section className="portfolio-section">
            <div className="content-columns">
              <div className="content-column">
                <ArchivePanel title="IDS / Contacts">
                  <ContactList />
                </ArchivePanel>

                <ArchivePanel title="Core Protocols" className="wide-panel">
                  <SkillCloud />
                </ArchivePanel>

                <ArchivePanel title="Neural Adaptation Layers" className="wide-panel">
                  <SimpleList items={layers} />
                </ArchivePanel>

                <ArchivePanel title="Vessel Upkeep" className="wide-panel">
                  <SimpleList items={upkeep} />
                </ArchivePanel>
              </div>

              <div className="content-column">
                <ArchivePanel title="Artifact Log" className="wide-panel">
                  <ProjectList />
                </ArchivePanel>

                <ArchivePanel title="Installed Modules" className="wide-panel">
                  <LinkList items={abilities} />
                </ArchivePanel>
              

              </div>
            </div>
          </section>

          <aside className="ghost-slot">
            <div className="ghost-stage" aria-label="Reserved ghost chamber space">
              <div className="ghost-stage-rings" />
              <div className="ghost-placeholder">
                <span>GHOST ASSET PENDING</span>
              </div>
            </div>
            <div className="ghost-terminal">
              <p>&gt; chamber reserved</p>
              <p>&gt; dormant and awake states pending</p>
              <p>&gt; asset integration deferred</p>
            </div>
          </aside>
        </main>

        <footer className="status-footer">
          <span>SYS: ARCHIVE NODE_17</span>
          <span>ARCHIVE INTEGRITY 100%</span>
          <span>ENCRYPTION: ACTIVE</span>
        </footer>
      </div>
    );
  }
}

export default App;
