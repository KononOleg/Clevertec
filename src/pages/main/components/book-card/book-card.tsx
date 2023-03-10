import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import { BookImage } from '../../../../components/book-image';
import { Button } from '../../../../components/button';
import { Highlighter } from '../../../../components/highlighter';
import { Rating } from '../../../../components/rating';
import { PATH } from '../../../../constants';
import { useAppSelector } from '../../../../hooks/redux';
import { librarySelector } from '../../../../store/selectors/library-selector';
import { IBook } from '../../../../types';

import './book-card.scss';

interface IProps {
  book: IBook;
  isTileView: boolean;
}

export const BookCard: FC<IProps> = ({ book, isTileView }) => {
  const { category } = useParams();
  const { id, issueYear, authors, title, image, rating, booking, delivery } = book;
  const { filterText } = useAppSelector(librarySelector);

  return (
    <Link
      data-test-id='card'
      className={`book-card ${isTileView ? 'book-card_vertical' : 'book-card_horizontal'}`}
      to={`${PATH.books}/${category}/${id}`}
    >
      <BookImage image={image} />
      <div className='content'>
        <div className='rating'>
          {rating ? <Rating rating={rating} /> : <p className='body_small'>ещё нет оценок</p>}
        </div>

        <p className='subtitle_small title'>
          <Highlighter text={title} highlight={filterText} highlightedItemClass='title_highlight' />
        </p>
        <p className='body_small author'>{`${authors?.join(',')}, ${issueYear}`}</p>
        <Button booking={booking} delivery={delivery} />
      </div>
    </Link>
  );
};
