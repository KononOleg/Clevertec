import { FC } from 'react';

import { Calendar } from '../calendar';
import { Modal } from '../modal';

import './bookings-modal.scss';

export const BookingsModal: FC = () => (
  <Modal title='Выбор даты бронирования' closeModal={() => {}}>
    <Calendar />
    <button className='button' type='button'>
      Забронировать
    </button>
  </Modal>
);
