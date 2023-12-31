import { FC } from 'react';

import './error-modal.scss';

type Props = {
  title: string;
  text: string;
  buttonText?: string;
  onClickHandler?: () => void;
};

export const ErrorModal: FC<Props> = ({ title, text, buttonText, onClickHandler }) => (
  <div className='error-modal' data-test-id='status-block'>
    <h4>{title}</h4>
    <p>{text}</p>
    {buttonText && (
      <button className='button' type='button' onClick={onClickHandler}>
        {buttonText}
      </button>
    )}
  </div>
);
