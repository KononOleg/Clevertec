import { FC, useCallback, useEffect } from 'react';

import { ReactComponent as CloseSVG } from '../../assets/icon-close.svg';
import SuccessPNG from '../../assets/icon-success.png';
import WarningPNG from '../../assets/icon-warning.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetError, resetSuccess } from '../../store/reducers/library-slice';
import { librarySelector } from '../../store/selectors/library-selector';

import './error-message.scss';

const CLOSE_TIMEOUT = 4000;

export const ErrorMessage: FC = () => {
  const dispatch = useAppDispatch();
  const { error, success } = useAppSelector(librarySelector);

  const closeErrorMessage = useCallback(() => {
    dispatch(resetError());
    dispatch(resetSuccess());
  }, [dispatch]);

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        closeErrorMessage();
      }, CLOSE_TIMEOUT);
    }
  }, [closeErrorMessage, dispatch, error, success]);

  if (error)
    return (
      <div className='error-message error-message_error' data-test-id='error'>
        <div className='left'>
          <img src={WarningPNG} className='image' alt='warning' />
          <p className='subtitle_large'>{error.message}</p>
        </div>

        <button className='button_close' type='button' onClick={closeErrorMessage}>
          <CloseSVG />
        </button>
      </div>
    );

  if (success)
    return (
      <div className='error-message error-message_success' data-test-id='error'>
        <div className='left'>
          <img src={SuccessPNG} className='image' alt='warning' />
          <p className='subtitle_large'>{success.message}</p>
        </div>

        <button className='button_close' type='button' onClick={closeErrorMessage}>
          <CloseSVG />
        </button>
      </div>
    );

  return null;
};
