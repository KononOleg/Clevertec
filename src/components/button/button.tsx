import { FC, MouseEvent } from 'react';
import Moment from 'moment';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setBookingModalParams } from '../../store/reducers/library-slice';
import { authSelector } from '../../store/selectors/auth-selector';
import { IBooking, IDelivery } from '../../types';

import './button.scss';

interface IProps {
  booking: IBooking;
  delivery: IDelivery;
  bookId: string;
}

export const Button: FC<IProps> = ({ booking, delivery, bookId }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);
  const { id, order, dateOrder, customerId } = booking || ({} as IBooking);
  const { handed } = delivery || ({} as IDelivery);

  const isCurrentUserBooking = customerId === user?.id;

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setBookingModalParams({ bookId, order, bookingId: id, dateOrder }));
  };

  return (
    <button
      className={`button ${order || handed ? 'button_secondary' : ''}`}
      type='button'
      disabled={(order && !isCurrentUserBooking) || handed}
      onClick={onClickHandler}
    >
      {order && !handed && 'Забронирована'}
      {handed && !order && `занята до ${Moment(dateOrder).format('DD.MM')}`}
      {!order && !handed && 'Забронировать'}
    </button>
  );
};
