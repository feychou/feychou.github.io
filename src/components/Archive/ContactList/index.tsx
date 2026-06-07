import type { Contact } from '../data';
import ExternalLink from '../ExternalLink';
import './index.css';

type ContactListProps = {
  contacts: Contact[];
};

function ContactList({ contacts }: ContactListProps) {
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <div className="contact-list-row" key={contact[0]}>
          <span className="contact-list-label">{contact[0]}</span>
          <span className="contact-list-value">
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

export default ContactList;
