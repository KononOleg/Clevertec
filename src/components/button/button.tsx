import { FC, MouseEvent } from 'react';
import Moment from 'moment';

import { useAppDispatch } from '../../hooks/redux';
import { setBookingModalParams } from '../../store/reducers/library-slice';
import { IBooking, IDelivery } from '../../types';

import './button.scss';

interface IProps {
  booking: IBooking;
  delivery: IDelivery;
  bookId: string;
}

export const Button: FC<IProps> = ({ booking, delivery, bookId }) => {
  const dispatch = useAppDispatch();
  const { order, dateOrder } = booking || ({} as IBooking);
  const { handed } = delivery || ({} as IDelivery);

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setBookingModalParams({ bookId, order }));
  };

  return (
    <button
      className={`button ${order || handed ? 'button_secondary' : ''}`}
      type='button'
      disabled={order || handed}
      onClick={onClickHandler}
    >
      {handed && 'Забронировано'}
      {order && `занята до ${Moment(dateOrder).format('DD.MM')}`}
      {!order && !handed && 'Забронировать'}
    </button>
  );
};
