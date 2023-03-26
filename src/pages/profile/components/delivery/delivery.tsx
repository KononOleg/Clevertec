import { FC } from 'react';
import moment from 'moment';

import { UserDelivery } from '../../../../types';
import { BookCard } from '../../../main/components/book-card';

import './delivery.scss';

type Props = {
  delivery: UserDelivery;
};

export const Delivery: FC<Props> = ({ delivery }) => {
  const { book, dateHandedTo } = delivery;

  return (
    <div className='booking'>
      <h4>Книга которую взяли</h4>
      <p className='body_large subtitle'>Здесь можете просмотреть информацию о книге и узнать сроки возврата</p>

      {book ? (
        <div className='card'>
          <BookCard book={book} isTileView={false} isDelivery={true} dateHandedTo={dateHandedTo} />
          {moment().isAfter(dateHandedTo, 'minute') && (
            <div className='empty empty_red' data-test-id='expired'>
              <h3>{'Вышел срок\nпользования книги'} </h3>
              <p className='subtitle_large'>Верните книгу, пожалуйста</p>
            </div>
          )}
        </div>
      ) : (
        <div className='empty empty_blue' data-test-id='empty-blue-card'>
          <h3>{'Прочитав книгу,\nона отобразится в истории'} </h3>
        </div>
      )}
    </div>
  );
};
