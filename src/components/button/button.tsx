import { FC, MouseEvent } from 'react';
import Moment from 'moment';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setBookingModalParams } from '../../store/reducers/library-slice';
import { accountSelector } from '../../store/selectors/account-selector';
import { Booking, Delivery } from '../../types';

type Props = {
  booking: Booking;
  delivery: Delivery;
  bookId: string;
};

export const Button: FC<Props> = ({ booking, delivery, bookId }) => {
  const dispatch = useAppDispatch();
  const { account } = useAppSelector(accountSelector);
  const { id, order, dateOrder, customerId } = booking || ({} as Booking);
  const { handed, dateHandedTo } = delivery || ({} as Delivery);

  const isCurrentUserBooking = customerId === account?.id;

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setBookingModalParams({ bookId, order, bookingId: id, dateOrder }));
  };

  return (
    <button
      className={`button ${order || handed ? 'button_secondary' : ''}`}
      type='button'
      data-test-id='booking-button'
      disabled={(order && !isCurrentUserBooking) || handed}
      onClick={onClickHandler}
    >
      {order && !handed && 'Забронирована'}
      {handed && !order && `занята до ${Moment(dateHandedTo).format('DD.MM')}`}
      {!order && !handed && 'Забронировать'}
    </button>
  );
};
