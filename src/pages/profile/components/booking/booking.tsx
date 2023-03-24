import { FC } from 'react';
import moment from 'moment';

import { IUserBooking } from '../../../../types';
import { BookCard } from '../../../main/components/book-card';

import './booking.scss';

interface IProps {
  booking: IUserBooking;
}

export const Booking: FC<IProps> = ({ booking }) => {
  const { book, dateOrder } = booking;

  return (
    <div className='booking'>
      <h4>Забронированная книга</h4>
      <p className='body_large subtitle'>Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь</p>

      {book ? (
        <div className='card'>
          <BookCard book={book} isTileView={false} isBooking={true} bookingId={booking.id} />
          {moment().isBefore(dateOrder, 'minute') && (
            <div className='empty empty_red'>
              <h3>{'Дата бронирования\nкниги истекла'}</h3>
              <p className='subtitle_large'>Через 24 часа книга будет доступна всем</p>
            </div>
          )}
        </div>
      ) : (
        <div className='empty empty_blue'>
          <h3>{'Забронируйте книгу\nи она отобразится'}</h3>
        </div>
      )}
    </div>
  );
};
