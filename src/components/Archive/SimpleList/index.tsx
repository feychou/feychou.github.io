import './index.css';

type SimpleListProps = {
  items: string[];
};

function SimpleList({ items }: SimpleListProps) {
  return (
    <ul className="plain-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>
  );
}

export default SimpleList;
