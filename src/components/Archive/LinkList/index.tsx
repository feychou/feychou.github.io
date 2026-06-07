import type { ExternalLinkTuple } from '../data';
import ExternalLink from '../ExternalLink';
import './index.css';

type LinkListProps = {
  items: ExternalLinkTuple[];
};

function LinkList({ items }: LinkListProps) {
  return (
    <ul className="link-list">
      {items.map((item) => (
        <li key={item[0]}>
          <span>{item[0]}</span>
          <ExternalLink href={item[1]}>[link]</ExternalLink>
        </li>
      ))}
    </ul>
  );
}

export default LinkList;
