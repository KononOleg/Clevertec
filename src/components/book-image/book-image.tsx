import { FC } from 'react';

import ImageEmptyPNG from '../../assets/book/image-empty.png';
import { IImage } from '../../types';

interface IProps {
  images: IImage[];
}

export const BookImage: FC<IProps> = ({ images }) => {
  if (images.length) return <img src={images[0].image} className='image' alt='book' />;

  return <img src={ImageEmptyPNG} className='image' alt='book-empty' />;
};
