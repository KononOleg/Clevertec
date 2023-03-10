import { FC } from 'react';

import { ReactComponent as CloseSVG } from '../../assets/icon-close.svg';
import WarningPNG from '../../assets/icon-warning.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetError } from '../../store/reducers/library-slice';
import { librarySelector } from '../../store/selectors/library-selector';

import './error-message.scss';

export const ErrorMessage: FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(librarySelector);

  const closeErrorMessage = () => {
    dispatch(resetError());
  };

  if (error)
    return (
      <div className='error-message' data-test-id='error'>
        <div className='left'>
          <img src={WarningPNG} className='image' alt='warning' />
          <p className='subtitle_large'>{error.message}</p>
        </div>

        <button className='button_close' type='button' onClick={closeErrorMessage}>
          <CloseSVG />
        </button>
      </div>
    );

  return null;
};
