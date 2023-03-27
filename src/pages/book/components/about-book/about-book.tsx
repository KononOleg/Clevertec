import { FC } from 'react';

import './about-book.scss';

type Props = {
  description: string;
};

export const AboutBook: FC<Props> = ({ description }) => (
  <div className='about-book'>
    <h5>О книге</h5>
    <p className='body_large'>{description}</p>
  </div>
);
