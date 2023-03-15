import { FC, useState } from 'react';
import Calendar from 'react-calendar';

import { Modal } from '../modal';

import './bookings-modal.scss';
import 'react-calendar/dist/Calendar.css';

export const BookingsModal: FC = () => {
  const [value, onChange] = useState(new Date());

  return (
    <Modal title='Выбор даты бронирования' closeModal={() => {}}>
      <Calendar onChange={onChange} value={value} />
      <button className='button' type='button'>
        Забронировать
      </button>
    </Modal>
  );
};
