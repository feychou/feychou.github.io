import './index.css';

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

export default ArchivePanel;
