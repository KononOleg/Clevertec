import { FC, Fragment } from 'react';

import { useAppSelector } from '../../hooks/redux';
import { librarySelector } from '../../store/selectors/library-selector';
import { BookingModalParams } from '../../types';

import { CreateBooking } from './components/create-booking';

import './booking-modal.scss';

export const BookingModal: FC = () => {
  const { bookingModalParams } = useAppSelector(librarySelector);

  const { order, bookId } = bookingModalParams || ({} as BookingModalParams);

  return (
    <Fragment>
      {!order && <CreateBooking bookId={bookId} />}
      {order && <div />}
    </Fragment>
  );
};
