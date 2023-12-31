import { FC, useState } from 'react';
import { Moment } from 'moment';

import { useAppDispatch } from '../../../../hooks/redux';
import { setBookingModalParams } from '../../../../store/reducers/library-slice';
import { bookingBook } from '../../../../store/thunks/library-thunks';
import { Calendar } from '../../../calendar';
import { Modal } from '../../../modal';

type Props = {
  bookId: string;
  userId: string;
};

export const CreateBooking: FC<Props> = ({ bookId, userId }) => {
  const dispatch = useAppDispatch();
  const [dateOrder, setDateOrder] = useState<Moment | null>(null);

  const closeModalHandler = () => dispatch(setBookingModalParams(null));

  const bookingBookHandler = () =>
    dispatch(
      bookingBook({
        order: true,
        dateOrder: dateOrder?.toISOString(true) as string,
        book: bookId,
        customer: userId,
      })
    );

  return (
    <Modal title='Выбор даты бронирования' testId='booking-modal' closeModal={closeModalHandler}>
      <Calendar dateOrder={dateOrder} setDateOrder={setDateOrder} />
      <button
        className='button'
        type='button'
        data-test-id='booking-button'
        onClick={bookingBookHandler}
        disabled={!dateOrder}
      >
        Забронировать
      </button>
    </Modal>
  );
};
