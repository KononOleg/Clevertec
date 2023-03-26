import { FC, useState } from 'react';
import moment, { Moment } from 'moment';

import { compareDates } from '../../../../helpers';
import { useAppDispatch } from '../../../../hooks/redux';
import { setBookingModalParams } from '../../../../store/reducers/library-slice';
import { deleteBooking, rebookingBook } from '../../../../store/thunks/library-thunks';
import { Calendar } from '../../../calendar';
import { Modal } from '../../../modal';

type Props = {
  bookId: string;
  bookingId: string;
  dateOrder: string;
  userId: string;
};

export const EditBooking: FC<Props> = ({ bookId, bookingId, dateOrder, userId }) => {
  const dispatch = useAppDispatch();
  const [rebookingDate, setRebookingDate] = useState<Moment>(moment(dateOrder));

  const closeModalHandler = () => dispatch(setBookingModalParams(null));

  const isDisabledButton = compareDates(rebookingDate, moment(dateOrder));

  const bookingBookHandler = () =>
    dispatch(
      rebookingBook({
        bookingBookRequest: {
          order: true,
          dateOrder: rebookingDate.toISOString(true),
          book: bookId,
          customer: userId,
        },
        bookingId,
      })
    );

  const deleteBookingHandler = () => dispatch(deleteBooking(bookingId));

  return (
    <Modal title='Изменение даты бронирования' testId='booking-modal' closeModal={closeModalHandler}>
      <Calendar dateOrder={rebookingDate} setDateOrder={setRebookingDate} />
      <div className='modal__buttons'>
        <button
          className='button'
          data-test-id='booking-button'
          type='button'
          onClick={bookingBookHandler}
          disabled={isDisabledButton}
        >
          Забронировать
        </button>
        <button
          className='button button_secondary'
          data-test-id='booking-cancel-button'
          type='button'
          onClick={deleteBookingHandler}
        >
          Отменить бронь
        </button>
      </div>
    </Modal>
  );
};
