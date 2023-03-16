import { FC, useState } from 'react';
import { Moment } from 'moment';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setBookingModalParams } from '../../../../store/reducers/library-slice';
import { authSelector } from '../../../../store/selectors/auth-selector';
import { bookingBook } from '../../../../store/thunks/library-thunks';
import { Calendar } from '../../../calendar';
import { Modal } from '../../../modal';

interface IProps {
  bookId: string;
}

export const CreateBooking: FC<IProps> = ({ bookId }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);
  const [dateOrder, setDateOrder] = useState<Moment | null>(null);

  const closeModalHandler = () => dispatch(setBookingModalParams(null));

  const bookingBookHandler = () =>
    dispatch(
      bookingBook({
        order: true,
        dateOrder: dateOrder?.toISOString() as string,
        book: bookId,
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
