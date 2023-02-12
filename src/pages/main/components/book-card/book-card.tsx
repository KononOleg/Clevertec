import { FC } from 'react';
import { Link } from 'react-router-dom';

import { BookImage } from '../../../../components/book-image';
import { Button } from '../../../../components/button';
import { Rating } from '../../../../components/rating';
import { PATH } from '../../../../constants/path';

import './book-card.scss';

interface IProps {
  book: any;
  isTileView: boolean;
}

export const BookCard: FC<IProps> = ({ book, isTileView }) => (
  <Link
    data-test-id='card'
    className={`book-card ${isTileView ? 'book-card_vertical' : 'book-card_horizontal'}`}
    to={`${PATH.books}/${book.category}/${book.id}`}
  >
    <BookImage images={book.images} />
    <div className='content'>
      <div className='rating'>
        {book.rating ? <Rating rating={book.rating} /> : <p className='body_small'>ещё нет оценок</p>}
      </div>

      <p className='subtitle_small title'>{book.title}</p>
      <p className='body_small author'>{`${book.author}, ${book.year}`}</p>
      <Button book={book.book} dateTaken={book.dateTaken} />
    </div>
  </Link>
);
