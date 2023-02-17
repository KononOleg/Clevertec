import { FC } from 'react';
import Moment from 'moment';

import { IBooking, IDelivery } from '../../types';

import './button.scss';

interface IProps {
  booking: IBooking;
  delivery: IDelivery;
}

export const Button: FC<IProps> = ({ booking, delivery }) => {
  const { order, dateOrder } = booking || ({} as IBooking);
  const { handed } = delivery || ({} as IDelivery);

  return (
    <button className={`button ${order || handed ? 'button_secondary' : ''}`} type='button' disabled={order || handed}>
      {handed && 'Забронировано'}
      {order && `занята до ${Moment(dateOrder).format('DD.MM')}`}
      {!order && !handed && 'Забронировать'}
    </button>
  );
};
