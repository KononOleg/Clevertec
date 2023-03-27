import { FC } from 'react';

import StarPNG from '../../assets/icon-star.png';
import StarEmptyPNG from '../../assets/icon-star-empty.png';
import { stars } from '../../constants';

import './rating.scss';

type Props = {
  rating: number;
  setRating?: (rating: number) => void;
};

export const Rating: FC<Props> = ({ rating, setRating }) => {
  const isActiveStar = (index: number) => index + 1 <= rating;

  if (setRating)
    return (
      <div className='stars' data-test-id='rating'>
        {stars.map((star, index) => (
          <div key={star} data-test-id='star'>
            <img
              data-test-id={isActiveStar(index) ? 'star-active' : ''}
              src={isActiveStar(index) ? StarPNG : StarEmptyPNG}
              role='presentation'
              onClick={() => setRating(star)}
              alt='star'
            />
          </div>
        ))}
      </div>
    );

  return (
    <div className='stars' data-test-id='rating'>
      {stars.map((star, index) => (
        <div key={star} data-test-id='star'>
          <img
            data-test-id={isActiveStar(index) ? 'star-active' : ''}
            key={star}
            src={isActiveStar(index) ? StarPNG : StarEmptyPNG}
            alt='star'
          />
        </div>
      ))}
    </div>
  );
};
