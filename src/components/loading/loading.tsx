import { FC } from 'react';

import LoadingPNG from '../../assets/icon-loading.png';
import { useAppSelector } from '../../hooks/redux';

import './loading.scss';

export const Loading: FC = () => {
  const { isPending } = useAppSelector((state) => state.librarySlice);

  if (isPending)
    return (
      <div className='loading' data-test-id='loader'>
        <img className='image' src={LoadingPNG} alt='loading' />
      </div>
    );

  return null;
};
