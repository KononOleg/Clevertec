import { FC, ReactNode } from 'react';

import { ReactComponent as CloseSVG } from '../../assets/icon-close.svg';

import './modal.scss';

interface IProps {
  title: string;
  closeModal: () => void;
  children: ReactNode;
}

export const Modal: FC<IProps> = ({ title, closeModal, children }) => (
  <div className='modal'>
    <div className='modal__wrapper'>
      <button className='button_close' type='button' onClick={closeModal}>
        <CloseSVG />
      </button>
      <h4>{title}</h4>
      {children}
    </div>
  </div>
);
