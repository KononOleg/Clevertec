import { FC, useState } from 'react';
import { Moment } from 'moment';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setBookingModalParams } from '../../store/reducers/library-slice';
import { authSelector } from '../../store/selectors/auth-selector';
import { librarySelector } from '../../store/selectors/library-selector';
import { bookingBook } from '../../store/thunks/library-thunks';
import { Calendar } from '../calendar';
import { Modal } from '../modal';

import './bookings-modal.scss';

export const BookingsModal: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);
  const { bookingModalParams } = useAppSelector(librarySelector);
  const [dateOrder, setDateOrder] = useState<Moment | null>(null);

  const closeModalHandler = () => dispatch(setBookingModalParams(null));

  const bookingBookHandler = () =>
    dispatch(
      bookingBook({
        order: bookingModalParams?.order || true,
        dateOrder: dateOrder?.toISOString() as string,
        book: bookingModalParams?.bookId as string,
        customer: user?.id as string,
      })
    );

  return (
    <Modal title='Выбор даты бронирования' closeModal={closeModalHandler}>
      <Calendar dateOrder={dateOrder} setDateOrder={setDateOrder} />
      <button className='button' type='button' onClick={bookingBookHandler} disabled={!dateOrder}>
        Забронировать
      </button>
    </Modal>
  );
};
