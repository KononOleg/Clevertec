import { FC, useState } from 'react';
import Moment from 'moment';

import ReviewAvatarPNG from '../../../../assets/avatar.png';
import ArrowSVG from '../../../../assets/icon-arrow.svg';
import { Rating } from '../../../../components/rating';
import { API_HOST } from '../../../../constants';
import { sortComments } from '../../../../helpers';
import { useAppDispatch } from '../../../../hooks/redux';
import { setReviewModalParams } from '../../../../store/reducers/library-slice';
import { Book, Comment } from '../../../../types';

import './reviews.scss';

import 'moment/locale/ru';

type Props = {
  reviews: Comment[];
  userId: string;
  book: Book;
};

export const Reviews: FC<Props> = ({ reviews, userId, book }) => {
  const [isTurn, setIsTurn] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const searchComment = reviews && reviews.find((review) => review.user.commentUserId === userId);

  const openCreateReviewModalHandler = () => dispatch(setReviewModalParams({ book }));

  const openUpdateReviewModalHandler = () => dispatch(setReviewModalParams({ book, comment: searchComment }));

  return (
    <div className='reviews' data-test-id='reviews'>
      <div className='title'>
        <h5>
          Отзывы <span>{reviews?.length || 0}</span>
        </h5>
        <button
          className={` ${isTurn ? '' : 'button-hide_turn'}`}
          type='button'
          data-test-id='button-hide-reviews'
          onClick={() => setIsTurn(!isTurn)}
        >
          <img src={ArrowSVG} alt='arrow' />
        </button>
      </div>
      {reviews && (
        <div className={`reviews-list ${isTurn ? 'reviews-list_unturn' : 'reviews-list_turn'}`}>
          {[...sortComments(reviews)].map(({ id, rating, createdAt, text, user }) => (
            <div key={id} className='review' data-test-id='comment-wrapper'>
              <div className='user'>
                <img
                  className='image'
                  src={user.avatarUrl ? `${API_HOST}${user.avatarUrl}` : ReviewAvatarPNG}
                  alt='avatar'
                />

                <div className='name'>
                  <p className='body_large' data-test-id='comment-author'>{`${user.firstName} ${user.lastName}`}</p>
                  <p className='body_large' data-test-id='comment-date'>
                    {Moment(createdAt).locale('ru').format('DD MMMM YYYY')}
                  </p>
                </div>
              </div>
              <Rating rating={rating} />
              {text && (
                <p className='body_large' data-test-id='comment-text'>
                  {text}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {searchComment ? (
        <button
          className='button button_secondary button_rating'
          type='button'
          data-test-id='button-rate-book'
          onClick={openUpdateReviewModalHandler}
        >
          изменить оценку
        </button>
      ) : (
        <button
          className='button button_rating'
          type='button'
          data-test-id='button-rate-book'
          onClick={openCreateReviewModalHandler}
        >
          оценить книгу
        </button>
      )}
    </div>
  );
};
