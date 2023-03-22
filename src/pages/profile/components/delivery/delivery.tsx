import { FC } from 'react';
import moment from 'moment';

import { IUserDelivery } from '../../../../types';
import { BookCard } from '../../../main/components/book-card';

import './delivery.scss';

interface IProps {
  delivery: IUserDelivery;
}

export const Delivery: FC<IProps> = ({ delivery }) => {
  const { book, dateHandedTo } = delivery;

  return (
    <div className='booking'>
      <h4>Книга которую взяли</h4>
      <p className='body_large subtitle'>Здесь можете просмотреть информацию о книге и узнать сроки возврата</p>

      {book ? (
        <div className='card'>
          <BookCard book={book} isTileView={false} isDelivery={true} dateHandedTo={dateHandedTo} />
          {moment().isBefore(dateHandedTo, 'minute') && (
            <div className='empty empty_red'>
              <h3>Вышел срок пользования книги </h3>
              <p className='subtitle_large'>Через 24 часа книга будет доступна всем</p>
            </div>
          )}
        </div>
      ) : (
        <div className='empty empty_blue'>
          <h3>Прочитав книгу, она отобразится в истории </h3>
        </div>
      )}
    </div>
  );
};
