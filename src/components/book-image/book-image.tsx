import { FC } from 'react';

import ImageEmptyPNG from '../../assets/book/image-empty.png';
import { API_HOST } from '../../constants';
import { Image } from '../../types';

type Props = {
  image: Image | undefined;
};

export const BookImage: FC<Props> = ({ image }) => {
  if (image) return <img src={`${API_HOST}${image.url || image}`} className='image' alt='book' />;

  return <img src={ImageEmptyPNG} className='image' alt='book-empty' />;
};
