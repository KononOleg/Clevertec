import { FC } from 'react';

import ImageEmptyPNG from '../../assets/book/image-empty.png';
import { API_HOST } from '../../constants';
import { IImage } from '../../types';

interface IProps {
  image: IImage | undefined;
}

export const BookImage: FC<IProps> = ({ image }) => {
  if (image) return <img src={`${API_HOST}${image.url}`} className='image' alt='book' />;

  return <img src={ImageEmptyPNG} className='image' alt='book-empty' />;
};
