import { FC } from 'react';

import './error-modal.scss';

interface IProps {
  title: string;
  text: string;
  buttonText: string;
  onClickHandler: () => void;
}

export const ErrorModal: FC<IProps> = ({ title, text, buttonText, onClickHandler }) => (
  <div className='error-modal'>
    <h4>{title}</h4>
    <p>{text}</p>
    <button className='button' type='button' onClick={onClickHandler}>
      {buttonText}
    </button>
  </div>
);
