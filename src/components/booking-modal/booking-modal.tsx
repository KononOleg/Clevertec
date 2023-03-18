import { FC, Fragment } from 'react';

import { useAppSelector } from '../../hooks/redux';
import { authSelector } from '../../store/selectors/auth-selector';
import { librarySelector } from '../../store/selectors/library-selector';
import { BookingModalParams } from '../../types';

import { CreateBooking } from './components/create-booking';
import { EditBooking } from './components/edit-booking';

import './booking-modal.scss';

export const BookingModal: FC = () => {
  const { bookingModalParams } = useAppSelector(librarySelector);
  const { user } = useAppSelector(authSelector);
  const { order, bookId, bookingId, dateOrder } = bookingModalParams || ({} as BookingModalParams);

  return (
    <Fragment>
      {!order && <CreateBooking bookId={bookId} userId={user?.id as string} />}
      {order && <EditBooking bookId={bookId} bookingId={bookingId} dateOrder={dateOrder} userId={user?.id as string} />}
    </Fragment>
  );
};
