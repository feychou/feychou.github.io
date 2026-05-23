import type { ReactNode } from 'react';
import './index.css';

type ArchivePanelIconProps = {
  title: string;
};

function ArchivePanelIcon({ title }: ArchivePanelIconProps) {
  const normalizedTitle = title.toLowerCase();
  let icon = '/assets/icons/module.svg';

  if (normalizedTitle.includes('contacts')) {
    icon = '/assets/icons/contacts.svg';
  } else if (normalizedTitle.includes('protocols')) {
    icon = '/assets/icons/protocols.svg';
  } else if (normalizedTitle.includes('adaptation')) {
    icon = '/assets/icons/adaptation.svg';
  } else if (normalizedTitle.includes('upkeep')) {
    icon = '/assets/icons/upkeep.svg';
  } else if (normalizedTitle.includes('artifact')) {
    icon = '/assets/icons/artifact.svg';
  }

  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className="archive-panel-icon">
      <use href={`${icon}#icon`} />
    </svg>
  );
}

type ArchivePanelProps = {
  title: string;
  code?: string;
  className?: string;
  children: ReactNode;
};

function ArchivePanel({ title, code, className, children }: ArchivePanelProps) {
  const panelClassName = ['archive-panel', className].filter(Boolean).join(' ');

  return (
    <section className={panelClassName} data-archive-code={code}>
      <header className="archive-panel-header">
        <h2>{title}</h2>
        <div className="archive-panel-mark">
          {code && <span>{code}</span>}
          <ArchivePanelIcon title={title} />
        </div>
      </header>
      <div className="archive-panel-body">{children}</div>
    </section>
  );
}

export default ArchivePanel;
