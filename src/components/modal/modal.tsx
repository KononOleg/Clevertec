import { FC, ReactNode } from 'react';

import { ReactComponent as CloseSVG } from '../../assets/icon-close.svg';

import './modal.scss';

interface IProps {
  title: string;
  closeModal: () => void;
  children: ReactNode;
}

export const Modal: FC<IProps> = ({ title, closeModal, children }) => (
  <div className='modal' data-test-id='modal-outer'>
    <div className='modal__wrapper' data-test-id='booking-modal'>
      <button className='button_close' type='button' data-test-id='modal-close-button' onClick={closeModal}>
        <CloseSVG />
      </button>
      <h4 data-test-id='modal-title'>{title}</h4>
      {children}
    </div>
  </div>
);
