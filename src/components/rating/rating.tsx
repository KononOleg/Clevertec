import { FC, useState } from 'react';

import StarPNG from '../../assets/icon-star.png';
import StarEmptyPNG from '../../assets/icon-star-empty.png';
import { stars } from '../../constants';

import './rating.scss';

interface IProps {
  rating: number;
  setRating?: (rating: number) => void;
}

export const Rating: FC<IProps> = ({ rating, setRating }) => {
  const [hover, setHover] = useState<number>(0);

  const hoverHandler = (star: number) => {
    if (!rating) setHover(star);
  };

  if (setRating)
    return (
      <div className='stars' data-test-id='rating'>
        {stars.map((star, index) => (
          <div key={star} data-test-id='star'>
            <img
              data-test-id={index + 1 <= (hover || rating) ? 'star-active' : ''}
              src={index + 1 <= (hover || rating) ? StarPNG : StarEmptyPNG}
              role='presentation'
              onClick={() => setRating(star)}
              onMouseOver={() => hoverHandler(star)}
              onFocus={() => hoverHandler(star)}
              onMouseOut={() => setHover(0)}
              onBlur={() => setHover(0)}
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
            data-test-id={index + 1 <= (hover || rating) ? 'star-active' : ''}
            key={star}
            src={index + 1 <= rating ? StarPNG : StarEmptyPNG}
            alt='star'
          />
        </div>
      ))}
    </div>
  );
};
