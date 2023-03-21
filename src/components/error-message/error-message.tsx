import { FC, useCallback, useEffect } from 'react';

import { ReactComponent as CloseSVG } from '../../assets/icon-close.svg';
import SuccessPNG from '../../assets/icon-success.png';
import WarningPNG from '../../assets/icon-warning.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetErrorAccount, resetSuccessAccount } from '../../store/reducers/account-slice';
import { resetErrorLibrary, resetSuccessLibrary } from '../../store/reducers/library-slice';
import { accountSelector } from '../../store/selectors/account-selector';
import { librarySelector } from '../../store/selectors/library-selector';

import './error-message.scss';

const CLOSE_TIMEOUT = 4000;

export const ErrorMessage: FC = () => {
  const dispatch = useAppDispatch();
  const { error: errorLibrary, success: successLibrary } = useAppSelector(librarySelector);
  const { error: errorAccount, success: successAccount } = useAppSelector(accountSelector);

  const error = errorLibrary || errorAccount;

  const success = successLibrary || successAccount;

  const closeErrorMessage = useCallback(() => {
    dispatch(resetErrorLibrary());
    dispatch(resetSuccessLibrary());
    dispatch(resetErrorAccount());
    dispatch(resetSuccessAccount());
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

        <button className='button_close' data-test-id='alert-close' type='button' onClick={closeErrorMessage}>
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

        <button className='button_close' data-test-id='alert-close' type='button' onClick={closeErrorMessage}>
          <CloseSVG />
        </button>
      </div>
    );

  return null;
};
