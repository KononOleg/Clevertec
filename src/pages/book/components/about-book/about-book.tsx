import { FC } from 'react';

import './about-book.scss';

interface IProps {
  description: string;
}

export const AboutBook: FC<IProps> = ({ description }) => (
  <div className='about-book'>
    <h5>О книге</h5>
    <p className='body_large'>{description}</p>
  </div>
);
