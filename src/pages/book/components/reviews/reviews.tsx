import { FC, useState } from 'react';
import Moment from 'moment';

import ArrowSVG from '../../../../assets/icon-arrow.svg';
import ReviewAvatarPNG from '../../../../assets/review-avatar.png';
import { Rating } from '../../../../components/rating';
import { API_HOST } from '../../../../constants';
import { IComment } from '../../../../types';

import './reviews.scss';

interface IProps {
  reviews: IComment[];
}

export const Reviews: FC<IProps> = ({ reviews }) => {
  const [isTurn, setIsTurn] = useState<boolean>(true);

  return (
    <div className='reviews'>
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
          {reviews.map(({ id, rating, createdAt, text, user }) => (
            <div key={id} className='review'>
              <div className='user'>
                <img src={user.avatarUrl ? `${API_HOST}${user.avatarUrl}` : ReviewAvatarPNG} alt='avatar' />

                <div className='name'>
                  <p className='body_large'>{`${user.firstName} ${user.lastName}`}</p>
                  <p className='body_large'>{Moment(createdAt).format('DD MMMM YYYY')}</p>
                </div>
              </div>
              <Rating rating={rating} />
              {text && <p className='body_large'>{text}</p>}
            </div>
          ))}
        </div>
      )}

      <button className='button button_rating' type='button' data-test-id='button-rating'>
        оценить книгу
      </button>
    </div>
  );
};
