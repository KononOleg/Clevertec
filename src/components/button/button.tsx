import { FC } from 'react';

import './button.scss';

interface IProps {
  dateTaken: string;
  book: boolean;
}

export const Button: FC<IProps> = ({ dateTaken, book }) => (
  <button
    className={`button ${dateTaken || book ? 'button_secondary' : ''}`}
    type='button'
    disabled={(dateTaken as unknown as boolean) || book}
  >
    {book && 'Забронировано'}
    {dateTaken && `занята до ${dateTaken}`}
    {!dateTaken && !book && 'Забронировать'}
  </button>
);
