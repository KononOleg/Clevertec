import { FC, MouseEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

import { BookImage } from '../../../../components/book-image';
import { Button } from '../../../../components/button';
import { Highlighter } from '../../../../components/highlighter';
import { Rating } from '../../../../components/rating';
import { PATH } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setReviewModalParams } from '../../../../store/reducers/library-slice';
import { librarySelector } from '../../../../store/selectors/library-selector';
import { deleteBooking } from '../../../../store/thunks/library-thunks';
import { IBook, IComment } from '../../../../types';

import './book-card.scss';

interface IProps {
  book: IBook;
  isTileView: boolean;
  isBooking?: boolean;
  isDelivery?: boolean;
  isHistory?: boolean;
  bookingId?: string;
  dateHandedTo?: string;
  comment?: IComment;
}

export const BookCard: FC<IProps> = ({
  book,
  isTileView,
  isBooking,
  isDelivery,
  isHistory,
  bookingId,
  dateHandedTo,
  comment,
}) => {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const { id, issueYear, authors, title, image, rating, booking, delivery } = book;
  const { filterText } = useAppSelector(librarySelector);

  const deleteBookingHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteBooking(bookingId as string));
  };

  const openCreateReviewModalHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setReviewModalParams({ book }));
  };

  const openUpdateReviewModalHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setReviewModalParams({ book, comment }));
  };

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
        {!isBooking && !isDelivery && !isHistory && <Button booking={booking} delivery={delivery} bookId={id} />}

        {isBooking && (
          <button className='button' type='button' onClick={deleteBookingHandler} data-test-id='cancel-booking-button'>
            Отменить бронь
          </button>
        )}

        {isDelivery && (
          <button className='button button_text' type='button' disabled={true}>
            Возврат {moment(dateHandedTo).format('DD.MM')}
          </button>
        )}

        {isHistory &&
          (comment ? (
            <button
              className='button button_secondary'
              type='button'
              onClick={openUpdateReviewModalHandler}
              data-test-id='history-review-button'
            >
              Изменить оценку
            </button>
          ) : (
            <button
              className='button'
              type='button'
              onClick={openCreateReviewModalHandler}
              data-test-id='history-review-button'
            >
              Оценить
            </button>
          ))}
      </div>
    </Link>
  );
};
