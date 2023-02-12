import { FC } from 'react';

import StarPNG from '../../assets/icon-star.png';
import StarEmptyPNG from '../../assets/icon-star-empty.png';
import { stars } from '../../constants/stars';

import './rating.scss';

interface IProps {
  rating: number;
}

export const Rating: FC<IProps> = ({ rating }) => (
  <div className='stars'>
    {stars.map((star, index) => (
      <img key={star} src={index + 1 <= rating ? StarPNG : StarEmptyPNG} alt='star' />
    ))}
  </div>
);
