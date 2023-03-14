import { FC, ReactNode } from 'react';

import { ReactComponent as CloseSVG } from '../../assets/icon-close.svg';

import './modal.scss';

interface IProps {
  closeModal: () => void;
  children: ReactNode;
}

export const Modal: FC<IProps> = ({ closeModal, children }) => (
  <div className='modal'>
    <div className='modal__wrapper'>
      <button className='button_close' type='button' onClick={closeModal}>
        <CloseSVG />
      </button>
      <h4>Оцените книгу</h4>
      {children}
    </div>
  </div>
);
