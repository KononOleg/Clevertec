import { FC, Fragment } from 'react';

interface IProps {
  text: string;
  highlight: string;
  highlightedItemClass: string;
}

export const Highlighter: FC<IProps> = ({ text, highlight, highlightedItemClass }) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <Fragment>
      {parts.map((part, index) => {
        const highlightStyle = part.toLowerCase() === highlight.toLowerCase() ? highlightedItemClass : '';

        return (
          <span key={`${index.toString()}:${part}`} className={highlightStyle}>
            {part}
          </span>
        );
      })}
    </Fragment>
  );
};
