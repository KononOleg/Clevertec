import { FC } from 'react';
import { Link } from 'react-router-dom';

import { BookImage } from '../../../../components/book-image';
import { Button } from '../../../../components/button';
import { Rating } from '../../../../components/rating';
import { PATH } from '../../../../constants';
import { IBook } from '../../../../types';

import './book-card.scss';

interface IProps {
  book: IBook;
  isTileView: boolean;
}

export const BookCard: FC<IProps> = ({ book, isTileView }) => {
  const { id, issueYear, authors, title, categories, image, rating, booking, delivery } = book;

  return (
    <Link
      data-test-id='card'
      className={`book-card ${isTileView ? 'book-card_vertical' : 'book-card_horizontal'}`}
      to={`${PATH.books}/${categories.join(',')}/${id}`}
    >
      <BookImage image={image} />
      <div className='content'>
        <div className='rating'>
          {rating ? <Rating rating={rating} /> : <p className='body_small'>ещё нет оценок</p>}
        </div>

        <p className='subtitle_small title'>{title}</p>
        <p className='body_small author'>{`${authors?.join(',')}, ${issueYear}`}</p>
        <Button booking={booking} delivery={delivery} />
      </div>
    </Link>
  );
};
