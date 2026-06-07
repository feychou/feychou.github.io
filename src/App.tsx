import { useState } from 'react';
import ContactList from './components/Archive/ContactList';
import { abilities, contacts, layers, projects, skills, upkeep } from './components/Archive/data';
import LinkList from './components/Archive/LinkList';
import ProjectList from './components/Archive/ProjectList';
import SimpleList from './components/Archive/SimpleList';
import SkillCloud from './components/Archive/SkillCloud';
import ArchivePanel from './components/ArchivePanel';
import GhostChannel from './components/GhostChannel';
import './App.css';

function App() {
  const [isGhostChamberOn, setIsGhostChamberOn] = useState(false);
  const [hasGhostAwakened, setHasGhostAwakened] = useState(false);
  const chamberState = isGhostChamberOn ? 'on' : 'off';
  const ghostState = hasGhostAwakened ? 'awake' : 'sleeping';
  const keepScrollStill = () => {
    const scrollLeft = window.scrollX;
    const scrollTop = window.scrollY;
    const restoreScroll = () => window.scrollTo(scrollLeft, scrollTop);

    window.requestAnimationFrame(() => {
      restoreScroll();
      window.requestAnimationFrame(restoreScroll);
    });
    window.setTimeout(restoreScroll, 120);
  };
  const bootGhost = () => {
    setHasGhostAwakened(false);
    setIsGhostChamberOn(true);
    keepScrollStill();
  };
  const suspendGhost = () => {
    setIsGhostChamberOn(false);
    setHasGhostAwakened(false);
    keepScrollStill();
  };

  return (
    <div className="App">
      <div className="system-strip">
        <span>FEY_ARCHIVE_SYSTEM v0.8.0</span>
        <span>ACTIVE ARCHIVE</span>
      </div>

      <main
        className="archive-layout"
        data-chamber-state={chamberState}
        data-ghost-state={ghostState}
      >
        <GhostChannel
          hasGhostAwakened={hasGhostAwakened}
          isChamberOn={isGhostChamberOn}
          onAwakeningSucceeded={() => setHasGhostAwakened(true)}
          onBootGhost={bootGhost}
          onSuspendGhost={suspendGhost}
        />

        <section className="portfolio-section">
          <div className="content-columns">
            <div className="content-column">
              <ArchivePanel title="IDS / Contacts">
                <ContactList contacts={contacts} />
              </ArchivePanel>

              <ArchivePanel title="Core Protocols" className="wide-panel">
                <SkillCloud skills={skills} />
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
                <ProjectList projects={projects} />
              </ArchivePanel>

              <ArchivePanel title="Installed Modules" className="wide-panel">
                <LinkList items={abilities} />
              </ArchivePanel>
            </div>
          </div>
        </section>
      </main>

      <footer className="status-footer">
        <span>SYS: ARCHIVE NODE_17</span>
        <span>ARCHIVE INTEGRITY 100%</span>
        <span>ENCRYPTION: ACTIVE</span>
      </footer>
    </div>
  );
}

export default App;
