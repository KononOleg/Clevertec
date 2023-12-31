import { FC, ReactNode } from 'react';

import { ReactComponent as CloseSVG } from '../../assets/icon-close.svg';

import './modal.scss';

type Props = {
  title: string;
  closeModal: () => void;
  children: ReactNode;
  testId: string;
};

export const Modal: FC<Props> = ({ title, closeModal, children, testId }) => (
  <div className='modal' data-test-id='modal-outer' role='presentation' onClick={closeModal}>
    <div className='modal__wrapper' data-test-id={testId} role='presentation' onClick={(e) => e.stopPropagation()}>
      <button className='button_close' type='button' data-test-id='modal-close-button' onClick={closeModal}>
        <CloseSVG />
      </button>
      <h4 data-test-id='modal-title'>{title}</h4>
      {children}
    </div>
  </div>
);
