import { FC } from 'react';

import StarPNG from '../../assets/icon-star.png';
import StarEmptyPNG from '../../assets/icon-star-empty.png';
import { stars } from '../../constants';

import './rating.scss';

interface IProps {
  rating: number;
  setRating?: (rating: number) => void;
}

export const Rating: FC<IProps> = ({ rating, setRating }) => {
  if (setRating)
    return (
      <div className='stars' data-test-id='rating'>
        {stars.map((star, index) => (
          <div key={star} data-test-id='star'>
            <img
              data-test-id={index + 1 <= rating ? 'star-active' : ''}
              src={index + 1 <= rating ? StarPNG : StarEmptyPNG}
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
            data-test-id={index + 1 <= rating ? 'star-active' : ''}
            key={star}
            src={index + 1 <= rating ? StarPNG : StarEmptyPNG}
            alt='star'
          />
        </div>
      ))}
    </div>
  );
};
