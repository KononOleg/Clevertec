import { FC, Fragment } from 'react';

interface IProps {
  text: string;
  highlight: string;
  highlightedItemClass: string;
}

export const Highlighter: FC<IProps> = ({ text, highlight, highlightedItemClass }) => {
  if (!highlight) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <Fragment>
      {parts.map((part, index) => (
        <span key={`${index.toString()}:${part}`}>
          {part.toLowerCase() === highlight.toLowerCase() ? (
            <span className={highlightedItemClass} data-test-id='highlight-matches'>
              {part}
            </span>
          ) : (
            part
          )}
        </span>
      ))}
    </Fragment>
  );
};
