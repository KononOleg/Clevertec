import { FC } from 'react';

import LoadingPNG from '../../assets/icon-loading.png';

import './loading.scss';

export const Loading: FC = () => (
  <div className='loading' data-test-id='loader'>
    <img className='image' src={LoadingPNG} alt='loading' />
  </div>
);
