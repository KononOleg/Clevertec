import { FC, useState } from 'react';

import ArrowSVG from '../../../../assets/icon-arrow.svg';
import ReviewAvatarPNG from '../../../../assets/review-avatar.png';
import { Rating } from '../../../../components/rating';
import { IReview } from '../../../../types';

import './reviews.scss';

interface IProps {
  reviews: IReview[];
}

export const Reviews: FC<IProps> = ({ reviews }) => {
  const [isTurn, setIsTurn] = useState<boolean>(true);

  return (
    <div className='reviews'>
      <div className='title'>
        <h5>
          Отзывы <span>{reviews.length}</span>
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

      <div className={`reviews-list ${isTurn ? 'reviews-list_unturn' : 'reviews-list_turn'}`}>
        {reviews.map((review) => (
          <div key={review.id} className='review'>
            <div className='user'>
              <img src={ReviewAvatarPNG} alt='avatar' />
              <div className='name'>
                <p className='body_large'>{review.name}</p>
                <p className='body_large'>{review.date}</p>
              </div>
            </div>
            <Rating rating={review.rating} />
            {review.review && <p className='body_large'>{review.review}</p>}
          </div>
        ))}
      </div>
      <button className='button button_rating' type='button' data-test-id='button-rating'>
        оценить книгу
      </button>
    </div>
  );
};
